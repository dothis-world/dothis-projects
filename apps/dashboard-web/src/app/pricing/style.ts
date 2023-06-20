import styled from 'styled-components';

export const TagContainer = styled.div`
  display: flex;
  justify-content: ;
  align-items: space-around;
  max-width: 1280px;

  div {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 12px;
    overflow: hidden;
  }
`;

export const Tag = styled.button`
  padding: 8px 20px;
  border-radius: 8px;
  border: solid #a1a1aa 1px;
  white-space: nowrap;
  width: 100%;
  color: #a1a1aa;
`;

export const Tag_select = styled(Tag)`
  border: solid #f0516d 1px;
  color: #f0516d;
  background-color: #fef7f8;
`;

export const PriceCategory = styled.table`
  width: 100%;
  text-align: center;
  vertical-align: center;

  margin-top: 120px;

  th {
    font-size: 36px;
    border-bottom: 1px solid #e4e4e7;
    border-collapse: collapse;
    padding: 20px 126px;
  }

  td {
    font-size: 26px;
    padding: 20px 0px;
  }

  button {
    width: 286px;
    height: 56px;
    border-radius: 8px;
    background-color: #f0516d;
    color: white;
    font-size: 16px !important;
  }
`;
export const Th_start = styled.th`
  font-size: 28px !important;
  text-align: left !important;
  padding: 20px 0px 20px 24px !important;
`;

export const Td_start = styled.td`
  font-size: 20px !important;
  text-align: left !important;
  padding: 20px 0px 20px 24px !important;
  font-weight: normal !important;
`;

export const Best_top = styled.th`
  position: relative;
  border-top: 1px solid #f0516d;
  border-left: 1px solid #f0516d;
  border-right: 1px solid #f0516d;
  border-collapse: collapse;
`;

export const Best_mid = styled.td`
  border-left: 1px solid #f0516d;
  border-right: 1px solid #f0516d;
  border-collapse: collapse;
`;

export const Best_bottom = styled.td`
  border-left: 1px solid #f0516d;
  border-right: 1px solid #f0516d;
  border-bottom: 1px solid #f0516d;
  border-collapse: collapse;
`;

export const Best_name = styled.div`
  position: absolute;
  top: -30px;
  left: 0;
  font-size: 20px !important;
  background-color: #f0516d;
  color: white;
  width: 100%;
  height: 30px;
`;

export const Main = styled.main`
  width: 90%;
  position: relative;
  padding: 30px 50px 0px 48px;
  margin-left: 98px;
  overflow: hidden;
  font-weight: bolder;

  h2 {
    font-size: 36px;
    margin-top: 100px;
  }
  p {
    font-size: 28px;
  }
`;

export const Pink = styled.span`
  font-size: inherit;
  color: #f0516d;
`;

export const Background = styled.div``;

export const ImageBox = styled.div`
  width: 100%;
  height: 500px;
`;
