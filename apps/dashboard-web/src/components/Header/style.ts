import styled from 'styled-components';

export const HeaderLayout = styled.header`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SearchBarContainer = styled.div`
  position: relative;

  display: flex;
  justify-content: left;
  align-items: center;
`;

export const SearchBar = styled.input`
  width: 420px;
  height: 24px;
  padding: 24px 12px;
  border-radius: 8px;
  border: 1px solid #a1a1aa;
`;

export const SearchBarButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
`;

export const PlusButton = styled(SearchBarButton)`
  background-color: #f0516d;
  color: white;
  stroke: white;
  fill: white;

  position: absolute;
  right: 42px;
`;

export const EnterButton = styled(SearchBarButton)`
  background-color: #fde7eb;
  color: #f0516d;
  stroke: #f0516d;
  fill: #f0516d;
  margin-left: 4px;
`;

export const ButtonsContainer = styled.div`
  gap: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;
