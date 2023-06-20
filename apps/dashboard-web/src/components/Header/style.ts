import styled from 'styled-components';

export const HeaderLayout = styled.header`
  width: 100%;
  position: relative;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 48px;
  border-bottom: 1px solid #d4d4d8;
`;

export const SearchBarContainer = styled.div`
  position: relative;
  left: 100px;

  display: flex;
  justify-content: left;
  align-items: center;
`;

export const SearchBar = styled.input`
  width: 420px;
  height: 24px;
  padding: 24px 12px;
  border-radius: 8px;
  border: 1px solid #f0516d;
`;

export const SearchBarButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: abolute;
  right: 0px;
  top: 0px;
  border-radius: 8px;
`;

export const PlusButton = styled(SearchBarButton)`
  background-color: #f0516d;
  color: white;
  stroke: white;
  fill: white;

  position: relative;
  right: 110px;
`;

export const XButton = styled(SearchBarButton)`
  position: relative;
  right: 120px;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: #d9d9d9;
  color: white;
  stroke: white;
`;

export const EnterButton = styled(SearchBarButton)`
  background-color: #fde7eb;
  color: #f0516d;
  stroke: #f0516d;
  fill: #f0516d;
  margin-left: 12px;
`;

export const ButtonsContainer = styled.div`
  gap: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;
