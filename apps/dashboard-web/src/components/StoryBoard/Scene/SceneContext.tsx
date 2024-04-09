import { createContext, useContext, useState } from 'react';

interface SceneState {
  isEditing: boolean;
  toggleEdit: () => void;
}

const SceneContext = createContext<SceneState | null>(null);

export const useSceneContext = (componentName: string) => {
  const context = useContext(SceneContext);
  if (context === null) {
    throw new Error(
      `${componentName}에 상위 <TrendingQueryContextProvider>기 존재하지 않습니다.`,
    );
  }
  return context;
};

interface SceneContextProviderProps {
  children: React.ReactNode;
}

const SceneContextProvider = ({ children }: SceneContextProviderProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(true);

  const toggleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  return (
    <SceneContext.Provider value={{ isEditing, toggleEdit }}>
      {children}
    </SceneContext.Provider>
  );
};
export default SceneContextProvider;
