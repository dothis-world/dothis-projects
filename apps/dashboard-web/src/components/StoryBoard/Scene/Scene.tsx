import SceneContextProvider from './SceneContext';
import SceneControls from './SceneControls';
import SceneList from './SceneList';

const Scene = () => {
  return (
    <SceneContextProvider>
      <div className="no-scrollbar flex h-full flex-col items-center overflow-y-auto">
        <SceneControls />
        <SceneList />
      </div>
    </SceneContextProvider>
  );
};

export default Scene;