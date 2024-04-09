import React, { createContext, useContext, useState } from 'react';

type DraggableItem =
  | string
  | number
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | Iterable<React.ReactNode>
  | React.ReactPortal
  | React.PromiseLikeOfReactNode;

interface DraggableState {
  draggableItems: DraggableItem[];
  setDraggableItems: React.Dispatch<React.SetStateAction<DraggableItem[]>>;
  draggingIndex: number | null;
  dragOverIndex: number | null;
  handleDragStart: (index: number) => void;
  handleDragEnd: () => void;
  handleDragEnter: (index: number) => void;
}

const DraggableContext = createContext<DraggableState | null>(null);

export const useDraggableContext = (componentName: string) => {
  const context = useContext(DraggableContext);
  if (context === null) {
    throw new Error(
      `${componentName}에 상위 <DraggableContextProvider>기 존재하지 않습니다.`,
    );
  }
  return context;
};

interface DraggableContextProviderProps {
  children: React.ReactNode;
}

const DraggableContextProvider = ({
  children,
}: DraggableContextProviderProps) => {
  const [draggableItems, setDraggableItems] = useState<DraggableItem[]>([]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (draggingIndex === null || dragOverIndex === null) return;
    setDraggableItems((prev) => {
      const newItems = [...prev];
      const item = newItems.splice(draggingIndex, 1)[0];
      newItems.splice(dragOverIndex, 0, item);
      return newItems;
    });
    setDraggingIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnter = (index: number) => {
    if (draggingIndex === null) return;
    setDragOverIndex(index);
  };

  return (
    <DraggableContext.Provider
      value={{
        draggableItems,
        setDraggableItems,
        draggingIndex,
        dragOverIndex,
        handleDragStart,
        handleDragEnd,
        handleDragEnter,
      }}
    >
      {children}
    </DraggableContext.Provider>
  );
};
export default DraggableContextProvider;
