'use client';

import * as Style from '../../LineChart/style';
import DailyViewChart from './DailyViewChart';
import ExpectedViewChart from './ExpectedViewChart';

const ViewChart = () => {
  return (
    <Style.Wrapper>
      <Style.ChartContainer>
        <DailyViewChart />
      </Style.ChartContainer>
      <Style.ChartContainer>
        <ExpectedViewChart />
      </Style.ChartContainer>
    </Style.Wrapper>
  );
};

export default ViewChart;
