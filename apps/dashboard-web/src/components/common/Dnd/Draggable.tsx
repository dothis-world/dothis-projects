import clsx from 'clsx';
import React, { useEffect, useMemo } from 'react';

import { useDraggableContext } from './DraggableContext';

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
  const childArray = useMemo(
    () => React.Children.toArray(children),
    [children],
  );
  const {
    draggableItems,
    setDraggableItems,
    draggingIndex,
    dragOverIndex,
    handleDragStart,
    handleDragEnd,
    handleDragEnter,
  } = useDraggableContext('Draggable');

  useEffect(() => {
    setDraggableItems(childArray);
  }, [childArray]);

  return (
    <div className={clsx('flex', `flex-${layout}`, className)}>
      {draggableItems &&
        draggableItems.map((child, index) => (
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
            onDragEnd={() => handleDragEnd()}
            onDragOver={(event) => {
              event.currentTarget.style.cursor = 'grabbing';
              event.preventDefault();
            }}
          >
            {child}
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
