import styled from 'styled-components';

export const theme = {
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop_s: '1280px',
    desktop_b: '1920px',
  },
};

export const Layout = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const BackgroundDefault = styled.div`
  width: 100%;
  height: 100%;
  word-break: keep-all;
  display: flex;
  justify-content: center;
  align-items: center;
  scroll-snap-align: start;
  padding: 50px 0px;
  position: relative;
`;

export const MainDefault = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-size: 44px;
    font-weight: bolder;
  }
  h3 {
    font-size: 36px;
    font-weight: bolder;
  }
`;

export const CategroiesContainer = styled.div`
  display: flex;
  margin-top: 40px;
  margin-bottom: 52px;
  gap: 40px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const Category = styled.button<{ select: number }>`
  font-size: 20px;
  color: ${(props) => (props.select ? 'black' : 'rgba(161, 161, 170, 1)')};

  @media (max-height: ${theme.breakpoints.tablet}) {
    font-size: 0;
    opacity: 0;
    display: none;
  }
`;

export const MoreButton = styled.button`
  width: 140px;
  height: 54px;
  border-radius: 4px;
  border: 1px solid black;
  font-size: 20px;
  margin-top: 60px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin: 0 auto;
    margin-top: 20px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 16px;
    padding: 12px 16px;
  }
`;

export const TitleDefault = styled.h1`
  font-size: 44px;
  font-weight: 700;
  padding: 0 38px;
  text-align: center;
  /* white-space: nowrap; */

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 26px;
    margin-bottom: 12px;
    padding: 0 14px;
    width: 360px;
  }
`;

export const DescriptionDefault = styled.p`
  font-size: 22px;
  white-space: normal;
  font-weight: 500;
  text-align: center;

  @media (max-width: ${theme.breakpoints.desktop_s}) {
    font-size: 20px;
  }

  @media (max-width: ${theme.breakpoints.desktop_s}) {
    display: flex;
    flex-direction: column;
    /* white-space: nowrap; */
    font-size: 18px;
    text-align: center;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    /* white-space: nowrap; */
    font-size: 16px;
    text-align: center;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 300px;
  }
`;
