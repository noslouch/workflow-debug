import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function LegalBar({ copyright = '' }) {
  return <Wrapper>{copyright}</Wrapper>;
}

LegalBar.propTypes = {
  copyright: PropTypes.string,
};

LegalBar.defaultProps = {
  copyright: `Copyright © ${new Date().getFullYear()} Dow Jones & Company, Inc. All Rights Reserved.\n`,
};

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  margin: 14px 12px 26px;
  font-size: 12px;
  line-height: 14px;
  font-weight: normal;
  font-family: Aileron, helvetica, sans-serif;
  color: #fff;
`;
