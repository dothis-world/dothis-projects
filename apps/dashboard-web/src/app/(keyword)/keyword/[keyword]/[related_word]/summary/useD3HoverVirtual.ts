import * as D3 from 'd3';
import { title } from 'process';
import { useImperativeHandle, useRef } from 'react';
import ReactDOM from 'react-dom';

import { renderTooltip } from '@/app/(keyword)/channel/competitive-analysis/TooltipComponent';

import type { DataItem } from './SummaryChart';

export interface DataItemV2 {
  date: string;
  value: {
    title: string | null;
    thumnail: string | null; // 'thumnail' -> 'thumbnail'로 수정
  };
}

type Test = {
  date: string;
  value: {
    title: string | null;
    thumnail: string | null;
  };
}[];
interface LineRef<T> {
  //   line: D3.Line<DataItem>;
  render: (selectorFn: {
    handleSelectHoverCircle: () => D3.Selection<
      SVGCircleElement,
      T,
      D3.BaseType,
      unknown
    >;
    handleSelectHoverLines: () => D3.Selection<
      SVGRectElement,
      T,
      D3.BaseType,
      unknown
    >;
  }) => void;
  remove: () => void;
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
  chartSelector: D3.Selection<D3.BaseType, unknown, HTMLElement, any>;
  data: DataItem[];
  dimensions: Dimensions;
  xScale: D3.ScaleBand<string> | undefined;

  tooltip: D3.Selection<D3.BaseType, unknown, HTMLElement, any>;
  tooltipColorCallback?: (index: number, colorList: string[]) => void;
  keywordList?: string[];
  index: number;
  hoverData: Test;
}

