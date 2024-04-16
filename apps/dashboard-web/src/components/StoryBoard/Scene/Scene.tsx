import { useState } from 'react';

import Draggable from '@/components/common/Dnd/Draggable';
import DraggableContextProvider from '@/components/common/Dnd/DraggableContext';

import SceneControls from './SceneControls';
import SceneListItem from './SceneListItem';

const Scene = () => {
  // react query data
  const exData = {
    1: { description: '설명1', video: '비디오1', audio: '오디오1' },
    2: { description: '설명2', video: '비디오2', audio: '오디오2' },
    3: { description: '설명3', video: '비디오3', audio: '오디오3' },
    4: { description: '설명4', video: '비디오4', audio: '오디오4' },
    5: { description: '설명5', video: '비디오5', audio: '오디오5' },
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const toggleEdit = () => {
    setIsEditing((prevState) => !prevState);
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
    <DraggableContextProvider>
      <div className="flex flex-col items-center gap-[50px]">
        <SceneControls
          isEditing={isEditing}
          toggleEdit={toggleEdit}
          getCheckedSceneIds={getCheckedSceneIds}
        />
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center gap-[50px] px-[10px] pt-[20px] text-center font-bold text-black">
            <div className="bg-grey100 grow p-2">Content</div>
            <div className="bg-grey100 grow p-2">Vedio</div>
            <div className="bg-grey100 grow p-2">Audio</div>
          </div>
          <Draggable className="px-[10px]" handle>
            {exData &&
              Object.entries(exData).map(([k, v], i) => (
                <SceneListItem
                  sceneNumber={i + 1}
                  sceneId={k}
                  defaultValues={v}
                  key={k}
                  isEditing={isEditing}
                  checkedItems={checkedItems}
                  toggleChecked={toggleChecked}
                />
              ))}
          </Draggable>
        </div>
      </div>
    </DraggableContextProvider>
  );
};

export default Scene;
