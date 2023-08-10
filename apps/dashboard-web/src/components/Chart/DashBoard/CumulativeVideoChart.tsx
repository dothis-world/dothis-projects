'use client';

import { ResponsivePie } from '@nivo/pie';

const data = [
  {
    id: '구독자 수 비슷한 채널',
    label: '구독자 수 비슷한 채널',
    value: 421,
  },
  {
    id: '구독자 10만 이상 채널',
    label: '구독자 10만 이상 채널',
    value: 166,
  },
  {
    id: '그 외',
    label: '그 외',
    value: 149,
  },
];

const CumulativeVideoChart = () => {
  return (
    <div className="flex flex-col h-full p-6 font-bold rounded-8 border border-grey400 bg-grey00 text-grey600">
      <div>누적 영상 수</div>
      <div className="relative h-full">
        <div className="absolute top-[94px] left-2/4 translate-x-[-50%] flex flex-col justify-center items-center">
          <div>전체 영상</div>
          <div>
            <span className="text-primary500">1만 6,420</span>개
          </div>
        </div>
        <ResponsivePie
          data={data}
          margin={{ top: 26, bottom: 100 }}
          sortByValue={true}
          innerRadius={0.75}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={['#f07288', '#f7b4c0', '#fde7eb']}
          borderColor={{
            from: 'color',
            modifiers: [['darker', '0.2']],
          }}
          enableArcLinkLabels={false}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          enableArcLabels={false}
          arcLabelsRadiusOffset={0.45}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [['darker', 2]],
          }}
          legends={[
            {
              anchor: 'bottom',
              direction: 'column',
              translateY: 100,
              itemsSpacing: 10,
              itemWidth: 140,
              itemHeight: 18,
              itemTextColor: '#71717A',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'square',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default CumulativeVideoChart;
