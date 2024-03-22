'use client';

import Draggable from '@/components/common/Draggable/Draggable';

const ExCard = ({ cardId, data }: { cardId: string; data: string[] }) => {
  return (
    <>
      <input type="checkbox" name={`ex-${cardId}`} />
      <p>{data[0]}</p>
      <p>{data[1]}</p>
      <p>{data[2]}</p>
    </>
  );
};

const Page = () => {
  const exData = {
    1: ['설명1', '비디오1', '오디오1'],
    2: ['설명2', '비디오2', '오디오2'],
    3: ['설명3', '비디오3', '오디오3'],
    4: ['설명4', '비디오4', '오디오4'],
    5: ['설명5', '비디오5', '오디오5'],
  };
  return (
    <div className="m-[300px]">
      <p className="font-bold"> Draggable 테스트용 페이지</p>
      <p>ex1</p>
      <Draggable className="px-[10px]">{['haha', 'hoho', 'kalkal']}</Draggable>
      <p>ex2</p>
      <Draggable className="px-[10px]">
        {Object.entries(exData)?.map(([k, v]) => (
          <ExCard cardId={k} data={v} key={k} />
        ))}
      </Draggable>
    </div>
  );
};

export default Page;
