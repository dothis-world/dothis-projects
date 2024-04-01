'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SceneProps {
  sceneNumber: number;
  sceneId: string;
  defaultValues: StoryBoardSceneFieldValues;
}

type StoryBoardSceneField = 'description' | 'video' | 'audio';
export type StoryBoardSceneFieldValues = Record<StoryBoardSceneField, string>;

const SceneListItem = ({ sceneNumber, sceneId, defaultValues }: SceneProps) => {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        'flex w-full flex-col p-5',
        sceneNumber % 2 ? '' : 'bg-grey200',
      )}
    >
      <div className="flex h-12 w-[100px] flex-row items-center gap-[10px] object-cover ">
        <input className="absoulte" type="checkbox" />
        <p className="inline-text whitespace-nowrap text-black">
          # {sceneNumber}
        </p>
      </div>
      <div className="flex h-[12rem] w-full flex-row items-center gap-[80px] px-[10px] text-center text-sm font-bold text-black">
        <textarea
          className="h-full grow basis-1/3 border p-5 resize-none"
          defaultValue={defaultValues.description}
          maxLength={5000}
          placeholder="씬에 대한 설명을 작성해 주세요."
        />
        <Link
          className="h-full grow basis-1/3 border"
          href={{
            pathname: `${pathname}/${sceneId}`,
          }}
        >
          <p>video image src: {defaultValues.video}</p>
          누르면 artboard 페이지로 이동
        </Link>
        <textarea
          className="h-full grow basis-1/3 border p-5 resize-none"
          defaultValue={defaultValues.audio}
          maxLength={5000}
          placeholder="나레이션 및 자막을 작성해 주세요."
        />
      </div>
    </div>
  );
};

export default SceneListItem;
