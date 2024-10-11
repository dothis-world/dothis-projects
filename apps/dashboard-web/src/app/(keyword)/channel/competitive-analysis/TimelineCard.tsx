import * as D3 from 'd3';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';

import {
  useDailyViewV2,
  useUploadVideoCountFormatterD3,
} from '@/hooks/contents/useChartFormatter';
import {
  useTimelineDailyViewFormatter,
  useTimelineVideoCountFormatter,
  useTimelineVideoFormatter,
} from '@/hooks/contents/useTimelineChartFormatter';
import useGetTimeline from '@/hooks/react-query/query/useGetTimeline';
import useDimensions from '@/hooks/useDimenstions';

import useD3Bar from '../../keyword/[keyword]/[related_word]/summary/useD3Bar';
import useD3HoverDots from '../../keyword/[keyword]/[related_word]/summary/useD3HoverDots';
import useD3HoverLine from '../../keyword/[keyword]/[related_word]/summary/useD3HoverLine';
import useD3HoverVirtual from '../../keyword/[keyword]/[related_word]/summary/useD3HoverVirtual';
import useD3HoverVirtualDom from '../../keyword/[keyword]/[related_word]/summary/useD3HoverVirtualDom';
import useD3Line from '../../keyword/[keyword]/[related_word]/summary/useD3Line';
import useD3Lines from '../../keyword/[keyword]/[related_word]/summary/useD3Lines';
import useXAxis from '../../keyword/[keyword]/[related_word]/summary/useXAxis';
import useYAxes from '../../keyword/[keyword]/[related_word]/summary/useYAxes';
import useYAxis from '../../keyword/[keyword]/[related_word]/summary/useYAxis';

interface Props {
  channelId: string;
  index: number;
}

