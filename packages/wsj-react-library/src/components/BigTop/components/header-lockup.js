import PropTypes from 'prop-types';
import styled from 'styled-components';

import useMediaQuery from '../../../hooks/useMediaQuery';
import { QUERIES, EXCLUSIVE } from '../../../lib/consts';
import { PLACEMENTS } from '../lib/big-top-consts';
import Breadcrumbs, { Breadcrumb, Flashline } from '../../Breadcrumbs';
import Dek from '../../Dek';

import BigTopHeadline from './headline';

const HeadlineContainer = styled.div`
  order: 1;

  margin: 0 10px;

  z-index: 10;

  @media ${QUERIES.medium} {
    text-align: center;

    max-width: 640px;

    ${Breadcrumb},
    ${Flashline},
    ${BigTopHeadline},
    ${Dek} {
      color: white;
    }
  }

  @media ${QUERIES.large} {
    max-width: 960px;
  }

  ${({ $type }) => PLACEMENTS[$type]}
`;

export default function BigHeader({
  breadcrumb,
  dek,
  flashline,
  headline,
  isExclusive,
  showBreadcrumb,
  type,
}) {
  const isMedium = useMediaQuery(QUERIES.medium);
  const noFlashline = !flashline && !isExclusive;

  return (
    <HeadlineContainer $type={type} data-testid={`bigtop-headline-${type}`}>
      {showBreadcrumb && (
        <Breadcrumbs
          breadcrumbs={noFlashline ? breadcrumb : []}
          flashline={isExclusive ? EXCLUSIVE : flashline}
          isExclusive={isExclusive}
          isRecent={false}
        />
      )}
      <BigTopHeadline>{headline}</BigTopHeadline>
      <Dek size={isMedium ? 'm' : 's'}>{dek}</Dek>
    </HeadlineContainer>
  );
}

BigHeader.propTypes = {
  breadcrumb: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  dek: PropTypes.string,
  flashline: PropTypes.string,
  headline: PropTypes.string,
  isExclusive: PropTypes.bool,
  showBreadcrumb: PropTypes.bool,
  type: PropTypes.string,
};

BigHeader.defaultProps = {
  breadcrumb: [],
  dek: '',
  flashline: '',
  headline: '',
  isExclusive: false,
  showBreadcrumb: true,
  type: '',
};
