import { useState } from 'react';

import SceneControls from './SceneControls';
import SceneList from './SceneList';

const Scene = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const toggleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col items-center gap-[50px]">
      <SceneControls toggleEdit={toggleEdit} />
      <SceneList isEditing={isEditing} />
    </div>
  );
};

export default Scene;
