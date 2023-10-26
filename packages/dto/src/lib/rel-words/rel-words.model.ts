import { z } from 'zod';

export const zRelWords = z.object({
  id: z.number(),
  keyword: z.string().describe('애플'),
  relWords: z
    .string()
    .describe(
      '리케,애플행사,xr,애플지분,아이폰업데이트,퀘스트3,앱인벤터,아이지에이웍스,퀄컴,스페이시스,M2칩,맥에어,아이폰13미니,쵸콜릿,에어팟프로2,비전프로,아이폰,mfi,옥시덴탈,애플글라스,애플링,Extra,팥앙금,연육제,삼성갤럭시,칩셋,애플TV,애플MR헤드셋,왓츠앱,개발자회의',
    ),
  cluster: z.string().describe('[14, 71, 65, 7, 29]'),
});

export type RelWordsModel = z.TypeOf<typeof zRelWords>;
