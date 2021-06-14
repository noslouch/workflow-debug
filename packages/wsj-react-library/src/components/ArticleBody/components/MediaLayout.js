import styled from 'styled-components';

// Use defined inset widths per layout
// Defined in an array ascending from 4u-16u
// so arr[0] = 4u, arr[3] = 16u etc.
import INSET_WIDTHS from '../insets/widths';

const MediaLayout = styled.div`
  clear: both;
  position: relative;

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
      width: ${INSET_WIDTHS.header[3]}px;
    }
  `}

  ${({ layout }) =>
    layout === 'wrap' &&
    `
    @media (min-width: 640px) {
      float: left;
      margin: 4px 32px 24px 0;
      width: ${INSET_WIDTHS.wrap[1]}px;
    }
  `}

  ${({ layout }) =>
    layout === 'twocolumn' &&
    `
    float: left;
    margin: 4px 32px 24px 0;
    width: ${INSET_WIDTHS.twocolumn[0]}px;
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
      width: ${INSET_WIDTHS.bleed[2]}px;
    }

    @media (min-width: 1300px) {
      margin-left: -160px;
      width: ${INSET_WIDTHS.bleed[3]}px;
    }
  `}

  ${({ layout }) =>
    layout === 'margin' &&
    `
    @media (min-width: 640px) {
      float: left;
      margin-left: 0;
      margin-right: 30px;
      width: ${INSET_WIDTHS.margin[1]}px;
    }

    @media (min-width: 980px) {
      float: right;
      margin-right: -320px;
      margin-left: 30px;
    }

    @media (min-width: 1300px) {
      margin-right: -400px;
    }
  `}
`;

export default MediaLayout;
