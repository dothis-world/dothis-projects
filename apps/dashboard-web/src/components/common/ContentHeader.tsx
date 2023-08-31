import type { PropsWithChildren } from 'react';

interface ContentHeaderProps {
  title: string;
}

const ContentHeader = ({
  children,
  title,
}: PropsWithChildren<ContentHeaderProps>) => {
  return (
    <header className="pb-[30px] border-b border-solid border-grey300 bg-grey00">
      <h1 className="text-[32px] font-bold">{title}</h1>
      <div>{children}</div>
    </header>
  );
};

export default ContentHeader;
