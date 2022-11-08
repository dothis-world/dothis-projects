import type { FlexProps } from '@chakra-ui/react';
import { Box, Flex, forwardRef } from '@chakra-ui/react';
import type { RequestComment } from '@prisma/client';
import React, { useCallback, useImperativeHandle, useRef } from 'react';

import Button from '../../../components/ui/Button';
import SvgSendPlane from '../../../components/ui/Icons/SvgSendPlane';
import ToastBox from '../../../components/ui/ToastBox';
import UserAvatar from '../../../components/ui/UserAvatar';
import type { RequestCommentDomain } from '../../../domain';
import type { Optional } from '../../../lib/types/utilityTypes';
import type { UserAvatarProps } from '../UserAvatar';
import type { TextareaProps } from './index';
import Textarea from './index';

export type InputCommentTextareaProps = Omit<FlexProps, 'onSubmit'> & {
  user: UserAvatarProps['user'];
  textarea?: Optional<TextareaProps, 'theme'>;
  onSubmit: (
    submitArgs: Omit<RequestCommentDomain.CreateSchema, 'userId' | 'requestId'>,
  ) => void;
  parentId?: RequestComment['parentId'];
  rootId?: RequestComment['rootId'];
};

const InputCommentTextarea = forwardRef<InputCommentTextareaProps, 'textarea'>(
  ({ onSubmit, textarea, parentId, rootId, user, ...props }, ref) => {
    const areaRef = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(ref, () => areaRef.current);

    const handleSubmit = useCallback(() => {
      if (!areaRef.current) throw Error('Textarea element를 찾을 수 없습니다.');
      const value = areaRef.current.value;

      try {
        onSubmit({
          content: value,
          parentId,
          rootId,
        });
        areaRef.current.value = '';
      } catch (e) {
        ToastBox.toast({
          message: '메세지 작성에 실패했습니다.',
          status: 'error',
        });
      }
    }, [areaRef.current]);

    return (
      <Flex gap={12} p={20} {...props}>
        <Box pt={2}>
          <UserAvatar size={32} user={user} />
        </Box>
        <Textarea
          ref={areaRef}
          theme="white"
          flex="auto"
          placeholder="댓글을 작성해 주세요."
          minH={60}
          {...textarea}
        />

        <Button onClick={handleSubmit}>
          <SvgSendPlane />
        </Button>
      </Flex>
    );
  },
);
export default InputCommentTextarea;