const TimelineCard = ({ channelId, index }: Props) => {
  const selectRef = useRef<HTMLDivElement>(null);

  const { data } = useGetTimeline({ channelId });

  const { width } = useDimensions(selectRef);

  const test = useTimelineDailyViewFormatter({ channelId });

  const test2 = useTimelineVideoCountFormatter({ channelId });

  const test3 = useTimelineVideoFormatter({ channelId });
  console.log(test2);
  console.log(test3);

  const height = 290;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 60;
  const marginLeft = 0;

  const dimensions = {
    width,
    height,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 SVG 생성
    const svg = D3.select(`#content-timeline-chart-${index}`)
      .append('svg')

      .attr('preserveAspectRatio', 'xMidYMid meet');
    // svgRef.current = svg.node(); // SVG 엘리먼트의 ref 설정

    // chart 객체 초기화

    return () => {
      // 컴포넌트가 언마운트될 때 SVG 제거
      svg.remove();
    };
  }, []); //

  const listData = [test, test2];

  const chart = D3.select(`#content-timeline-chart-${index}`)
    .select('svg')
    .attr('width', width)
    .attr('height', height);

  const { y, yAxisRef } = useYAxis({
    chartSelector: chart,
    data: test,
    dimensions,
    styleMethod(selection) {
      selection.attr('stroke-dasharray', '5, 5').style('opacity', 0.2);
    },
  });

  const { y: yBar, yAxisRef: yAxisBarRef } = useYAxis({
    chartSelector: chart,
    data: test2,
    dimensions,
    styleMethod(selection) {
      selection.attr('stroke-dasharray', '5, 5').style('opacity', 0.2);
    },
  });

  const { y: yList, yAxisRef: yListAxisRef } = useYAxes({
    chartSelector: chart,
    data: listData,
    dimensions,
    styleMethod(selection) {
      selection.attr('stroke-dasharray', '5, 5').style('opacity', 0.2);
    },
  });
  const { x, xAxisRef } = useXAxis({
    chartSelector: chart,
    data: test,
    dimensions,
  });

  const line = useD3Line({
    chartSelector: chart,
    data: test,
    dimensions,
    xScale: x,
    yScale: y,
    styleMethod(selection) {
      //   selection.style('stroke-linecap', 'round');
      //   selection.classed('class', '조회-수');
    },
    curveType: D3.curveLinear, //curvelinear
    title: channelId + '조회-수' + index,
  });

  const bar = useD3Bar({
    chartSelector: chart,
    data: test2,
    title: channelId + '발행영상-수' + index,
    dimensions,
    xScale: x,
    yScale: yBar,
  });

  const tooltip = D3.select(`#content-timeline-tooltip-${index}`)
    .style('position', 'absolute')
    // .style('top', '-999px')
    // .style('left', '-999px')
    .style('display', 'none')
    .style('min-width', '490px')
    .style('min-height', '180px')
    .style('background-color', '#fff')
    .style('border', '1px solid #ccc')
    .style('padding', '9px 6px')
    .style('border-radius', '10px');

  const { lineHoverRef, handleSelectHoverLines } = useD3HoverLine({
    chartSelector: chart,
    data: test,
    dimensions,
    xScale: x,
  });

  const { dotRef, handleSelectHoverCircle } = useD3HoverDots({
    chartSelector: chart,
    data: listData,
    dimensions,
    xScale: x,
    yScale: yList,
    styleMethod(selection, index, isUpdate) {},
  });

  const hoverVirtualDom = useD3HoverVirtual({
    chartSelector: chart,
    data: test,
    dimensions,
    xScale: x,
    tooltip,
    index,
    hoverData: test3,
  });

  useEffect(() => {
    chart.selectAll('*').remove();
  }, [width]);

  useEffect(() => {
    // yAxisRef.current?.remove();
    // xAxisRef.current?.remove();
    yAxisRef.current?.render();
    xAxisRef.current?.render();
    yAxisBarRef.current?.render();
    // lineHoverRef.current?.render();
  }, [width, xAxisRef, yAxisRef]);

  useEffect(() => {
    // dotRef.current?.remove();

    line.current?.remove();
    bar.current?.remove();

    bar.current?.render();
    line.current?.render();

    hoverVirtualDom.hoverVirtualRef.current?.render({
      handleSelectHoverCircle,
      handleSelectHoverLines,
    });

    const xMargin = 16;
    const yMargin = 6;
    const legendSpacing = 80 + xMargin * 2;

    const legendWidth = 2 * legendSpacing;
    const legendStartX = (width - legendWidth) / 2 + 50;

    const dataReady = [
      { name: '조회-수', values: test, color: '#F0ABFC' },
      { name: '발행영상-수', values: test2, color: '#2a61e0' },
    ];
    const legendBackGround = chart

      .selectAll<SVGRectElement, { name: string; values: any; color: string }>(
        'g.legend-group',
      )
      .data(dataReady, (d) => d.name);

    const legendText = chart
      .selectAll<SVGGElement, { name: string; values: any; color: string }>(
        'g.legend-text',
      )
      .data(dataReady, (d) => d.name);

    const legendBack = legendBackGround
      .enter()
      .append('g')
      .attr('class', 'legend-group');

    const legendTextEnter = legendText
      .enter()
      .append('g')
      .attr('class', 'legend-text');

    legendTextEnter
      .style('fill', '#cf2e2e')
      .style('margin', 8)
      .append('text')
      .attr('class', (d) => `${channelId}legend${d.name}${index}`)
      .attr('text-anchor', 'middle ') // 텍스트 중앙 정렬

      .attr('transform', function (d, i) {
        d.name;
        return `translate(${
          legendStartX + i * legendSpacing
        }, ${height - marginBottom / 8})`;
      })
      // .attr('x', function (d, i) {
      //   return height;
      // })
      // .attr('y', 30)
      .attr('cursor', 'pointer')
      .text(function (d) {
        return d.name.replace(/-/g, ' ');
      })
      .style('fill', function (d) {
        return d.color;
      })
      .style('font-size', 15)
      .style('border', '1px solid black')
      .style('pointer-events', 'none');

    const bbox: Record<string, DOMRect> = {};

    legendTextEnter.each(function (d) {
      bbox[d.name] = this.getBBox();
    });

    legendBack
      .append('rect')
      .attr('fill', '#ff0000')
      .attr('width', (d) => (bbox[d.name]?.width || 0) + 2 * xMargin)
      .attr('height', (d) => (bbox[d.name]?.height || 0) + 2 * yMargin)
      .attr('transform', (d, i) => {
        const textBBox = bbox[d.name];
        const rectX =
          legendStartX + i * legendSpacing - textBBox.width / 2 - xMargin;
        const rectY =
          height - marginBottom / 8 - textBBox.height * 0.8 - yMargin;
        return `translate(${rectX}, ${rectY})`;
      })
      .attr('rx', 10)
      .attr('ry', 10)
      .attr('fill', '#fafafa')
      .attr('stroke', (d) => d.color)
      .attr('stroke-width', 1)
      .attr('cursor', 'pointer')
      .on('click', function (d, i) {
        // is the element currently visible ?

        let currentOpacity: string;
        currentOpacity = D3.selectAll('.' + channelId + i.name + index)?.style(
          'opacity',
        );
        // Change the opacity: from 0 to 1 or from 1 to 0
        D3.selectAll('.' + channelId + i.name + index)
          .transition()
          .style('opacity', Number(currentOpacity) == 1 ? 0.2 : 1);

        D3.selectAll('.' + `${channelId}legend${i.name}${index}`)
          .transition()
          .style('opacity', Number(currentOpacity) == 1 ? 0.2 : 1);
      });

    legendBackGround.exit().remove();
  }, [width, JSON.stringify(test)]);

  return (
    <div className="relative flex-grow overflow-visible">
      {/* grid cols 넣으니깐 부모에 반응형적으로 자식이 제어가 된다. 이전 relative 박스가 있기전에    */}
      <div
        className="grid grid-cols-1  [&_svg]:overflow-visible"
        id={`content-timeline-chart-${index}`}
        ref={selectRef}
      ></div>
      <div id={`tooltip-container-${index}`} className="overflow-visible"></div>
      <div id={`content--tooltip-${index}`} className="z-[500]"></div>
    </div>
  );
};

export default TimelineCard;
