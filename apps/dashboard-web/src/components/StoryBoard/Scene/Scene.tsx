import SceneContextProvider from './SceneContext';
import SceneControls from './SceneControls';
import SceneList from './SceneList';

const Scene = () => {
  return (
    <SceneContextProvider>
      <div className="flex flex-col items-center gap-[50px]">
        <SceneControls />
        <SceneList />
      </div>
    </SceneContextProvider>
  );
};

export default Scene;
