import LoginKeyword from '@/components/Login/LoginKeyword';

const onLoading = async (ms: number) => {
  await delay(ms);

  return [
    '부동산',
    '서울',
    '원룸전세',
    '관악구',
    '아파트',
    '수도권 아파트 분양',
    '투룸전세',
    '은평구',
    '은평구 부동산',
  ];
};
const ChooseKeywordPage = async () => {
  const mock_keyword = await onLoading(3000);

  return (
    <>
      <h2 className="text-grey900 text-[1.5rem] font-bold leading-9">
        분석하고 싶은 키워드를 <br />
        선택해 주세요
      </h2>
      <p className="text-grey600 mb-16 pt-2">최대 5개</p>
      <LoginKeyword keyword={mock_keyword} />
    </>
  );
};

export default ChooseKeywordPage;
// Loading 체크를 위한 임시 delay 함수
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
