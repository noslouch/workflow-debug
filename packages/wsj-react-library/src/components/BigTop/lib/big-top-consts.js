import { css } from 'styled-components';

import { QUERIES } from '../../../lib/consts';

export const CENTER = 'Center';
export const LOWER_THIRD = 'LowerThird';
export const UNDERNEATH = 'UnderneathPhoto';

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
      bottom: 0;
      margin: 0 auto;
      min-height: 40%;
    }
    @media ${QUERIES.large} {
      min-height: 30%;
    }
  `,
};
