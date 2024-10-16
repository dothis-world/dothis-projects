import { createContext, useContext, useState } from 'react';

type KeywordCounts = Record<string, number>;

interface VideoUseTextState {
  keywordsCounts: KeywordCounts | null;
  setKeywordsCounts: React.Dispatch<React.SetStateAction<KeywordCounts | null>>;

  topKeywords: string[] | null;
  setTopKeywords: React.Dispatch<React.SetStateAction<string[] | null>>;
}

const VideoUseTextContext = createContext<VideoUseTextState | null>(null);

export const useVideoUseTextContext = (componentName: string) => {
  const context = useContext(VideoUseTextContext);

  if (context === null) {
    throw new Error(
      `${componentName}에 상위 <VideoUseTextContext>가 존재하지 않습니다.`,
    );
  }
  return context;
};

const VideoUseTextContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [keywordsCounts, setKeywordsCounts] = useState<KeywordCounts | null>(
    null,
  );

  const [topKeywords, setTopKeywords] = useState<string[] | null>(null);

  return (
    <VideoUseTextContext.Provider
      value={{
        keywordsCounts,
        setKeywordsCounts,
        topKeywords,
        setTopKeywords,
      }}
    >
      {children}
    </VideoUseTextContext.Provider>
  );
};

export default VideoUseTextContextProvider;
