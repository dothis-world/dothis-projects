import * as D3 from 'd3';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import type { DataItem } from './SummaryChart';

interface XAxisRef {
  x: D3.ScaleBand<string>;
  render: () => void;
}

interface Dimensions {
  width: number;
  height: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
}

interface Props {
  chartSelector: D3.Selection<SVGSVGElement | null, unknown, null, undefined>;
  data: DataItem[];
  dimensions: Dimensions;
  styleMethod?: (selection: D3.Selection<any, any, any, any>) => void;
}
const useXAxis = ({ chartSelector, data, dimensions, styleMethod }: Props) => {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    dimensions;

  const xAxisRef = useRef<XAxisRef | null>(null);

  const x = D3.scaleBand()
    .domain(data.map((item) => item.date))
    .range([marginLeft, width - marginRight]);

  useImperativeHandle(
    xAxisRef,
    () => ({
      render: () => {
        const xAxisCallback = (
          g: D3.Selection<SVGGElement, unknown, null, undefined>,
        ) => {
          return g
            .attr('transform', `translate(0, ${height - marginBottom})`)
            .call(
              D3.axisBottom(x)
                .tickSizeOuter(0)
                .tickSize(0)
                .tickFormat((d) => d),
            )
            .selectAll('text')
            .attr('font-size', '12px')

            .attr('color', '#A1A1AA');
        };
        chartSelector
          .append('g')
          .call(xAxisCallback)
          .call((g: D3.Selection<SVGGElement, unknown, null, undefined>) =>
            g.select('.domain').remove(),
          )
          .call((xAxis) => {
            if (styleMethod) {
              styleMethod(xAxis);
            }
          })
          .selectAll('text')
          .attr('transform', 'translate(0,10)');
      },
      x: x,
    }),
    [chartSelector, width, data],
  );

  return xAxisRef;
};

export default useXAxis;
