import clsx from 'clsx';
import React, { useState } from 'react';

interface DraggableProps {
  children: React.ReactNode;
  handle?: boolean;
  layout?: 'row' | 'col';
  className?: string;
  style?: React.CSSProperties;
}

const Draggable = ({
  children,
  handle = false,
  layout = 'col',
  className,
  style,
}: DraggableProps) => {
  const [draggableItems, setDraggableItems] = useState(
    React.Children.toArray(children),
  );
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (draggingIndex === null || dragOverIndex === null) return;
    const newItems = [...draggableItems];
    const item = newItems.splice(draggingIndex, 1)[0];
    newItems.splice(dragOverIndex, 0, item);
    setDraggableItems(newItems);
    setDraggingIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnter = (index: number) => {
    console.log(draggingIndex, dragOverIndex);
    if (draggingIndex === null) return;
    setDragOverIndex(index);
  };

  return (
    <div
      className={clsx('flex', `flex-${layout}`, className)}
      style={{ transition: 'transform 2s ease', ...style }}
    >
      {draggableItems.map((child, index) => (
        <li
          key={(React.isValidElement(child) && child.props.key) ?? index}
          className={clsx(
            'even:bg-grey200 border-gery500 bg-grey00 select-none list-none gap-1 border-solid',
            !handle && 'hover:bg-grey200 cursor-grab ',
            draggingIndex !== null &&
              index === dragOverIndex &&
              clsx(
                index < draggingIndex && 'border-primary500 border-t-2',
                index > draggingIndex && 'border-primary500 border-b-2',
              ),
          )}
          draggable={!handle}
          onDragStart={() => !handle && handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragEnd={handleDragEnd}
          onDragOver={(event) => {
            event.currentTarget.style.cursor = 'grabbing';
            event.preventDefault();
          }}
        >
          {handle
            ? React.cloneElement(child as React.ReactElement<any>, {
                handleDragStart: () => handleDragStart(index),
              })
            : child}
        </li>
      ))}
      <div
        className={clsx(
          'h-1',
          draggableItems.length === dragOverIndex
            ? 'border-primary500 border-t-2'
            : '1px solid black',
        )}
        onDragEnter={() => handleDragEnter(draggableItems.length)}
        onDragEnd={handleDragEnd}
        onDragOver={(event) => {
          event.currentTarget.style.cursor = 'grabbing';
          event.preventDefault();
        }}
      ></div>
    </div>
  );
};

export default Draggable;
