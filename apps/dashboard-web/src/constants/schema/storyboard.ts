import { z } from 'zod';

type StoryBoardSummaryField = 'title' | 'author' | 'createdDate' | 'uploadDate';

type StoryBoardOverviewField = 'actors' | 'location' | 'description';

type StoryBoardSummaryFieldValues = Record<StoryBoardSummaryField, string>;

type StoryBoardOverviewFieldValues = Record<StoryBoardOverviewField, string>;

type StoryBoardFieldValues = StoryBoardSummaryFieldValues &
  StoryBoardOverviewFieldValues;

export type { StoryBoardFieldValues };

const STORYBOARD_SUMMARY_SCHEMA = z.object({
  title: z
    .string({
      required_error: 'required field',
      invalid_type_error: 'Title is required',
    })
    .max(120, { message: 'Title is too long' }),
  author: z
    .string({
      required_error: 'required field',
      invalid_type_error: 'Author is required',
    })
    .max(120, { message: 'Author is too long' }),
  createdDate: z.string({
    required_error: 'required field',
    invalid_type_error: 'Date of creation is required',
  }),
  uploadDate: z.string({
    required_error: 'required field',
    invalid_type_error: 'UploadAt is required',
  }),
});

const STORYBOARD_OVERVIEW_SCHEMA = z.object({
  actors: z.string().max(120, { message: 'Title is too long' }),
  location: z.string().max(5000, { message: 'Title is too long' }),
  description: z.string().max(5000, { message: 'Title is too long' }),
});

export const STORYBOARD_EDITOR_SCHEMA = STORYBOARD_SUMMARY_SCHEMA.merge(
  STORYBOARD_OVERVIEW_SCHEMA,
);
