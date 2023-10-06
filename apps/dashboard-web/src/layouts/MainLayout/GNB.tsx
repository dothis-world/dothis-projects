'use client';

import SvgComp from '@/share/SvgComp';

// Header 반응형 디자인이나 기획이 나오면 반응형 대응 예정
const GNB = () => {
  return (
    <header className="border-grey300 relative box-border flex h-[5.5rem] w-full items-center justify-center border-b border-solid p-5">
      {/* 이 부분은 Hover 디자인과 클릭 시 기능을 파악하고 추가 작업 */}

      <div className="desktop:gap-[0.75rem] absolute right-12 flex gap-[0.25rem]">
        <div className="border-primary100 rounded-8 bg-primary100 ml-3 flex items-center border border-solid p-3">
          <SvgComp icon="HeaderEdit" size="1.5rem" />
        </div>
        <div className="rounded-8 hover:bg-grey300 p-3">
          <SvgComp icon="HeaderTicket" size="1.5rem" />
        </div>
        <div className="rounded-8 hover:bg-grey300 p-3">
          <SvgComp icon="HeaderNotification" size="1.5rem" />
        </div>
        <div className="rounded-8 hover:bg-grey300 p-3">
          <SvgComp icon="HeaderUserProfile" size="1.5rem" />
        </div>
      </div>
    </header>
  );
};
export default GNB;
