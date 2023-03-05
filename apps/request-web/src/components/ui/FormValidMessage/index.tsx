import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { isString } from '@fp-ts/core/String';
import clsx from 'clsx';

import { colors, typo } from '@/styles/dothisTheme';

type Props = BoxProps & {
  errorMessage?: boolean | string | null;
};
export const FormValidMessage = ({
  className,
  errorMessage,
  children,
  ...props
}: Props) => {
  const hasError = isString(errorMessage) ? true : !!errorMessage;
  return (
    <Box
      css={style}
      className={clsx(hasError && 'valid-error', className)}
      {...props}
    >
      {hasError && isString(errorMessage) && (
        <span className="form-valid-error-message">{errorMessage}</span>
      )}
      <span className="form-valid-child-wrap">{children}</span>
    </Box>
  );
};

const style = css`
  display: flex;
  color: ${colors.gray['50']};
  ${typo.b4};

  &.valid-error {
    color: ${colors.primary.default};
  }

  .form-valid-child-wrap {
    margin-left: auto;
  }
`;
