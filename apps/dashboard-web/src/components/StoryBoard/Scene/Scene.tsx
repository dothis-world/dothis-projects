import SceneControls from './SceneControls';
import SceneList from './SceneList';

const Scene = () => {
  return (
    <div className="flex flex-col items-center gap-[50px]">
      <SceneControls />
      <SceneList />
    </div>
  );
};

export default Scene;
