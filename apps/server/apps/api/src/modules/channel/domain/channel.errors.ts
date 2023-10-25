import { ExceptionBase } from '@Libs/commons/src/exceptions/exception.base';

export class ChannelNotFoundError extends ExceptionBase {
  static readonly message = 'Channel not found';

  public readonly code = 'CHANNEL.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(ChannelNotFoundError.message, cause, metadata);
  }
}
