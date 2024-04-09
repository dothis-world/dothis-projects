import { Button } from 'dashboard-storybook/src/components/Button/Button';

import { useSceneContext } from './SceneContext';

// TODO: 씬 추가, 삭제 버튼 design
const SceneControls = () => {
  // 씬 삭제
  // 씬 순서 변경
  const { toggleEdit, addScene } = useSceneContext('SceneControls');

  const createScene = () => {
    // TODO: mutate
    addScene();
  };

  return (
    <div className="flex w-full gap-[24px] px-[10px] py-[30px] text-base">
      <div className="inline-flex grow gap-[20px]">
        <Button size="L" theme="outlined" onClick={toggleEdit}>
          씬 전체 편집
        </Button>
        <Button
          className=" text-primary500 bg-primary50 border-primary500 rounded-8 border-[1px] border-solid px-4 py-2 focus:outline-none"
          size="L"
          theme="outlined"
          onClick={createScene}
        >
          + New Scene
        </Button>
        <p></p>
      </div>
      <div className="inline-flex grow-0 gap-[10px]">
        <Button
          className=" bg-grey700 border-grey500 rounded-8 border-[1px] border-solid px-6 py-2 text-white focus:outline-none"
          size="L"
          theme="outlined"
        >
          씬 삭제
        </Button>
        <Button size="L" theme="contained">
          완료
        </Button>
      </div>
    </div>
  );
};

export default SceneControls;
