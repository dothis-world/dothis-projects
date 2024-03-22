import clsx from 'clsx';
import React from 'react';

import useDraggable from './useDraggable';

interface DraggableProps {
  children: React.ReactNode;
  onClickHandle?: (index?: number) => void;
  layout?: 'row' | 'col';
  className?: string;
  style?: React.CSSProperties;
}

const Draggable: React.FC<DraggableProps> = ({
  children,
  onClickHandle,
  layout = 'col',
  className,
  style,
}) => {
  const {
    draggableItems,
    draggingIndex,
    handleDragStart,
    handleDragEnd,
    handleDragEnter,
  } = useDraggable(React.Children.toArray(children));
  return (
    <div className={clsx('flex', `flex-${layout}`, className)} style={style}>
      {draggableItems.map((child, index) => (
        <li
          key={index}
          className={clsx(
            'border-gery500 bg-grey00 hover:bg-grey200 cursor-grab list-none gap-1 border-solid px-[10px] py-[30px]',
            index === draggingIndex && 'opacity-0.5 bg-primary100',
          )}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnd={handleDragEnd}
          onDragEnter={() => {
            handleDragEnter(index);
          }}
          onDragOver={(event) => {
            event.currentTarget.style.cursor = 'grabbing';
            event.preventDefault();
          }}
        >
          <label className="p-[10px]">
            {child}
            <div
              className="hover:bg-grey500 absolute h-[30px] w-[20px] translate-x-[-10px] translate-y-[-50px]"
              onClick={() => {
                onClickHandle?.(index);
              }}
            />
          </label>
        </li>
      ))}
    </div>
  );
};

export default Draggable;
