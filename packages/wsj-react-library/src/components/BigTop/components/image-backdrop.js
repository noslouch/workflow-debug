import styled, { css } from 'styled-components';

import { QUERIES } from '../../../lib/consts';
import { PLACEMENTS } from '../lib/big-top-consts';

const ImageBackdrop = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  @media ${QUERIES.medium} {
    display: block;
    ${({ noMargin }) => (!noMargin ? 'margin-bottom: 5px;' : null)}
  }

  ${({ gradient }) =>
    gradient &&
    css`
      @media ${QUERIES.medium} {
        &:before {
          content: '';
          z-index: 10;
          pointer-events: none;

          position: absolute;
          top: 0;
          bottom: 0;
          width: 100%;
          ${({ placement }) =>
            placement === PLACEMENTS.CENTER &&
            'background-color: rgba(0, 0, 0, 0.15);'}
          ${({ placement }) =>
            placement === PLACEMENTS.LOWER_THIRD &&
            `
            background: linear-gradient(
              to top,
              rgba(0, 0, 0, 0.7) 0%,
              rgba(0, 0, 0, 0) 50%
            );
          `}
        }
      }
    `}
`;

export default ImageBackdrop;
