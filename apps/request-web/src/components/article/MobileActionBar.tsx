import { Box } from '@chakra-ui/react';
import { useScroll } from '@dothis/ui/src/hooks';
import { css } from '@emotion/react';

import { mediaQueries } from '@/styles/dothisTheme';

import NewRequestPost from '../contents/NewRequestPost';
import { Button } from '../ui/Button';
import { SvgPlus } from '../ui/Icons/SvgPlus';

const MobileActionBar = () => {
  const { scrollDirection } = useScroll();
  return (
    <>
      <Box className={scrollDirection === 'UP' ? 'active' : ''} css={style}>
        <NewRequestPost.ModalLink>
          <Button
            theme="primary"
            width={36}
            h={36}
            borderRadius="50%"
            tabIndex={-1}
          >
            <SvgPlus fill="white" width={36} height={36} />
          </Button>
        </NewRequestPost.ModalLink>
      </Box>
      <Box css={emptyBoxStyle} />
    </>
  );
};

const style = css`
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 0;
  left: 0;
  z-index: 1;

  a {
    position: absolute;
    transition: bottom 0.15s ease-out;
    bottom: -50px;
  }

  &.active a {
    bottom: 8px;
  }

  ${mediaQueries.tablet} {
    display: none;
  }
`;
const emptyBoxStyle = css`
  min-height: 36px;

  ${mediaQueries.tablet} {
    display: none;
  }
`;
export default MobileActionBar;
