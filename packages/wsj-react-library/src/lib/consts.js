import { css } from 'styled-components';

export const CENTER = 'Center';
export const LOWER_THIRD = 'LowerThird';
export const UNDERNEATH = 'UnderneathPhoto';

export const EXCLUSIVE = 'WSJ News Exclusive';

export const QUERIES = {
  medium: '(min-width: 640px)',
  large: '(min-width: 980px)',
};

export const PLACEMENTS = {
  CENTER,
  LOWER_THIRD,
  UNDERNEATH,
  [CENTER]: css`
    @media ${QUERIES.medium} {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      height: fit-content;
      margin: auto;
    }
  `,
  [LOWER_THIRD]: css`
    @media ${QUERIES.medium} {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 10px;
      margin: 0 auto;
    }
    @media ${QUERIES.large} {
      bottom: 30px;
    }
  `,
};
