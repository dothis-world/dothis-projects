import { useState } from 'react';

export type DraggableState<T> = {
  draggableItems: T[];
  draggingIndex: number | null;
  handleDragStart: (index: number) => void;
  handleDragEnd: () => void;
  handleDragEnter: (index: number) => void;
};

const useDraggable = <T>(items: T[]): DraggableState<T> => {
  const [draggableItems, setDraggableItems] = useState<T[]>(items);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  const handleDragEnter = (index: number) => {
    if (draggingIndex === null) return;
    if (index === draggingIndex) return;

    const newItems = [...draggableItems];
    const item = newItems.splice(draggingIndex, 1)[0];
    newItems.splice(index, 0, item);

    setDraggableItems(newItems);
    setDraggingIndex(index);
  };

  return {
    draggableItems,
    draggingIndex,
    handleDragStart,
    handleDragEnd,
    handleDragEnter,
  };
};

export default useDraggable;
