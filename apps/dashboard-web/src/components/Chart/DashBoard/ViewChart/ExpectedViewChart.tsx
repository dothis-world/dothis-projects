import { ResponsiveLine } from '@nivo/line';

const EXPECTEDVIEW_DATA = [
  {
    id: '기대 조회 수(단위:배)',
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

const ExpectedViewChart = () => {
  return (
    <ResponsiveLine
      data={EXPECTEDVIEW_DATA}
      margin={{ bottom: 50, left: 60 }}
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
          anchor: 'bottom',
          direction: 'column',
          justify: false,
          translateX: 60,
          translateY: 80,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'square',
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
              fontSize: 16,
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
  );
};

export default ExpectedViewChart;
