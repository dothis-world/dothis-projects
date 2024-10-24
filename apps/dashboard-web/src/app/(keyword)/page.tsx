import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import ErrorBoundary from '@/components/common/Error/ErrorBoundary';
import SystemError from '@/components/common/Error/SystemError';
import Footer from '@/components/common/Layout/Footer';
import TopBannerMediaList from '@/components/MainContents/MediaArticles/TopBannerMediaList';

import AdsBanner from './AdsBanner';
import BestVideoList from './BestVideoList';
import MainSearchbar from './MainSearchbar';
import MediaBanner from './MediaBanner';
import TrendKeywordList from './TrendKeywordList';
import WeeklyKeyword from './WeeklyKeyword';

const VIDEO_CATEGORYNUMBER = [
  { label: '뉴스', value: [9, 10, 11, 93] },
  { label: '예능', value: [52, 54, 55] },
  { label: '여행', value: [57, 59] },
  { label: '음악', value: [15, 16, 17, 18, 19] },
];
const Page = () => {
  return (
    <>
      <div className="px-[66px]">
        <div className="mx-auto  flex  max-w-[1548px] flex-col">
          <h2 className="text-grey900 mb-[40px] mt-[80px] text-center text-[28px]">
            지금, 조회수가 높은 콘텐츠를 찾기 위한
            <br />
            영상 트렌드 <span className="text-primary500 font-bold"> 분석</span>
          </h2>
          <MainSearchbar />

          {/* <div className=" mb-[57px]">
            <Link
              href={
                'https://docs.google.com/forms/d/e/1FAIpQLSc4WwQb9SbmZMMhghQWQQ3Oh-q1slxewT4kpic3C-kf-YnXmw/viewform' as Route
              }
              target="_blank"
            >
              <AdsBanner />
            </Link>
          </div> */}

          <div className="mx-auto">
            <Image src={'/youtube.png'} width={240} height={50} alt="youtube" />
          </div>

          <div className="mx-auto mb-[70px] w-[400px]">
            <h2 className="text-grey700 mb-[23px] text-center text-[14px] font-bold">
              뜨고 있는 키워드 {'['}더보기{']'}
            </h2>

            <TrendKeywordList />
          </div>

          <div className=" mb-[77px]">
            <h2 className="text-grey700 mb-[23px] text-center text-[14px] font-bold">
              트렌드 분석을 위한 도구
            </h2>

            <div className="bg-grey200 rounded-10 flex w-full justify-between px-[60px] py-[30px]">
              <div>
                <h2 className="text-grey700 mb-[17px] text-center text-[14px] font-bold">
                  조회수와 검색량 추이 변동으로 알아본
                  <br /> 소재들의{' '}
                  <span className="text-primary500">미래 전망</span>
                </h2>

                <div className="relative h-[230px] w-[280px]">
                  <Image
                    src={'/LandingExmaple1.png'}
                    fill={true}
                    alt="youtube"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-grey700 mb-[17px] text-center text-[14px] font-bold">
                  시청자가 좋아하는 소재를 모아
                  <br />
                  <span className="text-primary500"> 키워드 조회수 비교</span>
                </h2>

                <div className="relative h-[230px] w-[280px]">
                  <Image
                    src={'/LandingExmaple2.png'}
                    fill={true}
                    alt="youtube"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-grey700 mb-[17px] text-center text-[14px] font-bold">
                  경쟁 채널이 업로드한
                  <br />
                  <span className="text-primary500">
                    {' '}
                    콘텐츠 타임라인 모니터링
                  </span>
                </h2>

                <div className="relative h-[230px] w-[280px]">
                  <Image
                    src={'/LandingExmaple3.png'}
                    fill={true}
                    alt="youtube"
                  />
                </div>
              </div>
            </div>
          </div>

          {VIDEO_CATEGORYNUMBER.map((item) => {
            return (
              <div className="mb-10">
                <h2 className="text-grey700 mb-5 text-[14px] font-bold">
                  새로운 <span className="text-primary500">{item.label}</span>{' '}
                  영상
                </h2>
                <BestVideoList categoryNumbers={item.value} />
              </div>
            );
          })}
          {/* 
          <div className="mb-[52px] flex">
            <div className="expandSideBar:mr-[100px] mr-[50px] flex-grow">
              <p className="text-grey700 mb-[30px] text-[14px] font-bold">
                금주의 이슈{' '}
              </p>
              <ErrorBoundary fallback={<SystemError />}>
                <MediaBanner />
              </ErrorBoundary>
            </div>

            <div className="ml-auto min-w-[300px] flex-grow px-[12px]">
              <Link href={'/rank'}>
                <p className="text-grey700 mb-[30px] text-[14px] font-bold">
                  금주의 이슈 키워드 {'['}더 보기{']'}
                </p>
              </Link>
              <ErrorBoundary fallback={<SystemError />}>
                <WeeklyKeyword />
              </ErrorBoundary>
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;

{
  /* <ul className="flex flex-col gap-[15px]">
{mock_weeklyKeywordRank.map((item, i) => (
  <li key={i} className="gap-30 flex items-center p-[10px]">
    <p className="text-grey500">{i + 1}</p>
    <p className="flex-grow">{item.label}</p>
    <div className="h-[20px] w-[20px]">
      {i + 1 === item.lastWeek ? (
        <div className="text-center">
          <span className="">-</span>
        </div>
      ) : i + 1 < item.lastWeek ? (
        <div className="flex items-center  justify-center">
          <span className="text-[12px] text-[#F00]">
            {item.lastWeek - (i + 1)}
          </span>
          <span className="h-0 w-0 border-x-[4px] border-b-[8px]  border-x-transparent border-b-[#F00]"></span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <span className="text-[12px] text-[#3183FF]">
            {' '}
            {i + 1 - item.lastWeek}
          </span>
          <span className="h-0 w-0 border-x-[4px] border-t-[8px]  border-x-transparent border-t-[#3183FF]"></span>
        </div>
      )}
    </div>
  </li>
))}
</ul> */
}
