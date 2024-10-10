import Image from 'next/image';
import React from 'react';
import ReactDOM from 'react-dom';

import { handleImageError } from '@/utils/imagesUtil';

interface TooltipProps {
  x: number;
  y: number;
  content: string; // You can extend this for more complex structures
}

const Tooltip: React.FC<TooltipProps> = ({ x, y, content }) => {
  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '9px 6px',
    width: '160px',
    height: '100px',
    display: 'block',
    aspectRatio: 16 / 9,
  };

  return (
    <div style={tooltipStyle}>
      <Image
        unoptimized
        src={'https://img.youtube.com/vi/lzm-7YfBJBU/maxresdefault.jpg'}
        alt="Picture of the author"
        onError={handleImageError}
        fill={true}
        // layout="responsive"

        className="object-cover"
      />

      <div>{content}</div>
      <Image
        unoptimized
        src={'https://img.youtube.com/vi/lzm-7YfBJBU/maxresdefault.jpg'}
        alt="Picture of the author"
        onError={handleImageError}
        fill={true}
        // layout="responsive"

        className="object-cover"
      />
      <div>{content}</div>
    </div>
  );
};

export const renderTooltip = (x: number, y: number, content: string) => {
  const tooltipContainer = document.getElementById('tooltip-container');
  ReactDOM.render(<Tooltip x={x} y={y} content={content} />, tooltipContainer);
};
