/* global Element */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Dialog } from '@headlessui/react';

import SearchSuggestions from './SearchSuggestions';
// TODO: Delete SVG component when wsj-svg library is ready.
import { ReactComponent as CloseIcon } from '../../assets/branding/close-medium.svg';

const DialogWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10000001;
`;

const Scrim = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  opacity: 0.95;
  ${({ isSearchOpen }) => `display: ${isSearchOpen ? 'block' : 'none'};`}
`;

const SearchForm = styled.form`
  z-index: 9999;
  position: absolute;
  top: 120px;
  left: 50%;
  margin-left: -438px;
  height: 0;
  width: 0;
  opacity: 1;

  ${({ isSearchOpen }) =>
    isSearchOpen &&
    `
      height: 50px;
      width: 885px;
    `};
`;

const SearchInput = styled.input`
  display: inline-block;
  width: 100%;
  height: 48px;
  padding-right: 110px;
  position: absolute;
  top: 0;
  left: -1px;
  border: none;
  border-bottom: 2px solid #c3c3c3;
  border-radius: 0;
  font-family: var(--font-font-stack-retina);
  font-size: 19px;
  -webkit-appearance: none;
  font-weight: 500;
  background: transparent;

  &:focus-within {
    border-bottom: 2px solid #0080c3;
  }

  &&&:focus {
    outline: none;
    color: var(--color-black);
  }
`;

const SearchSubmit = styled.input`
  position: absolute;
  right: 0;
  top: 6px;
  width: auto;
  height: 35px;
  padding: 0 12px;
  border: 1px solid transparent;
  box-sizing: content-box;
  vertical-align: middle;
  color: var(--color-white);
  background-color: var(--color-blue);
  border-radius: 2px;
  font-size: 15px;
  font-family: var(--font-font-stack-retina);
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background-color: var(--color-dark-blue);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 34px;
  right: 100px;
  width: 50px;
  height: 50px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  @media only screen and (min-width: 980px) and (max-width: 1280px) {
    right: 30px;
  }
`;

const SearchDialog = (props) => {
  const {
    autocompleteConfig,
    searchPlaceholder,
    searchText,
    isShowingSearchResults,
    isSearchOpen,
    searchInput,
    clearSearchInput,
    handleSearchInput,
    closeSearchDialog,
    searchPath,
    searchResultData,
    searchSubmit,
    currentSearchButtonRef,
  } = props;

  const searchInputRef = useRef(null);

  function onSearchSubmit(e) {
    e.preventDefault(); // prevents default page reloading upon input submit
    searchSubmit();
  }

  function closeSearch() {
    if (searchInputRef.current && isSearchOpen) {
      searchInputRef.current.value = '';
      clearSearchInput();
      closeSearchDialog();
      currentSearchButtonRef.current.focus();
    }
  }

  return (
    <Dialog
      open={isSearchOpen}
      onClose={closeSearch}
      initialFocus={searchInputRef}
      aria-label="Search"
      as={DialogWrapper}
    >
      <Dialog.Overlay as={Scrim} isSearchOpen={isSearchOpen} />
      <SearchForm
        isSearchOpen={isSearchOpen}
        action="#"
        role="search"
        onSubmit={onSearchSubmit}
      >
        <SearchInput
          type="search"
          onChange={handleSearchInput}
          placeholder={searchPlaceholder}
          aria-label="Search the Wall Street Journal"
          ref={searchInputRef}
        />
        <SearchSubmit
          type="submit"
          aria-label="Submit Button"
          value={searchText}
        />
      </SearchForm>
      {isShowingSearchResults && (
        <SearchSuggestions
          autocompleteConfig={autocompleteConfig}
          searchInput={searchInput}
          searchPath={searchPath}
          searchResultData={searchResultData}
        />
      )}

      <CloseButton onClick={closeSearch} aria-label="Close Search">
        <CloseIcon color="#A6A5A5" />
      </CloseButton>
    </Dialog>
  );
};

SearchDialog.propTypes = {
  clearSearchInput: PropTypes.func,
  closeSearchDialog: PropTypes.func,
  handleSearchInput: PropTypes.func,
  autocompleteConfig: PropTypes.shape({
    error: PropTypes.string,
    loadMore: PropTypes.string,
    privateCompanies: PropTypes.string,
    recent: PropTypes.string,
    symbols: PropTypes.string,
    topics: PropTypes.string,
    viewAll: PropTypes.string,
  }),
  searchPlaceholder: PropTypes.string,
  searchText: PropTypes.string,
  isShowingSearchResults: PropTypes.bool,
  searchInput: PropTypes.string,
  searchPath: PropTypes.string,
  searchResultData: PropTypes.shape({
    searchResults: PropTypes.arrayOf(
      PropTypes.shape({ key: PropTypes.string })
    ),
  }),
  isSearchOpen: PropTypes.bool,
  searchSubmit: PropTypes.func,
  currentSearchButtonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

SearchDialog.defaultProps = {
  autocompleteConfig: {},
  searchPlaceholder: 'Enter News, Quotes, Companies or Videos',
  searchText: 'Search',
  searchInput: '',
  isShowingSearchResults: false,
  searchPath: '',
  searchResultData: null,
  isSearchOpen: false,
  handleSearchInput: () => {},
  searchSubmit: () => {},
  clearSearchInput: () => {},
  closeSearchDialog: () => {},
  currentSearchButtonRef: null,
};

export default SearchDialog;
