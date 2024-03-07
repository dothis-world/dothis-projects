import ReactApexChart from 'react-apexcharts';

interface Props {
  series: ApexAxisChartSeries;
}

const DashboardRadarChart = ({ series }: Props) => {
  return (
    <ReactApexChart
      options={{
        chart: {
          toolbar: {
            show: false,
          },
          height: 350,
          type: 'radar',
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1,
          },
        },

        stroke: {
          width: 2,
        },
        fill: {
          opacity: 0.1,
        },

        xaxis: {
          categories: [
            '리그오브레전드',
            '음식',
            '먹방',
            '키워드',
            '유통',
            '물류',
          ],
        },
        yaxis: {
          axisTicks: {
            show: false,
          },

          axisBorder: {
            show: false,
            //   color: '#F0516D',
          },
          labels: {
            style: {
              fontSize: '0px',
              colors: '#F0516D',
            },
            show: false,
          },

          // tooltip: {
          //     enabled: true,
          // },
        },
        markers: {
          size: 1,
          colors: ['#038FFB', '#00E397', '#FEB11A'],

          strokeWidth: 3,
          strokeColors: ['#038FFB', '#00E397', '#FEB11A'],
        },

        tooltip: {
          // y: {
          //   formatter(val, opts) {
          //     return String(val);
          //   },
          // },
        },
        dataLabels: {
          // enabled: true,
        },
      }}
      series={series}
      type="radar"
      height={350}
    />
  );
};

export default DashboardRadarChart;
