import Image from 'next/image';
import React from 'react';
import ReactDOM from 'react-dom';

import { handleImageError } from '@/utils/imagesUtil';

interface TooltipProps {
  x: number;
  y: number;
  content: string; // You can extend this for more complex structures
  tunmnail: string;
}

const Tooltip: React.FC<TooltipProps> = ({ x, y, content, tunmnail }) => {
  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '9px 6px',
    width: '420px',
    minHeight: '200px',
    display: 'block',
    zIndex: 9999,
    overflow: 'visible',
  };

  return (
    <div style={tooltipStyle} className="overflow-visible">
      <div className="text-center text-[18px] font-bold">이 달의 대표 영상</div>
      <div className="overflow-visible">
        <div className="relative aspect-video flex-1 overflow-visible">
          <Image
            unoptimized
            src={`https://img.youtube.com/vi/${tunmnail}/maxresdefault.jpg`}
            alt="Picture of the author"
            onError={handleImageError}
            fill={true}
            // layout="responsive"

            className="overflow-visible object-cover"
          />
        </div>
        <div className="mt-4 text-[16px] font-bold">{content}</div>
      </div>
    </div>
  );
};

export const renderTooltip = (
  x: number,
  y: number,
  content: string,
  index: number,
  tunmnail: string,
) => {
  const tooltipContainer = document.getElementById(
    `tooltip-container-${index}`,
  );
  ReactDOM.render(
    <Tooltip x={x} y={y} content={content} tunmnail={tunmnail} />,
    tooltipContainer,
  );
};
