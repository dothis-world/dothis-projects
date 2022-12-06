import type { TextProps } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import * as React from 'react';

import { Button } from '../Button';
import { typo } from '../../../lib';
import { SvgPrev } from '../Icons';

type Props = TextProps & { onClose?: () => void };
export const PageTitle = ({ onClose, ...props }: Props) => {
  return (
    <header css={style}>
      {onClose && (
        <Button className="ui_header-title-close-button" onClick={onClose}>
          <SvgPrev />
        </Button>
      )}
      <Text className="ui_header-title-text" as="h3" {...props} />
    </header>
  );
};

const style = css`
  display: flex;
  align-items: center;
  height: 64px;
  margin-top: 12px;
  margin-bottom: 12px;

  .ui_header-title-text {
    ${typo.t2};
  }

  .ui_header-title-close-button {
    height: 100%;
    width: 48px;
  }
`;

