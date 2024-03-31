import { z } from 'zod';

type StoryBoardOverviewField =
  | 'title'
  | 'author'
  | 'createdDate'
  | 'uploadDate';

type StoryBoardDetailField = 'actors' | 'location' | 'description';

type StoryBoardOverviewFieldValues = Record<StoryBoardOverviewField, string>;

type StoryBoardDetailFieldValues = Record<StoryBoardDetailField, string>;

type StoryBoardFieldValues = StoryBoardOverviewFieldValues &
  StoryBoardDetailFieldValues;

export type { StoryBoardFieldValues };

const STORYBOARD_OVERVIEW_SCHEMA = z.object({
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

const STORYBOARD_DETAIL_SCHEMA = z.object({
  actors: z.string().max(120, { message: 'Title is too long' }),
  location: z.string().max(5000, { message: 'Title is too long' }),
  description: z.string().max(5000, { message: 'Title is too long' }),
});

export const STORYBOARD_EDITOR_SCHEMA = STORYBOARD_OVERVIEW_SCHEMA.merge(
  STORYBOARD_DETAIL_SCHEMA,
);
