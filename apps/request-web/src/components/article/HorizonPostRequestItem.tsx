import { AspectRatio, Box, Flex, Text } from '@chakra-ui/react';
import SvgDonate from '@dothis/share/components/ui/Icons/SvgDonate';
import Tag from '@dothis/share/components/ui/Tag';
import StatusTag from '@dothis/share/components/ui/Tag/StatusTag';
import { RequestPostDomain } from '@dothis/share/domain';
import {
  colors,
  fontWeights,
  mediaQueries,
  typo,
} from '@dothis/share/lib/styles/chakraTheme';
import {
  cutOverflowStr,
  removeHTMLTag,
  thousandsSeparators,
} from '@dothis/share/lib/utils';
import { matchMark } from '@dothis/share/lib/utils/matchMarkList';
import { css } from '@emotion/react';
import React, { useMemo } from 'react';

import ViewRequestPost from '../contents/ViewRequestPost';

export type HorizonPostRequestItemProps = {
  requestPost: RequestPostDomain.GetItemT;
  matchText?: string;
};

export default function HorizonPostRequestItem({
  matchText,
  requestPost,
}: HorizonPostRequestItemProps) {
  const matchedTitle = useMemo(
    () =>
      matchText ? matchMark(requestPost.title, matchText) : requestPost.title,
    [requestPost.title, matchText],
  );
  const matchedCreatorName = useMemo(
    () =>
      matchText && requestPost.creator?.user.name
        ? matchMark(requestPost.creator.user.name, matchText)
        : requestPost.creator?.user.name,
    [requestPost.creator?.user.name, matchText],
  );
  return (
    <ViewRequestPost.ModalLink requestPost={requestPost}>
      <div css={postRequestItemStyle}>
        <div className="request-post-swiper-item-contents">
          <Flex gap={8}>
            {requestPost.category && (
              <Tag theme="orange">
                {RequestPostDomain.constants.categoryKor.get(
                  requestPost.category,
                )}
              </Tag>
            )}
            <StatusTag requestStatus={requestPost.status} />
          </Flex>
          <Text as="strong" noOfLines={2}>
            {matchedTitle}
          </Text>

          <div className="item-info">
            <div className="etc-info">
              {matchedCreatorName ? (
                <span>@{matchedCreatorName}</span>
              ) : requestPost.creator?.user?.name ? (
                <span>{requestPost.creator?.user?.name}</span>
              ) : null}

              <Box className="item-donate">
                <Text as="span" mr={8}>
                  {thousandsSeparators(requestPost.totalQuantity)}
                  &nbsp;P
                </Text>
                <Flex gap={2}>
                  <SvgDonate fill={colors.gray['70']} />
                  <span>{requestPost.requestFundings.length}</span>
                </Flex>
              </Box>
              {/* TODO: 일정 추가시 추가*/}
              {/*<Flex className="remaining-days hurry">*/}
              {/*  <SvgCalendar />*/}
              {/*  <span>3일 남음</span>*/}
              {/*</Flex>*/}
            </div>
          </div>
          {requestPost.content && (
            <Text
              className="item-comment"
              as="p"
              noOfLines={2}
              dangerouslySetInnerHTML={{
                __html: cutOverflowStr(removeHTMLTag(requestPost.content), 120),
              }}
            />
          )}
        </div>
        {requestPost.thumbnailUrl && (
          <AspectRatio ratio={1} minW={{ base: '90px', tablet: '160px' }}>
            <div className="item-img-wrap">
              <img
                src={requestPost.thumbnailUrl}
                alt={`${requestPost.title} thumbnail`}
              ></img>
            </div>
          </AspectRatio>
        )}
      </div>
    </ViewRequestPost.ModalLink>
  );
}

const postRequestItemStyle = css`
  display: flex;
  justify-content: space-between;

  .item-img-wrap {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    flex: auto;
    overflow: hidden;
  }

  .item-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  .request-post-swiper-item-contents {
    display: flex;
    flex: auto;
    flex-direction: column;

    padding-right: 16px;
    max-width: 660px;

    ${mediaQueries.tablet} {
      padding-right: 32px;
    }
  }

  &:hover {
    .item-img-wrap img {
      transform: scale(1.08);
    }
  }

  strong {
    margin-top: 10px;
    ${typo.t2};
  }

  .item-info {
    display: flex;
    margin-top: 8px;

    .etc-info {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 8px;

      ${typo.t4};
      color: ${colors.gray['70']};

      ${mediaQueries.tablet} {
        flex-direction: row;
        align-items: center;
      }
    }
  }

  .remaining-days {
    color: ${colors.gray['60']};
    ${typo.t5};

    span {
      margin-left: 4px;
    }

    svg {
      stroke: ${colors.gray['60']};
    }

    &.hurry {
      color: ${colors.danger.default};
      font-weight: ${fontWeights.b};

      svg {
        stroke: ${colors.danger.default};
      }
    }
  }

  .item-comment {
    display: none;
    margin-top: 8px;
    ${typo.t5};
    color: ${colors.gray['60']};

    ${mediaQueries.tablet} {
      display: block;
    }
  }

  .item-donate {
    font-weight: ${fontWeights.b};
    display: flex;
    align-items: center;

    * + * {
      margin-left: 2px;
    }
  }
`;
