import { ExceptionBase } from '@Libs/commons';

export class RelatedWordsNotFoundError extends ExceptionBase {
  static readonly message = 'The relwords could not be found.';

  public readonly code = 'REL_WORDS.NOT_FOUND';

  constructor(metadata?: unknown) {
    super(RelatedWordsNotFoundError.message, undefined, metadata);
  }
}
