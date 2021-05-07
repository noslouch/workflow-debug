import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// TODO: Delete SVG component when wsj-svg library is ready.
import { ReactComponent as SearchIcon } from '../../assets/branding/search-icon.svg';

const Button = styled.button`
  position: absolute;
  top: -35px;
  right: 12px;
  height: 35px;
  border: none;
  cursor: pointer;
  padding: 0;
  background-color: transparent;
  border: none;

  ${({ showSearchText }) => (showSearchText ? 'width: 80px;' : 'width: 35px;')}

  @media only screen and (min-width: 980px) and (max-width: 1280px) {
    display: none;
  }
`;

const ButtonText = styled.span`
  position: absolute;
  margin: 11px 0;
  top: 0;
  left: 10px;

  color: var(--color-coal);
  font-family: var(--font-font-stack-retina);
  font-weight: 400;
  font-size: 11px;
`;

const ButtonIcon = styled(SearchIcon)`
  position: absolute;
  top: 5px;
  right: 0;
  width: 24px;
  height: 24px;
  border: 1px solid transparent;
  border-bottom: none;
`;

const SearchButton = React.forwardRef((props, ref) => {
  const { showSearchText, searchText, handleSearchBtn } = props;

  return (
    <Button
      showSearchText={showSearchText}
      onClick={handleSearchBtn}
      ref={ref}
      aria-label="Open Search"
    >
      {showSearchText && <ButtonText>{searchText}</ButtonText>}
      <ButtonIcon viewBox="0 0 24 24" />
    </Button>
  );
});

SearchButton.displayName = 'SearchButton';

SearchButton.propTypes = {
  showSearchText: PropTypes.bool,
  searchText: PropTypes.string,
  handleSearchBtn: PropTypes.func,
};

SearchButton.defaultProps = {
  searchText: 'Search',
  showSearchText: false,
  handleSearchBtn: () => {},
};

export default SearchButton;
