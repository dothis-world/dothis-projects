import { createContext, useContext, useState } from 'react';

interface VideoUseTextState {
  searchKeyword: string | null;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string | null>>;

  filterKeywords: string[] | null;
  setFilterKeywords: React.Dispatch<React.SetStateAction<string[] | null>>;
}

const VideoUseTextFilterContext = createContext<VideoUseTextState | null>(null);

export const useVideoUseTextFilterContext = (componentName: string) => {
  const context = useContext(VideoUseTextFilterContext);

  if (context === null) {
    throw new Error(
      `${componentName}에 상위 <VideoUseTextFilterContext>가 존재하지 않습니다.`,
    );
  }
  return context;
};

const VideoUseTextFilterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchKeyword, setSearchKeyword] = useState<string | null>(null);

  const [filterKeywords, setFilterKeywords] = useState<string[] | null>(null);

  return (
    <VideoUseTextFilterContext.Provider
      value={{
        searchKeyword,
        setSearchKeyword,
        filterKeywords,
        setFilterKeywords,
      }}
    >
      {children}
    </VideoUseTextFilterContext.Provider>
  );
};

export default VideoUseTextFilterContextProvider;
