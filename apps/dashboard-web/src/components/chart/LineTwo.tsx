'use client';

import './Graph.css';

import { ResponsiveLine } from '@nivo/line';
import styled from 'styled-components';

const LineTwo = () => {
  const data = [
    {
      id: 'test',
      color: 'hsl(81, 70%, 50%)',
      data: [
        {
          x: 10,
          y: 30,
        },
        {
          x: 20,
          y: 40,
        },
        {
          x: 30,
          y: 70,
        },
        {
          x: 40,
          y: 90,
        },
        {
          x: 50,
          y: 70,
        },
        {
          x: 60,
          y: 100,
        },
        {
          x: 70,
          y: 70,
        },
      ],
    },
  ];
  const data2 = [
    {
      id: 'feel',
      color: 'hsl(81, 70%, 50%)',
      data: [
        {
          x: 10,
          y: 600000,
        },
        {
          x: 20,
          y: 770000,
        },
        {
          x: 30,
          y: 750000,
        },
        {
          x: 40,
          y: 630000,
        },
        {
          x: 50,
          y: 790000,
        },
        {
          x: 60,
          y: 730000,
        },
        {
          x: 70,
          y: 770000,
        },
      ],
    },
  ];

  return (
    <>
      <ChartContainer className="graph-container">
        <ResponsiveLine
          data={data2}
          margin={{ top: 50, right: 600, left: 60 }}
          xScale={{ type: 'point' }}
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

            // renderTick: render,
            // rederTick은 format을 더 상세히 자기 입맛에 맞게끔?
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          gridYValues={[500000, 600000, 700000, 800000, 900000, 1000000]}
          lineWidth={13}
          useMesh={true}
          curve="catmullRom"
          // catmullRom 정확한 곡선

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
          xScale={{ type: 'point' }}
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
          axisBottom={null}
          axisLeft={{
            tickValues: [20, 40, 60, 80, 100],
            tickSize: 0,
            tickPadding: 20,
            tickRotation: 0,

            legendOffset: -40,
            legendPosition: 'middle',
          }}
          gridYValues={[0, 20, 40, 60, 80, 100, 120]}
          lineWidth={13}
          useMesh={true}
          curve="catmullRom"
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
