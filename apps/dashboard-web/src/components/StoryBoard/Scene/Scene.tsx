import { useState } from 'react';

import Draggable from '@/components/common/Dnd/Draggable';
import DraggableContextProvider from '@/components/common/Dnd/DraggableContext';

import SceneControls from './SceneControls';
import SceneList from './SceneList';

const Scene = () => {
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
            <SceneList
              isEditing={isEditing}
              checkedItems={checkedItems}
              toggleChecked={toggleChecked}
            />
          </Draggable>
        </div>
      </div>
    </DraggableContextProvider>
  );
};

export default Scene;
