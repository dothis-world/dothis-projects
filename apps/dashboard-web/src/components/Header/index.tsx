import {
  HeaderLayout,
  ButtonsContainer,
  EnterButton,
  PlusButton,
  SearchBar,
  SearchBarButton,
  SearchBarContainer,
  XButton,
} from './style';

import Plus from './svg/+.svg';
import Edit from './svg/edit.svg';
import Notification from './svg/notification.svg';
import Ticket from './svg/ticket.svg';
import User from './svg/user.svg';
import X from './svg/x.svg';

const SVG_SIZE = 24;

export default function Header() {
  return (
    <HeaderLayout>
      <div />
      <SearchBarContainer>
        <SearchBar placeholder="분석하고 싶은 키워드를 추가해 보세요" />
        <EnterButton>
          <Edit widh={24} height={24} />
        </EnterButton>
        <XButton>
          <X width={7} height={7} />
        </XButton>
        <PlusButton>
          <Plus width={12} height={12} />
        </PlusButton>
      </SearchBarContainer>
      <ButtonsContainer>
        <SearchBarButton>
          <Ticket width={SVG_SIZE} heihgt={SVG_SIZE} />
        </SearchBarButton>
        <SearchBarButton>
          <Notification width={SVG_SIZE} heihgt={SVG_SIZE} />
        </SearchBarButton>
        <SearchBarButton>
          <User width={32} heihgt={32} />
        </SearchBarButton>
      </ButtonsContainer>
    </HeaderLayout>
  );
}
