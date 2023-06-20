import {
  HeaderLayout,
  ButtonsContainer,
  EnterButton,
  PlusButton,
  SearchBar,
  SearchBarButton,
  SearchBarContainer,
} from './style';

export default function Header() {
  return (
    <HeaderLayout>
      <div />
      <SearchBarContainer>
        <SearchBar placeholder="분석하고 싶은 키워드를 추가해 보세요" />
        <PlusButton>+</PlusButton>
        <EnterButton>0</EnterButton>
      </SearchBarContainer>
      <ButtonsContainer>
        <SearchBarButton>1</SearchBarButton>
        <SearchBarButton>2</SearchBarButton>
        <SearchBarButton>3</SearchBarButton>
      </ButtonsContainer>
    </HeaderLayout>
  );
}
