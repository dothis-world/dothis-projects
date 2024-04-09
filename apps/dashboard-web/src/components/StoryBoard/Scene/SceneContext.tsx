import React, { createContext, useContext, useRef, useState } from 'react';

interface SceneState {
  isEditing: boolean;
  toggleEdit: () => void;
  scrollRef: React.RefObject<HTMLDivElement>;
  addScene: () => void;
  checkedItems: { [key: string]: boolean };
  toggleChecked: (id: string) => void;
  getCheckedSceneIds: () => void;
}

const SceneContext = createContext<SceneState | null>(null);

export const useSceneContext = (componentName: string) => {
  const context = useContext(SceneContext);
  if (context === null) {
    throw new Error(
      `${componentName}에 상위 <SceneContextProvider>기 존재하지 않습니다.`,
    );
  }
  return context;
};

interface SceneContextProviderProps {
  children: React.ReactNode;
}

const SceneContextProvider = ({ children }: SceneContextProviderProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const toggleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const addScene = () => {
    scrollRef.current?.scrollTo({ top: 10000, behavior: 'smooth' });
  };

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {},
  );
  const toggleChecked = (id: string) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  };
  const getCheckedSceneIds = () => {
    return Object.keys(checkedItems).filter((key) => checkedItems[key]);
  };

  return (
    <SceneContext.Provider
      value={{
        isEditing,
        toggleEdit,
        scrollRef,
        addScene,
        checkedItems,
        toggleChecked,
        getCheckedSceneIds,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
};
export default SceneContextProvider;
