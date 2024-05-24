'use client';

import './styles.css';

import * as D3 from 'd3';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const D3Axis = () => {
  const selectRef = useRef(null);

  // const width = 680;
  const height = 290;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 80;
  const marginLeft = 0;

  interface DataItem {
    month: string;
    value: number; // value 속성의 타입을 number로 명시
    color: string;
  }

  const data: DataItem[] = [
    { month: '05/04', value: 222, color: 'red' },
    { month: '05/05', value: 311, color: 'orange' },
    { month: '05/06', value: 290, color: 'yellow' },
    { month: '05/07', value: 288, color: 'green' },
    { month: '05/08', value: 230, color: 'blue' },
    { month: '05/09', value: 222, color: 'indigo' },
  ];

  const data2: DataItem[] = [
    { month: '05/04', value: 50, color: 'red' },
    { month: '05/05', value: 60, color: 'orange' },
    { month: '05/06', value: 40, color: 'yellow' },
    { month: '05/07', value: 28, color: 'green' },
    { month: '05/08', value: 34, color: 'blue' },
    { month: '05/09', value: 21, color: 'indigo' },
  ];

  const data3: DataItem[] = [
    { month: '05/04', value: 60, color: '#818CF8' },
    { month: '05/05', value: 15, color: '#818CF8' },
    { month: '05/06', value: 26, color: '#818CF8' },
    { month: '05/07', value: 34, color: '#818CF8' },
    { month: '05/08', value: 31, color: '#818CF8' },
    { month: '05/09', value: 22, color: '#818CF8' },
  ];

  const allGroup = ['valueA', 'valueB', 'valueC'];

  // Reformat the data: we need an array of arrays of {x, y} tuples
  const dataReady = [
    { name: '일일조회수', values: data, color: '#F0ABFC' },
    { name: '검색량', values: data2, color: '#FCD34D' },
    { name: '영상수', values: data3, color: '#818CF8' },
  ];

  const useDimensions = (targetRef: React.RefObject<HTMLDivElement>) => {
    const getDimensions = () => {
      return {
        width: targetRef.current ? targetRef.current.offsetWidth : 0,
        height: targetRef.current ? targetRef.current.offsetHeight : 0,
      };
    };

    const [dimensions, setDimensions] = useState(getDimensions);

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useLayoutEffect(() => {
      handleResize();
    }, []);

    return dimensions;
  };

  const { width } = useDimensions(selectRef);

  useEffect(() => {
    const chart = D3.select(selectRef.current);
    chart.selectAll('*').remove();

    const svg = D3.select('#axis')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const tooltip = D3.select('#axis')
      .append('div')
      .style('opacity', 0)
      // .attr('class', 'tooltip')
      .style('position', 'abolute')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '1px')
      .style('border-radius', '5px')
      .style('padding', '10px');

    const tooltip2 = D3.select('#tooltip2')
      .style('position', 'absolute')
      .style('top', '-999px')
      .style('left', '-999px')
      .style('display', 'none')
      .style('min-width', '150px')
      .style('background-color', '#3F3F46')
      .style('padding', '9px 6px')
      .style('border-radius', '10px');

    const [min = 0, max = 0] = D3.extent(data, (data) => data.value);

    const x = D3.scaleBand()
      .domain(data.map((item) => item.month))
      .range([marginLeft, width - marginRight]);

    // const xAxis = D3.axisBottom(x);

    const xAxisCallback = (
      g: D3.Selection<SVGGElement, any, HTMLElement, any>,
    ) => {
      return g
        .attr('transform', `translate(0, ${height - marginBottom})`)
        .call(
          D3.axisBottom(x)
            .tickSizeOuter(0)
            .tickSize(0)
            .tickFormat((d) => d + '월'),
        )
        .selectAll('text')
        .attr('font-size', '12px')

        .attr('color', '#A1A1AA');
    };

    const y = D3.scaleLinear()
      .domain([0, max])
      .nice()
      .range([height - marginBottom, marginTop]);

    const yAxisCallback = (
      g: D3.Selection<SVGGElement, any, HTMLElement, any>,
    ) =>
      g
        .attr('transform', `translate(${marginLeft}, 0)`)
        .call(D3.axisLeft(y).tickSize(-width).ticks(3));

    // .call((g) => g.select('#axis').remove())
    // .attr('class', 'grid');

    const yAxis = D3.axisLeft(y).tickSize(-width).ticks(3);
    //   .tickFormat((domainValue) => '');

    svg
      .append('g')
      .call(xAxisCallback)
      .call((g: D3.Selection<SVGGElement, any, HTMLElement, any>) =>
        g.select('.domain').remove(),
      )
      .selectAll('text')
      .attr('transform', 'translate(0,10)');

    svg
      .append('g')
      // .attr('transform', `translate(${marginLeft},0)`)

      .call(yAxisCallback)
      .call((g: D3.Selection<SVGGElement, any, HTMLElement, any>) =>
        g.select('.domain').remove(),
      )
      .attr('class', 'grid')
      .attr('class', function (d) {
        return 'dashed';
      })
      .selectAll('text')
      .remove();
    // vertical bar chart
    svg
      .append('g')
      .selectAll('rect')
      .data(data3)
      .enter()
      .append('rect')
      .attr('x', (data) => (x(data?.month) as number) + x.bandwidth() / 2 - 20)
      .attr('y', (data) => y(data.value))
      .attr('width', 40)
      .attr('height', (data) => y(0) - y(data.value))
      .attr('class', 'bar-chart')
      .attr('class', '영상수')
      .attr('rx', 5)
      .attr('fill', (data) => data.color);

    const line2 = D3.line<DataItem>()
      .x((datum) => Number(x(datum.month)) + x.bandwidth() / 2)
      .y((datum) => y(datum.value))

      .curve(D3.curveCatmullRom);

    const convertRemToPixels = (rem) => {
      return (
        rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
      );
    };

    // .transition()
    // .attr('class', 'point')
    // .attr('stroke', '#14c884')
    // .attr('fill', function (d, i) {
    //   return '#14c884';
    // })
    // .attr('cx', function (d, i) {
    //   return x(d.month);
    // })
    // .attr('cy', function (d, i) {
    //   console.log(d.value);
    //   return y(d.value);
    // })
    // .attr('r', function (d, i) {
    //   return 2;
    // })
    // .style('opacity', 1);

    // D3.select('#Grid')
    //   .transition()
    //   .call(make_y_gridlines().tickSize(-width).tickFormat(''))
    //   .attr('id', 'gridSystem');
    // .on('mouseover', (event, data) => {
    //   console.log('Hovering over', data);
    //   console.log(x(data.month) as number);

    //   tooltip.style('opacity', 1).attr('x', (d) => x(data.month) as number);
    //   // .style('top', `${event.pageY - 28}px`);

    //   tooltip
    //     .style('display', 'block')
    //     .style('top', `${(x(data.month) as number) + 500}px`);
    // })
    // .on('mouseout', () => {
    //   tooltip.style('opacity', 0);
    // });

    //   (D3.curveCatmullRom.alpha(0.3));
    svg
      .append('path')
      .datum(data2)
      .attr('fill', 'none')
      .attr('stroke', '#FCD34D')
      .attr('class', '검색량')
      .attr('stroke-width', 5)
      .style('stroke-linecap', 'round') // 선의 끝 모양을 둥글게 설정
      .attr('d', line2);

    const line = D3.line<DataItem>()
      .x((datum) => {
        // console.log(x(d.month) + x.bandwidth() / 2);

        return Number(x(datum.month)) + x.bandwidth() / 2;
      })
      .y((d) => {
        return y(d.value);
      })
      .curve(D3.curveCatmullRom);

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#F0ABFC')
      .attr('class', '일일조회수')
      .attr('stroke-width', 5)
      .style('stroke-linecap', 'round')
      .attr('d', line);

    const legendSpacing = 80;

    const legendWidth = dataReady.length * legendSpacing;
    const legendStartX = (width - legendWidth) / 2 + 50;

    svg
      .selectAll('myLegend')
      .data(dataReady)
      .enter()
      .append('g')
      .style('fill', '#cf2e2e')
      .style('margin', 8)
      .append('text')
      .attr('class', (d) => `legend${d.name}`)
      .attr('text-anchor', 'middle ') // 텍스트 중앙 정렬

      .attr('transform', function (d, i) {
        d.name;
        return `translate(${
          legendStartX + i * legendSpacing
        }, ${height - marginBottom / 3})`;
      })
      // .attr('x', function (d, i) {
      //   return height;
      // })
      // .attr('y', 30)
      .attr('cursor', 'pointer')
      .text(function (d) {
        return d.name;
      })
      .style('fill', function (d) {
        return d.color;
      })
      .style('font-size', 15)
      .style('border', '1px solid black')

      .on('click', function (d, i) {
        // is the element currently visible ?

        let currentOpacity: string;
        currentOpacity = D3.selectAll('.' + i.name)?.style('opacity');
        // Change the opacity: from 0 to 1 or from 1 to 0
        D3.selectAll('.' + i.name)
          .transition()
          .style('opacity', Number(currentOpacity) == 1 ? 0.2 : 1);

        D3.selectAll('.' + `legend${i.name}`)
          .transition()
          .style('opacity', Number(currentOpacity) == 1 ? 0.2 : 1);
      });

    const hoverLine = svg
      .append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => (x(d?.month) as number) + x.bandwidth() / 2)
      .attr('y', marginTop)
      .attr('width', 1)
      .attr('height', height - marginBottom - marginTop)
      .attr('fill', '#A1A1AA')
      .style('opacity', 0);

    const dot = svg
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('fill', 'white')
      .attr('stroke', dataReady[0].color)
      .attr('stroke-width', '4px')
      .style('z-index', 9999)
      .style('opacity', 0)
      .attr('r', 5)
      .attr('cx', function (d) {
        return x(d.month)! + x.bandwidth() / 2;
      })
      .attr('cy', function (d) {
        return y(d.value);
      });
    const dot2 = svg
      .selectAll('dot')
      .data(data2)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('fill', 'white')
      .attr('stroke', dataReady[1].color)
      .attr('stroke-width', '4px')
      .style('z-index', 9999)
      .style('opacity', 0)
      .attr('r', 5)
      .attr('cx', function (d) {
        return x(d.month)! + x.bandwidth() / 2;
      })
      .attr('cy', function (d) {
        return y(d.value);
      });

    const dot3 = svg
      .selectAll('dot')
      .data(data3)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('fill', 'white')
      .attr('stroke', dataReady[2].color)
      .attr('stroke-width', '4px')
      .style('opacity', 0)
      .style('z-index', 9999)
      .attr('r', 5)
      .attr('cx', function (d) {
        return x(d.month)! + x.bandwidth() / 2;
      })
      .attr('cy', function (d) {
        return y(d.value);
      });

    svg
      .append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => (x(d?.month) as number) + x.bandwidth() / 2 - 20)
      .attr('y', marginTop)
      .attr('width', 40)
      .attr('height', height - marginBottom - marginTop)
      .attr('fill', 'transparent')
      .raise()
      .on('mouseover', (e, i) => {
        // console.log(e);

        const bisect = D3.bisector((d) => d.month).left;
        const dataLavel = bisect(data, i.month);
        const data2Lavel = bisect(data2, i.month);
        const data3Lavel = bisect(data3, i.month);

        const d1 = data[dataLavel];
        const d2 = data2[data2Lavel];
        const d3 = data3[data3Lavel];

        hoverLine.filter((d) => d.month === i.month).style('opacity', 1);

        // Linear interpolation

        svg
          .selectAll('circle')
          .filter(function (d: DataItem, item) {
            return d.month === i.month;
          })
          .style('opacity', 1);

        D3.select(e.target).transition().attr('r', 4);

        tooltip2.transition().duration(0).style('display', 'block');
        tooltip2
          .html(
            `<div>  
              <div style="display:flex; align-items:center;"> 
                <div  style="border:2px solid ${
                  dataReady[0].color
                }; width:8px; height:8px; border-radius:9999px; background-color:transparent; margin-right:8px;" ></div>
                <p style="color: #E4E4E7; font-size: 14px;
                font-style: normal;
                font-weight: 700; flex-basis: 30%; margin-right:8px;">${
                  d1.value
                }</p>
                <p style="color: #A1A1AA; font-size: 12px;
                font-style: normal;
                font-weight: 500; "> ${`일일조회수`} </p>
              </div>
              <div style="display:flex; align-items:center;"> 
                <div  style="border:2px solid ${
                  dataReady[1].color
                }; width:8px; height:8px; border-radius:9999px; background-color:transparent; margin-right:8px;" ></div>
                <p style="color: #E4E4E7; font-size: 14px;
                font-style: normal;
                font-weight: 700; flex-basis: 30%; margin-right:8px;">${
                  d2.value
                }</p>
                <p style="color: #A1A1AA; font-size: 12px;
                font-style: normal;
                font-weight: 500; "> ${`검색량`} </p>
              </div>
              <div style="display:flex; align-items:center;"> 
                <div  style="border:2px solid ${
                  dataReady[2].color
                }; width:8px; height:8px; border-radius:9999px; background-color:transparent; margin-right:8px;" ></div>
                <p style="color: #E4E4E7; font-size: 14px;
                font-style: normal;
                font-weight: 700; flex-basis: 30%; margin-right:8px;">${
                  d3.value
                }</p>
                <p style="color: #A1A1AA; font-size: 12px;
                font-style: normal;
                font-weight: 500; "> ${`영상수`} </p>
              </div>
            </div>`,
          )
          .style('left', e.pageX + convertRemToPixels(-1.6) + 'px')
          .style('top', e.pageY - convertRemToPixels(2) + 'px');
      })
      .on('mousemove', function (e, i) {
        return tooltip2

          .style('top', e.pageY + convertRemToPixels(-1.6) + 'px')
          .style('left', e.pageX + convertRemToPixels(2) + 'px');
      })

      .on('mouseout', (e) => {
        dot.transition().style('opacity', 0);
        dot2.transition().style('opacity', 0);
        dot3.transition().style('opacity', 0);
        D3.select(e.target).transition().attr('r', 2);

        hoverLine.style('opacity', 0);

        tooltip2.transition().duration(0);
        tooltip2
          .style('left', '-999px')
          .style('top', '-999px')
          .style('display', 'none');
      });

    // const line = D3.line()
    //   .x((d) => d.month)
    //   .y((d) => d.value);
    // svg
    //   .append('path')
    //   .datum(data)
    //   .attr('fill', 'none')
    //   .attr('stroke', 'red')
    //   .attr('stroke-width', 2)
    //   .attr('d', line);

    //   .append('g')
    //   .attr('transform', `translate(${marginLeft},0)`)
    //   .attr('zIndex', 9999)
    //   .call(yAxis);

    // setting axis
    // const x = D3.scaleBand()
    //   .domain(['1월', '2월', '3월', '4월', '5월'])
    //   .range([marginLeft, width - marginRight]);

    // const y = D3.scaleLinear()
    //   .domain([0, 100])
    //   .nice()
    //   .range([height - marginBottom, marginTop]);

    // const xAxis = (g) => {
    //   console.log(g);
    //   return g
    //     .attr('transform', `translate(0, ${height})`)
    //     .attr('transform', `translate(0, ${height - marginBottom})`)
    //     .call(D3.axisBottom(x).tickSizeOuter(0));
    // };

    // const yAxis = (g) =>
    //   g
    //     .attr('transform', `translate(${marginLeft}, 0)`)
    //     .call(
    //       D3.axisLeft(y).tickValues([0, 20, 40, 60, 80, 100]).tickSize(-width),
    //     )
    //     .call((g) => g.select('.domain').remove())
    //     .attr('class', 'grid');

    // // apply axis to canvas
    // svg.append('g').call(xAxis);
    // svg.append('g').call(yAxis);
  }, [width]);

  return (
    <div className="">
      <div id="axis" className="h-[290px] w-full" ref={selectRef}></div>
      <div id="tooltip2"></div>
    </div>
  );
};

export default D3Axis;