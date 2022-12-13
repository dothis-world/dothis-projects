import type { TextProps } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import clsx from 'clsx';
import * as React from 'react'; 

import { colors, mediaQueries, typo } from '../../../lib';
import { Button } from '../Button';
import { SvgClose } from '../Icons';

type Props = TextProps & { onClose(): void; hiddenOnMobile?: boolean };
export const ModalTitle = ({ onClose, hiddenOnMobile, ...props }: Props) => {
  return (
    <header className={clsx(hiddenOnMobile && 'hidden-on-mobile')} css={style}>
      <Text className='ui_header-title-text' as='h3' {...props} />

      {onClose && (
        <Button className='ui_header-title-close-button' onClick={onClose}>
          <SvgClose />
        </Button>
      )}
    </header>
  );
};

const style = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  height: 64px;
  padding-left: 16px;
  padding-right: 8px;
  border-bottom: 1px solid ${colors.border['2']};
  background: ${colors.white};

  &.hidden-on-mobile {
    display: none;

    ${mediaQueries.tablet} {
      display: flex;
    }
  }

  .ui_header-title-text {
    ${typo.t2};
  }

  .ui_header-title-close-button {
    padding: 16px;
  }
`;

