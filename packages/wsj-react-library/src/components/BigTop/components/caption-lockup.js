import PropTypes from 'prop-types';
import styled from 'styled-components';

import Figcaption from '../../Image/Figcaption';
import Caption from '../../Image/Caption';
import Credit from '../../Image/Credit';

import { QUERIES } from '../../../lib/consts';

const BigTopCaption = styled(Figcaption).attrs({
  as: 'div',
})`
  color: var(--color-nickel);

  padding: 0 10px;
  margin-bottom: 15px;

  > * {
    display: inline;
  }

  @media ${QUERIES.medium} {
    max-width: 640px;
    margin: 0 auto;
  }

  @media ${QUERIES.large} {
    max-width: 960px;
  }
`;

const CaptionLockup = ({ id, caption, credit, className }) => (
  <BigTopCaption className={className} itemProp="caption" id={id}>
    {caption && <Caption>{caption}</Caption>}{' '}
    {credit && <Credit itemProp="creator">{credit}</Credit>}
  </BigTopCaption>
);

CaptionLockup.propTypes = {
  id: PropTypes.string,
  caption: PropTypes.string,
  credit: PropTypes.string,
};

CaptionLockup.defaultProps = {
  id: '',
  caption: '',
  credit: '',
};

export default CaptionLockup;
