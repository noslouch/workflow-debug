import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as WSJLogoBigBlack } from '../../assets/branding/wsj-logo-big-black.svg';
import EditionPicker from '../EditionPicker';

const TopLinksWrapper = styled.div`
  font-family: var(--font-family-retina);

  a:link,
  a:active,
  a:visited {
    color: inherit;
    text-decoration: none;
  }

  background-color: #e9e9e9;
  margin-bottom: 30px;
`;

const TopLinksSector = styled.div`
  margin: 0 auto;
  width: 1280px;

  @media only screen and (min-width: 980px) and (max-width: 1280px) {
    margin: 0 auto;
    width: 980px;
  }
`;

const TopLinksModule = styled.ul`
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
  clear: both;
  box-sizing: border-box;
  height: 44px;
  position: relative;
  list-style: none;
  padding: 0;
`;

const WSJLogo = styled(WSJLogoBigBlack)`
  display: block;
  width: 243px;
  height: 22px;
`;

const WSJLogoWrapper = styled.li`
  flex-shrink: 1;
  margin: 11.5px 18px 0 4px;

  a {
    display: block;
    width: 243px;
    height: 22px;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const EditionPickerWrapper = styled.div`
  width: 150px;
  padding: 15px 0;
  margin-right: auto;
`;

const MemberLinksWrapper = styled.li`
  line-height: 44px;
`;

const MemberLinks = styled.ul`
  padding: 0;
  margin: 0;
  border: 0;
`;

const MemberLinkItem = styled.li`
  list-style: none;
  display: inline-block;

  a {
    font-size: 12px;
    font-weight: 500;
  }
`;

const SubscribeLink = styled.a`
  border-right: 1px solid var(--color-silver);
  padding-right: 15px;
  margin-right: 15px;
`;

const BackToTopWrapper = styled.li`
  cursor: pointer;
  right: 0;
  position: absolute;
  top: -30px;

  a:hover {
    color: var(--color-white);
  }
`;

const BackToTopButton = styled.button`
  display: block;
  padding: 0 10px;
  height: 30px;
  background-color: #bbb;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  font-family: var(--font-family-retina);
  font-size: 11px;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  color: var(--color-white);
  cursor: pointer;
`;

const RotatedArrows = styled.span`
  transform: rotate(90deg);
  display: inline-block;
  font-size: 12px;
  margin-left: 4px;
`;

function memberLinks(isLoggedIn, i18nText, urls) {
  return (
    <MemberLinks>
      {!isLoggedIn && (
        <MemberLinkItem>
          <SubscribeLink
            data-testid="subscribe-link"
            href={urls?.subscribeUrl}
            rel="nofollow"
          >
            {i18nText?.subscribeText}
          </SubscribeLink>
        </MemberLinkItem>
      )}
      <MemberLinkItem>
        <a href={isLoggedIn ? urls?.logoutUrl : urls?.loginUrl}>
          {isLoggedIn ? i18nText?.logoutText : i18nText?.loginText}
        </a>
      </MemberLinkItem>
    </MemberLinks>
  );
}

function scroll2Top() {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
}
function FooterTopLinks({
  currentEditionLabel,
  disableLogin,
  homepages,
  isLoggedIn,
  i18nText,
  title,
  urls,
}) {
  return (
    <TopLinksWrapper>
      <TopLinksSector>
        <TopLinksModule>
          <WSJLogoWrapper>
            <a href={urls?.wsjUrl}>
              <WSJLogo viewBox="325 0 100 75" />
              {title}
            </a>
          </WSJLogoWrapper>
          <EditionPickerWrapper>
            <EditionPicker
              homepages={homepages}
              currentEditionLabel={currentEditionLabel}
            />
          </EditionPickerWrapper>
          {!disableLogin && (
            <MemberLinksWrapper>
              {memberLinks(isLoggedIn, i18nText, urls)}
            </MemberLinksWrapper>
          )}
          <BackToTopWrapper>
            <BackToTopButton onClick={scroll2Top}>
              {i18nText?.topText}
              <RotatedArrows> « </RotatedArrows>
            </BackToTopButton>
          </BackToTopWrapper>
        </TopLinksModule>
      </TopLinksSector>
    </TopLinksWrapper>
  );
}

FooterTopLinks.defaultProps = {
  i18nText: {
    loginText: 'Log In',
    logoutText: 'Log Out',
    subscribeText: 'Subscribe',
    topText: 'TOP',
  },
  title: 'The Wall Street Journal',
  isLoggedIn: false,
  disableLogin: false,
};

FooterTopLinks.propTypes = {
  urls: PropTypes.shape({
    loginUrl: PropTypes.string,
    logoutUrl: PropTypes.string,
    subscribeUrl: PropTypes.string,
  }),
  i18nText: PropTypes.object,
  title: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  disableLogin: PropTypes.bool,
};

export default FooterTopLinks;
