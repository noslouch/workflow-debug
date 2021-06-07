import styled from 'styled-components';

import Headline from '../../Headline';
import { QUERIES } from '../../../lib/consts';

const BigTopHeadline = styled(Headline)`
  font-size: var(--typography-headline-standard-l-font-size);
  line-height: var(--typography-headline-standard-l-line-height);

  @media ${QUERIES.medium} {
    font-size: var(--typography-headline-standard-xxl-font-size);
    line-height: var(--typography-headline-standard-xxl-line-height);

    margin-bottom: 9px;
  }
`;

export default BigTopHeadline;
