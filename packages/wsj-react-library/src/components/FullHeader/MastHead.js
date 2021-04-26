import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import wsjLogoSmall from '../../assets/branding/wsj-logo-small.svg';
import wsjLogoBig from '../../assets/branding/wsj-logo-big-black.svg';
import sectionLogoMap from './sectionLogos';

const VALID_SECTIONS = new Set([
  'arts',
  'barrons',
  'business',
  'china',
  'economy',
  'guides',
  'japan',
  'life',
  'lifearts',
  'magazine',
  'markets',
  'newsarchive',
  'opinion',
  'politics',
  'realestate',
  'tech',
  'todayspaper',
  'us',
  'world',
]);

const MainWrapper = styled.div`
  margin: 0 auto;
  width: 1280px;
  min-width: 300px;
  position: relative;
`;

const MastHeadWrapper = styled.div`
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoWrapper = styled.div`
  height: ${({ isSlim }) => !isSlim && '75px'};
`;

const SectionLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 7px;

  ${({ isSlim }) =>
    isSlim &&
    `
      margin-top: 7px;
      margin-bottom: 1px;
    `}
`;

const Link = styled.a`
  display: flex;
  align-items: stretch;
  opacity: 1;
  cursor: pointer;
  text-decoration: none;
  color: var(--color-white);
  text-indent: -9999px;
  padding: 0;
  background-repeat: no-repeat;
`;

const BrandLink = styled(Link)`
  width: 570px;
  height: 65px;
  margin: 0 auto 10px;
  background-image: url('${wsjLogoBig}');
  background-size: 550px;
  background-position: center 16.5px;
`;

const SectionFrontLink = styled(Link)`
  width: 90px;
  height: 55px;
  border-right: 1px solid #ccc;
  vertical-align: top;
  background-image: url('${wsjLogoSmall}');
  background-size: 88%;
  background-position: 0px 8px;

  ${({ isSlim }) =>
    isSlim &&
    `
      background-size: auto 27px;
      width: 62px;
      height: 37px;
    `}
`;

const SlimBrandLink = styled(Link)`
  width: 224px;
  height: 35px;
  background-image: url('${wsjLogoBig}');
  background-size: 220px;
  background-position: center 7.5px;
  pointer-events: auto;
`;

const getBrandLogo = (title, mainUrl, isSlim, showValidSectionLogo) => {
  if (showValidSectionLogo) {
    return (
      <SectionFrontLink isSlim={isSlim} href={mainUrl}>
        {title}
      </SectionFrontLink>
    );
  }

  return <BrandLink href={mainUrl}>{title}</BrandLink>;
};

function renderNewSectionLogo(
  { headerConfig: { title }, section, useH1 },
  sectionUrl,
  mainUrl,
  isSlim,
  sectionClass
) {
  // For SEO purposes, only sectionfront should be wrapped in H1 tags, and not WSJ logo
  const SectionTag = useH1 ? <h1>{section}</h1> : section;
  const Logo = sectionLogoMap[sectionClass];

  const Links = (
    <>
      {getBrandLogo(title, mainUrl, isSlim, true)}
      <Logo href={sectionUrl} isSlim={isSlim}>
        {SectionTag}
      </Logo>
    </>
  );

  return <SectionLogoWrapper isSlim={isSlim}>{Links}</SectionLogoWrapper>;
}

const getSlimLogo = (mainUrl) => {
  return <SlimBrandLink aria-label="WSJ Logo" href={mainUrl} />;
};

function renderLogo({ headerConfig: { title }, useH1, isSlim }, mainUrl) {
  const Brand = getBrandLogo(title, mainUrl);
  const Slim = getSlimLogo(mainUrl);
  const logo = isSlim ? Slim : Brand;
  return useH1 ? <h1>{logo}</h1> : logo;
}

const MastHead = (props) => {
  const { navigation = [], section, showSectionLogo, isSlim, children } = props;
  const homeNav = navigation.find(({ id }) => id === 'home');
  const mainUrl = homeNav?.url || 'https://www.wsj.com';
  const sectionKey = section.toLowerCase();
  const sectionUrl = navigation.find(({ id }) => id === sectionKey)?.url;
  const sectionClass = sectionKey.replace(/[^\w]/g, '');
  const isValidSection = VALID_SECTIONS.has(sectionClass);
  const showValidSectionLogo = showSectionLogo && isValidSection;

  const logo = showValidSectionLogo ? (
    renderNewSectionLogo(props, sectionUrl, mainUrl, isSlim, sectionClass)
  ) : (
    <LogoWrapper isSlim={isSlim}>{renderLogo(props, mainUrl)}</LogoWrapper>
  );

  return (
    <MainWrapper>
      <MastHeadWrapper>
        {logo}
        {children}
      </MastHeadWrapper>
    </MainWrapper>
  );
};

MastHead.propTypes = {
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
  section: PropTypes.string,
  showSectionLogo: PropTypes.bool,
  isSlim: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

MastHead.defaultProps = {
  navigation: [],
  section: '',
  showSectionLogo: false,
  children: '',
};

export default MastHead;
