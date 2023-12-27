import { from, last, lastValueFrom, map } from 'rxjs';
import { VideoServicePort } from './video.service.port';
import { AwsOpenSearchConnectionService } from '@Apps/common/aws/service/aws.opensearch.service';
import { FindVideoQuery } from '@Apps/modules/video/queries/v1/find-video/find-video.query-handler';
import {
  IFindManyVideoResult,
  IPagingRes,
  IVideo,
} from '@Apps/modules/video/interface/find-many-video.interface';

import { FindVideoPageQuery } from '@Apps/modules/video/queries/v1/find-video-paging/find-video-paging.req.dto';
import {
  FindVideoDateQuery,
  VIDEO_DATA_KEY,
} from '@Apps/modules/video/dtos/find-videos.dtos';
import { IdocRes } from '@Apps/common/aws/interface/os.res.interface';

export class SearchQueryBuilder {
  static video(
    index: string,
    keyword: string,
    relWord: string,
    data?: VIDEO_DATA_KEY[],
    from?: Date,
    to?: Date,
    size: number = 100,
  ) {
    return {
      index,
      scroll: '10s',
      size: 10000,
      body: {
        query: {
          bool: {
            must: [
              {
                bool: {
                  should: [
                    {
                      bool: {
                        must: [
                          {
                            wildcard: {
                              video_tags: `*${keyword}*`,
                            },
                          },
                          {
                            wildcard: {
                              video_title: `*${relWord}*`,
                            },
                          },
                        ],
                      },
                    },
                    {
                      bool: {
                        must: [
                          {
                            wildcard: {
                              video_title: `*${keyword}*`,
                            },
                          },
                          {
                            wildcard: {
                              video_tags: `*${relWord}*`,
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                nested: {
                  path: 'video_history',
                  query: {
                    range: {
                      'video_history.crawled_date': {
                        gte: `${from} 00:00:00`,
                        lte: `${to} 23:59:59`,
                      },
                    },
                  },
                  inner_hits: {
                    name: 'video_history',
                    size,
                  },
                },
              },
            ],
          },
        },
        _source: data || false,
      },
    };
  }

  static individualVideo(id: string) {
    return {
      index: 'video-*',
      id,
    };
  }
}
export class VideoQueryHandler
  extends AwsOpenSearchConnectionService
  implements VideoServicePort
{
  async findManyVideo(tag: string): Promise<string[]> {
    const searchQuery = {
      index: 'new_video',
      body: {
        query: {
          bool: {
            should: [
              {
                wildcard: {
                  video_tag: `*${tag}*`,
                },
              },
              {
                wildcard: {
                  video_title: `*${tag}*`,
                },
              },
            ],
          },
        },
        _source: 'video_id',
      },
    };
    const observable$ = from(
      this.client.search(searchQuery).then((res) => res.body.hits.hits),
    ).pipe(map((hits) => hits.map((hit) => hit._source.video_id)));

    return await lastValueFrom(observable$);
  }
  async findVideoByWords(
    words: FindVideoQuery,
  ): Promise<IFindManyVideoResult[]> {
    let searchQuery = {
      index: 'new_video',
      body: {
        query: {
          bool: {
            should: [
              {
                wildcard: {
                  video_tag: `*${words.search}*`,
                },
              },
              {
                wildcard: {
                  video_title: `*${words.search}*`,
                },
              },
            ],
          },
        },
      },
    };
    if (words.related)
      searchQuery.body.query.bool.should.push(
        {
          wildcard: {
            video_tag: `*${words.related}*`,
          },
        },
        {
          wildcard: {
            video_title: `*${words.related}*`,
          },
        },
      );
    const observable$ = from(
      this.client.search(searchQuery).then((res) => res.body.hits.hits),
    );

    return await lastValueFrom(observable$);
  }

  /**
   * @param query
   */
  async findVideoIdFullScanAndVideos<T>(
    query: FindVideoDateQuery,
  ): Promise<T[]> {
    const { clusterNumber, keyword, relationKeyword, data, from, to } = query;
    const searchQuery = SearchQueryBuilder.video(
      'video-' + clusterNumber,
      keyword,
      relationKeyword,
      data,
      from,
      to,
    );

    return await this.fullScan<T>(searchQuery, (doc) => doc);
  }

  async findVideoPaging(arg: FindVideoPageQuery): Promise<IPagingRes> {
    const { clusterNumber, limit, search, related, last } = arg;
    let searchQuery = {
      index: `video-${clusterNumber}`,
      size: limit,
      body: {
        query: {
          bool: {
            must: [
              {
                bool: {
                  should: [
                    {
                      bool: {
                        must: [
                          {
                            wildcard: {
                              video_tags: `*${search}*`,
                            },
                          },
                          {
                            wildcard: {
                              video_title: `*${related}*`,
                            },
                          },
                        ],
                      },
                    },
                    {
                      bool: {
                        must: [
                          {
                            wildcard: {
                              video_title: `*${search}*`,
                            },
                          },
                          {
                            wildcard: {
                              video_tags: `*${related}*`,
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        sort: ['_id'],
      },
    };

    if (last) searchQuery.body['search_after'] = [last];

    const observable$ = from(
      this.client.search(searchQuery).then((res) => ({
        total: res.body.hits.total,
        data: res.body.hits.hits,
      })),
    );

    return await lastValueFrom(observable$);
  }

  /**
   * 곧 쓸일이 있을듯
   * @param arg
   */
  async findVideosWithLastVideoHistory<T>(
    arg: FindVideoDateQuery,
  ): Promise<T[]> {
    const { keyword, relationKeyword } = arg;
    let searchQuery = {
      index: 'video-' + arg.clusterNumber,
      scroll: '10s',
      size: 10000,
      body: {
        query: {
          bool: {
            must: [
              {
                bool: {
                  should: [
                    {
                      bool: {
                        must: [
                          {
                            wildcard: {
                              video_tag: `*${relationKeyword}*`,
                            },
                          },
                          {
                            wildcard: {
                              video_tag: `*${keyword}*`,
                            },
                          },
                        ],
                      },
                    },
                    {
                      bool: {
                        must: [
                          {
                            wildcard: {
                              video_title: `*${relationKeyword}*`,
                            },
                          },
                          {
                            wildcard: {
                              video_title: `*${keyword}*`,
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        _source: arg.data,
      },
    };
    return Promise.resolve([]);
  }

  async findVideoInfo(id: string): Promise<IdocRes<IVideo>> {
    const searchQuery = SearchQueryBuilder.individualVideo(id);
    const observable$ = from(
      this.client.get(searchQuery).then((res) => res.body._source),
    );

    return await lastValueFrom(observable$);
  }
}
