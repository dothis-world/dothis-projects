import styled from 'styled-components';

export const SidebarLayout = styled.nav`
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: column;
  border-right: 1px solid #d4d4d8;

  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1001;

  background-color: white;
`;

export const Logo = styled.div`
  width: 50px;
  height: 50px;
  margin: 24px;
  margin-bottom: 60px;

  border: 1px solid black;
`;

export const NavButtonsContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: column;

  gap: 40px;
  padding: 0px 24px;
  button {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    background-color: inherit;
    border: 1px solid #e4e4e7;
  }
`;
