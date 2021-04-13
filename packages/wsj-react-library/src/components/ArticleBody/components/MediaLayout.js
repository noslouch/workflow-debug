import styled from 'styled-components';

const MediaLayout = styled.div`
  ${({ layout }) =>
    layout === 'inline' &&
    `
    width: 100%;
  `}

  ${({ layout }) =>
    layout === 'header' &&
    `
    @media (min-width: 1300px) {
      margin-left: -80px;
      width: 860px;
    }
  `}

  ${({ layout }) =>
    layout === 'wrap' &&
    `
    @media (min-width: 640px) {
      float: left;
      margin: 4px 32px 24px 0;
      width: 300px;
    }
  `}

  ${({ layout }) =>
    layout === 'twocolumn' &&
    `
    float: left;
    margin: 4px 32px 24px 0;
    width: 140px;
  `}

  ${({ layout }) =>
    (layout === 'bleed' || layout === 'edgetoedge') &&
    `
    @media (min-width: 640px) {
      margin-left: calc(-50vw + 330px);
      width: calc(100vw - 40px);
    }

    @media (min-width: 980px) {
      margin-left: -80px;
      width: 940px;
    }

    @media (min-width: 1300px) {
      margin-left: -160px;
      width: 1260px;
    }
  `}
`;

export default MediaLayout;
