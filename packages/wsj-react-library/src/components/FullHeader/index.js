/* global IntersectionObserver */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HeaderNav from './HeaderNav';
import MastHead from './MastHead';
import MastHeadStrap from './MastHeadStrap';
import CustomerNav from './CustomerNav';
import UserMenu from './UserMenu';
import UserLogin from './UserLogin';
import SearchButton from './SearchButton';
import SearchDialog from './SearchDialog';
import EditionPicker from '../EditionPicker';
import debounce from '../../functionHelpers/debounce';
import headerConfigurations from './config.json';
import chineseTypes from './chineseTypes.json';
import {
  Autocomplete,
  SEARCH_URL_PREFIX,
} from '../../searchHelpers/autocomplete';
import getSearchURL from '../../searchHelpers/getSearchURL';

const autocomplete = new Autocomplete();

const EditionPickerWrapper = styled.div`
  z-index: 50;
`;

const MainHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid #ccc;
  font-family: var(--font-font-stack-retina);
  text-align: center;
  text-rendering: optimizeLegibility;

  h1 {
    font-weight: var(--font-weight-regular);
    margin: 0;
    padding: 0;
  }

  ${({ disableScroll }) =>
    disableScroll &&
    `
      position: relative;
      top: 0;
    `}
`;

const SlimHeader = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  border-bottom: 1px solid #ccc;
  z-index: 70;
  background-color: var(--color-white);
  transition: 0.5s cubic-bezier(0.2, 1, 0.3, 1);
  visibility: hidden;
  transform: translateY(-69px);
  ${({ isVisible }) =>
    isVisible &&
    `
      visibility: visible;
      transform: translateY(0);
    `};
`;

const SearchSector = styled.div`
  margin: 0 auto;
  width: 1280px;
  position: relative;
  z-index: 50;

  @media only screen and (min-width: 980px) and (max-width: 1280px) {
    width: 980px;
    position: relative;
  }
`;

const debouncedSearch = debounce((searchTerm, setInput, setData) => {
  setInput(searchTerm);
  autocomplete.displayOnHeader(searchTerm, (results) =>
    setData({ ...results })
  );
}, 500);

