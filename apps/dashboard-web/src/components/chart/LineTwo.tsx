'use client';

import { ResponsiveLine } from '@nivo/line';
import styled from 'styled-components';

import { unitFormat } from './utils';

const LineTwo = () => {
  const data = [
    {
      id: '기대 조회 수(단위:배)',
      color: 'hsl(81, 70%, 50%)',
      data: [
        {
          x: '2017-12-29',
          y: 30,
        },
        {
          x: '2017-12-31',
          y: 40,
        },
        {
          x: '2018-01-02',
          y: 70,
        },
        {
          x: '2018-01-04',
          y: 90,
        },
        {
          x: '2018-01-06',
          y: 70,
        },
        {
          x: '2018-01-08',
          y: 100,
        },
        {
          x: '2018-01-10',
          y: 70,
        },
      ],
    },
  ];
  const data2 = [
    {
      id: '일일 조회 수(단위:회)',
      color: 'hsl(81, 70%, 50%)',
      data: [
        {
          x: '2017-12-29',
          y: 600000,
        },
        {
          x: '2017-12-31',
          y: 770000,
        },
        {
          x: '2018-01-03',
          y: 750000,
        },
        {
          x: '2018-01-05',
          y: 630000,
        },
        {
          x: '2018-01-07',
          y: 790000,
        },
        {
          x: '2018-01-09',
          y: 730000,
        },
        {
          x: '2018-01-11',
          y: 770000,
        },
      ],
    },
  ];

  // 현재 공통된 style 프로퍼티는 공용을 만들어서 관리할 생각

  // 최소 구해서 ∙∙∙ 공백 처리 필요
  // y data 도출하기
  // 디자인과 맞게 편집(눈금선 점선으로 )

  return (
    <>
      <ChartContainer className="graph-container">
        <ResponsiveLine
          data={data2}
          margin={{ top: 50, right: 600, left: 60 }}
          lineWidth={4}
          colors={{ scheme: 'red_yellow_blue' }}
          curve="catmullRom"
          // catmullRom 정확한 곡선

          xScale={{
            format: '%Y-%m-%d',
            precision: 'day',
            type: 'time',
            useUTC: false,
          }}
          yScale={{
            type: 'linear',
            min: 500000,
            max: 1000000,
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={{
            tickSize: 0,
            tickPadding: 20,
            tickRotation: 0,
            tickValues: [500000, 600000, 700000, 800000, 900000, 1000000],
            // yAxis value
            format: unitFormat,
            // renderTick: render,
            // rederTick은 format을 더 상세히 자기 입맛에 맞게끔?
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          enableGridX={false}
          // x축 눈금 제거
          gridYValues={[500000, 600000, 700000, 800000, 900000, 1000000]}
          // y 축 눈금
          useMesh={true}
          // 마우스 상호작용을 감지하며 tooltip생성

          enablePoints={false}
          // point 활성화, 비활성화
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 380,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          theme={{
            axis: {
              ticks: {
                line: {
                  stroke: 'green',
                },
                text: {
                  fill: 'black',
                },
              },
            },
            grid: {
              line: {
                stroke: 'pink',
                strokeWidth: 2,
                strokeDasharray: '4 4',
              },
            },
          }}
        />
      </ChartContainer>
      <div
        style={{
          width: '100%',
          height: '450px',
        }}
      >
        <ResponsiveLine
          data={data}
          margin={{ right: 600, bottom: 50, left: 60 }}
          lineWidth={4}
          colors={{ scheme: 'category10' }}
          xScale={{
            format: '%Y-%m-%d',
            precision: 'day',
            type: 'time',
            useUTC: false,
          }}
          enableGridX={false}
          yScale={{
            type: 'linear',
            min: 0,
            max: 120,
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: '%m.%d',
            legendOffset: -12,
            tickValues: 'every 2 days',
          }}
          axisLeft={{
            tickValues: [20, 40, 60, 80, 100],
            tickSize: 0,
            tickPadding: 20,
            tickRotation: 0,

            legendOffset: -40,
            legendPosition: 'middle',
          }}
          gridYValues={[0, 20, 40, 60, 80, 100, 120]}
          useMesh={true}
          curve="catmullRom"
          enablePoints={false}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          theme={{
            axis: {
              ticks: {
                line: {
                  stroke: 'green',
                },
                text: {
                  fill: 'black',
                },
              },
            },
            grid: {
              line: {
                stroke: 'pink',
                strokeWidth: 2,
                strokeDasharray: '4 4',
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default LineTwo;

const ChartContainer = styled.div`
  width: 100%;
  height: 450px;

  & svg {
    overflow: visible;
  }
`;
// 니보 라이브러리 axisLeft  트랜스폼 위로 조금 Text를  g태그에 담겨있다.??
