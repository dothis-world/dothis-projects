import Link from 'next/link';

import SvgComp from '@/components/common/SvgComp';

import TabNav from './TabNav';

const Layout = ({
  params,
  children,
}: {
  params: { keyword: string; related_word: string };
  children: React.ReactNode;
}) => {
  const keyword = decodeURIComponent(params.keyword);
  const relatedWord = decodeURIComponent(params.related_word);
  return (
    <div className="mx-auto mt-10 max-w-[1700px] px-[66px]">
      <div className="mb-[20px] flex">
        <Link href={`/keyword/${keyword}`} className="flex">
          <div className="mr-[50px] flex items-center">
            <SvgComp
              icon="KeywordLeftArrow"
              size={24}
              className="[&_path]:stroke-grey500"
            />

            <p className="text-grey500 text-[14px]">돌아가기</p>
          </div>
        </Link>

        <div className="flex items-center gap-[10px] text-[20px] font-bold">
          <span className="text-grey700">{keyword}</span>{' '}
          <SvgComp icon="KeywordRightArrow" size={24} />
          <span className="text-primary500"> {relatedWord}</span>
        </div>
      </div>

      <TabNav keyword={keyword} relatedWord={relatedWord} />

      {children}
    </div>
  );
};

export default Layout;
