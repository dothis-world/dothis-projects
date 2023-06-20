import { Logo, NavButtonsContainer, SidebarLayout } from './style';
import Keywords from './svg/keyword.svg';
import Magicpen from './svg/magicpen.svg';
import Messages from './svg/messages.svg';
import Trednup from './svg/trendup.svg';
import User from './svg/user.svg';
import Dothis_logo from './svg/logo.svg';

const SVG_SIZE = 24;

export default function Sidebar() {
  return (
    <SidebarLayout>
      <Logo>
        <Dothis_logo width={38} height={42} />
      </Logo>
      <NavButtonsContainer>
        <button>
          <Keywords width={SVG_SIZE} height={SVG_SIZE} />
        </button>
        <button>
          <Magicpen width={SVG_SIZE} height={SVG_SIZE} />
        </button>
        <button>
          <User width={SVG_SIZE} height={SVG_SIZE} />
        </button>
        <button>
          <Trednup width={SVG_SIZE} height={SVG_SIZE} />
        </button>
        <button>
          <Messages width={SVG_SIZE} height={SVG_SIZE} />
        </button>
      </NavButtonsContainer>
    </SidebarLayout>
  );
}