const FullHeader = (props) => {
  const {
    articleId,
    customerNav,
    cxense,
    displayDate,
    disableLogin,
    hideSearch,
    homepages,
    isArticle,
    loginUrl,
    logoutUrl,
    navigation,
    path,
    region,
    section,
    showSearchText,
    showSectionLogo,
    showMastheadStrap,
    useH1,
    disableScroll,
  } = props;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShowingSearchResults, setIsShowingSearchResults] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchResultData, setSearchResultData] = useState({});
  const intersectionRef = useRef(null);
  const slimSearchButtonRef = useRef(null);
  const searchButtonRef = useRef(null);

  const currentSearchButtonRef = isScrolled
    ? slimSearchButtonRef
    : searchButtonRef;

  const headerConfig = headerConfigurations[region];
  const {
    loginText,
    logoutText,
    subscribeText,
    searchText,
    autocomplete: autocompleteConfig,
    searchPlaceholder,
  } = headerConfig || {};
  const { urls = {} } = customerNav || {};
  const {
    loginUrl: signinUrl,
    logoutUrl: signoutUrl,
    headerSubscribeUrl,
  } = urls;

  const handleSearchBtn = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const clearSearchInput = () => {
    setSearchInput('');
    setIsShowingSearchResults(false);
  };

  const handleSearchInput = (e) => {
    const searchTerm = e.target.value.trim();

    if (searchTerm === '' && isShowingSearchResults) {
      clearSearchInput();
    } else {
      debouncedSearch(searchTerm, setSearchInput, setSearchResultData);
      if (!isShowingSearchResults) {
        setIsShowingSearchResults(true);
      }
    }
  };

  function searchSubmit() {
    const domain = window.location.hostname;
    window.location.href = getSearchURL(region, domain, searchInput);
  }

  const renderEditionPicker = (altHomepages) => {
    const pages = altHomepages || homepages;
    const { label: currentEditionLabel } =
      pages.find(({ region: reg }) => reg === region) || {};

    return (
      <EditionPickerWrapper>
        <EditionPicker
          homepages={pages}
          region={region}
          currentEditionLabel={currentEditionLabel}
        />
      </EditionPickerWrapper>
    );
  };

  const renderChinesePicker = () => {
    // articleId, isArticle, path
    const regionalPath = ['/zh-hans', '/zh-hant'];
    const redirectArticleId = [
      articleId.replace(/^CT/, 'CN'),
      articleId.replace(/^CN/, 'CT'),
    ];

    const chineseHomepages = chineseTypes.map((item, i) => {
      const url =
        isArticle && articleId
          ? `/articles/${redirectArticleId[i]}`
          : `${regionalPath[i]}${path || ''}`;
      return { ...item, url };
    });

    return renderEditionPicker(chineseHomepages);
  };

  useEffect(() => {
    const intersectionHandler = ([entry = {}]) => {
      const { isIntersecting } = entry;

      if (disableScroll) return null;
      if (isIntersecting) {
        return setIsScrolled(false);
      }
      return setIsScrolled(true);
    };

    const observer = new IntersectionObserver(intersectionHandler, {
      rootMargin: '0px',
      threshold: 0.1,
    });

    observer.observe(intersectionRef.current);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mastHeadProps = {
    headerConfig,
    navigation: navigation || [],
    section,
    showMastheadStrap,
    showSectionLogo,
    useH1,
  };

  const searchProps = {
    clearSearchInput,
    closeSearchDialog: handleSearchBtn,
    handleSearchInput,
    searchText,
    autocompleteConfig,
    searchPlaceholder,
    isShowingSearchResults,
    searchInput,
    searchPath: SEARCH_URL_PREFIX.default,
    searchResultData,
    isSearchOpen,
    searchSubmit,
    showSearchText,
    currentSearchButtonRef,
  };

  const customerContent = ({ isLoggedIn, isSlim }) => {
    if (disableLogin) return null;
    if (isLoggedIn) {
      return (
        <UserMenu
          cxense={cxense}
          isSlim={isSlim}
          logoutText={logoutText}
          region={region}
          urls={urls}
          logoutUrl={signoutUrl || logoutUrl}
        />
      );
    }
    return (
      <UserLogin
        cxensePopup={cxense.popup}
        headerSubscribeUrl={headerSubscribeUrl}
        loginText={loginText}
        subscribeText={subscribeText}
        loginUrl={signinUrl || loginUrl}
      />
    );
  };

  return (
    <MainHeader
      disableScroll={disableScroll}
      role="banner"
      aria-label="Primary"
      ref={intersectionRef}
    >
      <MastHead {...mastHeadProps}>
        <CustomerNav>{customerContent}</CustomerNav>
        {showMastheadStrap && (
          <MastHeadStrap
            region={region}
            headerConfig={headerConfig}
            renderEditionPicker={renderEditionPicker}
            displayDate={displayDate}
            renderChinesePicker={renderChinesePicker}
          />
        )}
      </MastHead>
      <HeaderNav navItems={navigation} section={section} />
      <SearchSector>
        <SearchButton
          handleSearchBtn={handleSearchBtn}
          searchText={searchText}
          showSearchText={showSearchText}
          ref={searchButtonRef}
        />
        {!hideSearch && <SearchDialog {...searchProps} />}
      </SearchSector>
      <SlimHeader isVisible={isScrolled}>
        <MastHead {...mastHeadProps} isSlim>
          <CustomerNav isSlim>{customerContent}</CustomerNav>
        </MastHead>
        <HeaderNav navItems={navigation} section={section} />
        <SearchSector>
          <SearchButton
            handleSearchBtn={handleSearchBtn}
            searchText={searchText}
            showSearchText={showSearchText}
            ref={slimSearchButtonRef}
          />
        </SearchSector>
      </SlimHeader>
    </MainHeader>
  );
};

FullHeader.propTypes = {
  hideSearch: PropTypes.bool,
  loginUrl: PropTypes.string,
  logoutUrl: PropTypes.string,
  path: PropTypes.string,
  customerNav: PropTypes.shape({
    urls: PropTypes.shape({
      firstName: PropTypes.string, // check if first name is in urls object
      lastName: PropTypes.string,
      headerSubscribeUrl: PropTypes.string /* format: 'uri' */,
      logoutUrl: PropTypes.string /* format: 'uri' */,
      loginUrl: PropTypes.string /* format: 'uri' */,
      customerCenterUrl: PropTypes.string /* format: 'uri' */,
      wsjPlusUrl: PropTypes.string /* format: 'uri' */,
      wsjMemberUrl: PropTypes.string /* format: 'uri' */,
      commentsProfileUrl: PropTypes.string /* format: 'uri' */,
      watchlistUrl: PropTypes.string /* format: 'uri' */,
      alertsUrl: PropTypes.string /* format: 'uri' */,
      savedArticlesUrl: PropTypes.string /* format: 'uri' */,
    }),
  }),
  disableLogin: PropTypes.bool,
  displayDate: PropTypes.string,
  homepages: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      label: PropTypes.string,
      region: PropTypes.string,
      url: PropTypes.string /* format: 'uri' */,
    })
  ),
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      alternate_display_label: PropTypes.string,
      url: PropTypes.string,
      desktopURL: PropTypes.string,
      mobileURL: PropTypes.string,
      id: PropTypes.string,
      index: PropTypes.number,
      noHover: PropTypes.bool,
      moreIn: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          index: PropTypes.number,
          category: PropTypes.string,
          url: PropTypes.string,
          desktopURL: PropTypes.string,
          mobileURL: PropTypes.string,
        })
      ),
      categories: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          subsections: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              index: PropTypes.number,
              category: PropTypes.string,
              url: PropTypes.string,
              desktopURL: PropTypes.string,
              mobileURL: PropTypes.string,
            })
          ),
        })
      ),
    })
  ),
  region: PropTypes.string,
  section: PropTypes.string,
  isArticle: PropTypes.bool,
  articleId: PropTypes.string,
  showMastheadStrap: PropTypes.bool,
  showSearchText: PropTypes.bool,
  showSectionLogo: PropTypes.bool,
  useH1: PropTypes.bool,
  disableScroll: PropTypes.bool,
  cxense: PropTypes.shape({
    popup: PropTypes.shape({
      divID: PropTypes.string,
      widgetCall: PropTypes.string,
    }),
    notificationCallout: PropTypes.shape({
      divID: PropTypes.string,
      widgetCall: PropTypes.string,
    }),
  }),
};

FullHeader.defaultProps = {
  loginUrl: '',
  logoutUrl: '',
  path: '',
  customerNav: {},
  homepages: [],
  articleId: '',
  section: '',
  disableLogin: false,
  hideSearch: false,
  displayDate: '',
  navigation: [],
  isArticle: false,
  region: 'na,us',
  showSearchText: false,
  showMastheadStrap: true,
  showSectionLogo: false,
  useH1: false,
  disableScroll: false,
  cxense: {
    popup: {
      divID: 'cx-popup',
    },
    notificationCallOut: {
      divID: 'cx-notification-callout',
    },
  },
};

export default FullHeader;
