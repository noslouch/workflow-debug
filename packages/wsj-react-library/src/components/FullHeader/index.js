/* global document, window */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MastHead from './MastHead';
import MastHeadStrap from './MastHeadStrap';
import EditionPicker from '../EditionPicker';
import headerConfigurations from './config.json';
import chineseTypes from './chineseTypes.json';

const MainHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid #ccc;
  font-family: var(--font-family-retina);
  text-align: center;
  text-rendering: optimizeLegibility;

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: var(--font-weight-regular);
    margin: 0;
    padding: 0;
  }

  & a:active,
  a:link,
  a:visited {
    color: var(--color-nickel);
    text-decoration: none;
  }

  & a:hover {
    color: var(--color-jet);
  }

  ${({ isFixedScroll }) =>
    !isFixedScroll &&
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
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transform: ${({ isVisible }) =>
    isVisible ? 'translateY(0)' : 'translateY(-69px)'};
`;

function FullHeader(props) {
  const {
    articleId,
    // customerNav,
    // cxense,
    displayDate,
    // disableLogin,
    // hideSearch,
    hideHeader,
    homepages,
    isArticle,
    isFixedScroll,
    // loginUrl,
    // logoutUrl,
    navigation, // content.navData
    // navigationOptions,
    path,
    region,
    section,
    // showSearchText,
    showSectionLogo,
    showMastheadStrap,
    useH1,
  } = props;

  // Flag to fully remove WSJ Header needs to be handled by the layout context instead

  const [scrolled, _setScrolled] = useState(false);
  const scrolledRef = useRef(scrolled);

  const setScrolled = (data) => {
    scrolledRef.current = data;
    _setScrolled(data);
  };

  const headerConfig =
    headerConfigurations[region] || headerConfigurations['na,us'];

  function renderEditionPicker(altHomepages, isChinesePicker = false) {
    return (
      <EditionPicker
        placement="header"
        homepages={altHomepages || homepages}
        region={region}
        isChinesePicker={isChinesePicker}
      />
    );
  }

  function renderChinesePicker() {
    // articleId, isArticle, path
    const regionalPath = ['/zh-hans', '/zh-hant'];
    const redirectArticleId = [
      articleId.replace(/^CT/, 'CN'),
      articleId.replace(/^CN/, 'CT'),
    ];

    const chineseTypesOptions = chineseTypes.map((item, i) => {
      const url =
        isArticle && articleId
          ? `/articles/${redirectArticleId[i]}`
          : `${regionalPath[i]}${path || ''}`;
      return { ...item, url };
    });

    return renderEditionPicker(chineseTypesOptions, true);
  }

  useEffect(() => {
    const scrollHandler = () => {
      const scroll =
        document.documentElement.scrollTop || document.body.scrollTop;

      const scrollAdjust = 105;

      // Set the scrolled state
      if (scroll >= scrollAdjust && !scrolledRef.current) {
        setScrolled(true);
      } else if (scroll < scrollAdjust && scrolledRef.current) {
        setScrolled(false);
      }
    };

    if (isFixedScroll && !hideHeader) {
      window.addEventListener('scroll', scrollHandler);
    }

    return () => {
      if (isFixedScroll && !hideHeader) {
        window.removeEventListener('scroll', scrollHandler);
      }
    };
  }, [hideHeader, isFixedScroll]);

  const mastHeadProps = {
    headerConfig,
    navigation: navigation || [],
    section,
    showMastheadStrap,
    showSectionLogo,
    useH1,
  };

  return (
    <MainHeader
      isFixedScroll={isFixedScroll}
      role="banner"
      aria-label="Primary"
    >
      <MastHead {...mastHeadProps} isSlim={false}>
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
      <SlimHeader isVisible={scrolled}>
        <MastHead {...mastHeadProps} isSlim />
      </SlimHeader>
    </MainHeader>
  );
}

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
  hideHeader: PropTypes.bool,
  homepages: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      label: PropTypes.string,
      region: PropTypes.string,
      url: PropTypes.string /* format: 'uri' */,
    })
  ),
  isFixedScroll: PropTypes.bool,
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
  customerNav: null,
  homepages: [],
  articleId: '',
  section: '',
  disableLogin: false,
  hideHeader: false,
  hideSearch: false,
  displayDate: '',
  navigation: [],
  isArticle: false,
  isFixedScroll: true,
  region: 'na,us',
  showSearchText: false,
  showMastheadStrap: true,
  showSectionLogo: false,
  useH1: false,
  cxense: null,
};

export default FullHeader;