const useD3HoverVirtual = ({
  chartSelector,
  data,
  dimensions,
  xScale,
  tooltip,
  tooltipColorCallback,
  keywordList,
  index,
  hoverData,
}: Props) => {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    dimensions;

  const hoverVirtualRef = useRef<LineRef<DataItem> | null>(null);

  const timeSeriesData = data;

  const handleSelectHoverVirtualDom = () => {
    return chartSelector.select<SVGGElement>('.hover-virtual-rect-group');
  };

  const tooltipContent = (
    data: DataItem,
    index: number,
    colorList: string[],
  ) => {
    return `<div style="display:flex; align-items:center;"> 
              <div  style="border:2px solid ; width:8px; height:8px; border-radius:9999px; background-color:transparent; margin-right:8px;" ></div>
                <p style="color: #E4E4E7; font-size: 14px;
                  font-style: normal;
                  font-weight: 700; flex-basis: 30%; margin-right:8px;">${data.value.toLocaleString(
                    'ko-kr',
                  )}</p>
                <p style="color: #A1A1AA; font-size: 12px;
                font-style: normal;
                font-weight: 500; white-space:nowrap;"> ${'테스트'} </p>
              </div>`;
  };

  useImperativeHandle(hoverVirtualRef, () => ({
    render: ({ handleSelectHoverCircle, handleSelectHoverLines }) => {
      if (!xScale) return;

      let hoverLineGroup = chartSelector.select<SVGGElement>(
        '.hover-virtual-rect-group',
      );
      if (hoverLineGroup.empty()) {
        // If it doesn't exist, create it

        hoverLineGroup = chartSelector
          .append('g')
          .attr('class', 'hover-virtual-rect-group');
      }

      const hoverDotsSelector = handleSelectHoverCircle();

      const hoverLinesSelector = handleSelectHoverLines();

      hoverLineGroup
        .selectAll('rect')
        .data(timeSeriesData)
        .enter()
        .append('rect')
        .attr(
          'x',
          (d) => (xScale(d?.date) as number) + xScale.bandwidth() / 2 - 20,
        )
        .attr('y', marginTop)
        .attr('width', 40)
        .attr('height', height - marginBottom - marginTop)
        .attr('fill', 'transparent')
        .raise()
        .on('mouseover', (e, i) => {
          //   const bisect = D3.bisector(
          //     (d: DataItem | (typeof timeSeriesData)[number]) => d.date,
          //   ).left;

          //   const bisectArray = data.map((currentData) => {
          //     const dataLavel = bisect(currentData, i.date);

          //     return currentData[dataLavel];
          //   });

          hoverLinesSelector
            .filter((d, item) => (d as DataItem).date === i.date)
            .style('opacity', 1);

          hoverDotsSelector
            .filter((d, item) => (d as DataItem).date === i.date)
            .style('opacity', 1);

          D3.select(e.target).transition().attr('r', 4);

          const [mouseX, mouseY] = D3.pointer(e);

          tooltip.transition().duration(0).style('display', 'block');

          const colorList = ['green', 'blue'];

          const relatedData = hoverData.find((item) => item.date === i.date);

          if (
            relatedData &&
            relatedData.value &&
            relatedData.value.thumnail &&
            relatedData.value.title
          ) {
            renderTooltip(
              mouseX,
              mouseY,
              relatedData.value.title,
              index,
              relatedData.value.thumnail,
            );
          }
          // tooltip
          //   .html(
          //     `<div>
          //    <div style="width : 160px; position: relative;" class="relative aspect-video overflow-hidden bg-white">
          //        <img alt="Picture of the author" loading="lazy" decoding="async" data-nimg="fill" class="object-cover" src="https://img.youtube.com/vi/lzm-7YfBJBU/maxresdefault.jpg" style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;">
          //        </div>
          //   </div>`,
          //   )
          //   .style('left', mouseY + convertRemToPixels(-1.6) + 'px')
          //   .style('top', mouseX - convertRemToPixels(2) + 'px');
        })
        .on('mousemove', function (e, i) {
          const relatedData = hoverData.find((item) => item.date === i.date);

          const [mouseX, mouseY] = D3.pointer(e);

          if (
            relatedData &&
            relatedData.value &&
            relatedData.value.thumnail &&
            relatedData.value.title
          ) {
            renderTooltip(
              mouseX,
              mouseY,
              relatedData.value.title,
              index,
              relatedData.value.thumnail,
            );
          }
          return tooltip

            .style('top', mouseY + convertRemToPixels(-1.6) + 'px')
            .style('left', mouseX + convertRemToPixels(2) + 'px');
        })
        .on('mouseout', (e) => {
          //   데이터가 정상적으로 로드되지 않았을 때 dotsSelector도 존재하지 않아서 mouseout circle 이벤트 효과가 기대했던대로 동작하지 않는 버그가 존재 --> 그로인해 dotsSelector 비어있을 경우 (즉 데이터가 불러오지 못했을 경우 해당 chart 안에 circle을 전부 지워버리도록 코드 추가 (hover 시에 circle에 class를 추가하는 방식도 고려해볼 수 있음 -지울 때 circle 범위를 축소시키기 위해))

          /**
           * dotsSelector.empty로 구성했을 경우 두 번째 이상으로 활성된 circle에 대해서는 또 대응을 하지 못한다. 첫 번째로 가져온 연관어에 대해서는 데이터를 불러와서 empty 조건에 넘어가지 못함
           *
           */
          //   if (dotsSelector.empty()) {
          // chartSelector.selectAll('circle').style('opacity', 0);
          // }

          hoverDotsSelector.style('opacity', 0);

          D3.select(e.target).transition().attr('r', 2);

          hoverLinesSelector.style('opacity', 0);

          tooltip.transition().duration(0);
          tooltip.style('display', 'none');
        });

      hoverLineGroup
        .selectAll('rect')
        .data(timeSeriesData)
        .on('mouseover', (e, i) => {
          const relatedData = hoverData.find((item) => item.date === i.date);

          const [mouseX, mouseY] = D3.pointer(e);

          if (
            relatedData &&
            relatedData.value &&
            relatedData.value.thumnail &&
            relatedData.value.title
          ) {
            renderTooltip(
              mouseX,
              mouseY,
              relatedData.value.title,
              index,
              relatedData.value.thumnail,
            );
          }
          hoverLinesSelector
            .filter((d, item) => (d as DataItem).date === i.date)
            .style('opacity', 1);

          hoverDotsSelector
            .filter((d, item) => (d as DataItem).date === i.date)
            .style('opacity', 1);

          D3.select(e.target).transition().attr('r', 4);

          tooltip.transition().duration(0).style('display', 'block');

          const colorList = ['green', 'blue'];
          tooltip
            .html(
              `<div>  
            
                    <div style="width : 160px; position: relative;" class="relative aspect-video overflow-hidden bg-white">
                <img alt="Picture of the author" loading="lazy" decoding="async" data-nimg="fill" class="object-cover" src="https://img.youtube.com/vi/lzm-7YfBJBU/maxresdefault.jpg" style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;">
                </div>
          </div>`,
            )
            .style('left', mouseY + convertRemToPixels(-1.6) + 'px')
            .style('top', mouseX - convertRemToPixels(2) + 'px');
        })
        .on('mousemove', function (e, i) {
          const relatedData = hoverData.find((item) => item.date === i.date);

          const [mouseX, mouseY] = D3.pointer(e);

          if (
            relatedData &&
            relatedData.value &&
            relatedData.value.thumnail &&
            relatedData.value.title
          ) {
            renderTooltip(
              mouseX,
              mouseY,
              relatedData.value.title,
              index,
              relatedData.value.thumnail,
            );
          }

          return tooltip

            .style('top', mouseY + convertRemToPixels(-1.6) + 'px')
            .style('left', mouseX + convertRemToPixels(2) + 'px');
        })
        .on('mouseout', (e) => {
          //   데이터가 정상적으로 로드되지 않았을 때 dotsSelector도 존재하지 않아서 mouseout circle 이벤트 효과가 기대했던대로 동작하지 않는 버그가 존재 --> 그로인해 dotsSelector 비어있을 경우 (즉 데이터가 불러오지 못했을 경우 해당 chart 안에 circle을 전부 지워버리도록 코드 추가 (hover 시에 circle에 class를 추가하는 방식도 고려해볼 수 있음 -지울 때 circle 범위를 축소시키기 위해))

          /**
           * dotsSelector.empty로 구성했을 경우 두 번째 이상으로 활성된 circle에 대해서는 또 대응을 하지 못한다. 첫 번째로 가져온 연관어에 대해서는 데이터를 불러와서 empty 조건에 넘어가지 못함
           *
           */
          //   if (dotsSelector.empty()) {
          // chartSelector.selectAll('circle').style('opacity', 0);
          // }

          hoverDotsSelector.style('opacity', 0);
          const tooltipContainer = document.getElementById(
            `tooltip-container-${index}`,
          );
          if (tooltipContainer) {
            ReactDOM.unmountComponentAtNode(tooltipContainer);
          }
          D3.select(e.target).transition().attr('r', 2);

          hoverLinesSelector.style('opacity', 0);

          tooltip.transition().duration(0);
          tooltip.style('display', 'none');
        });
    },
    remove: () => {
      const hoverVirtualDomSelector = handleSelectHoverVirtualDom();

      hoverVirtualDomSelector.remove();
    },
  }));

  return { hoverVirtualRef };
};

export default useD3HoverVirtual;
const convertRemToPixels = (rem: number) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};
