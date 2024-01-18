import { Button } from 'dashboard-storybook/src/components/Button/Button';
import Link from 'next/link';

import SvgComp from '../../SvgComp';

const TrendingModal = ({
  keyword,
  dismissCallback,
}: {
  keyword: string;
  dismissCallback: () => void;
}) => {
  return (
    <div className=" rounded-8 bg-grey00 border-grey400 w-[500px] border border-solid p-10">
      <div className="flex justify-end" onClick={() => dismissCallback()}>
        <SvgComp icon="Close" size={24} />
      </div>
      <p className="text-t3 text-grey700 mb-5 text-center font-bold">
        자세한 분석을 위해 페이지를 이동합니다.
      </p>
      <div className="flex justify-center gap-[1.25rem]">
        <Button theme="outlined" size="L" onClick={() => dismissCallback()}>
          취소
        </Button>
        <Link href={`/contents?keyword=${keyword}`}>
          <Button theme="contained" size="L">
            이동
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default TrendingModal;