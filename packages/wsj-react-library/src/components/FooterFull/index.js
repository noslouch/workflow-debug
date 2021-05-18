import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FooterPolicyLinks from '../FooterPolicyLinks';
import FooterColumnLinks from '../FooterColumnLinks';
import FooterSocialLinks from '../FooterSocialLinks';
import FooterProductLinks from '../FooterProductLinks';
import FooterTopLinks from '../FooterTopLinks';

const Footer = styled.footer`
  font-family: var(--font-family-retina);

  a:link,
  a:active,
  a:visited {
    color: inherit;
    text-decoration: none;
  }
`;

const FooterWrapper = styled.div`
  background-color: var(--color-snow);

  a:hover {
    color: var(--color-blue);
  }
`;

const ColumnsWrapper = styled.div`
  margin: 0 auto;
  width: 1280px;

  @media only screen and (min-width: 980px) and (max-width: 1280px) {
    margin: 0 auto;
    width: 980px;
  }
`;

function FooterFull({
  ccpaApplies,
  currentEditionLabel,
  footerLinks: {
    columnLinks = [],
    policyLinks = [],
    productLinks = [],
    socialLinks = [],
  } = {},
  homepages,
  i18nText,
  localizeTextContent,
  urls,
  title,
  isLoggedIn,
  disableLogin,
}) {
  return (
    <Footer aria-label="Primary">
      <FooterWrapper>
        <FooterTopLinks
          urls={urls}
          currentEditionLabel={currentEditionLabel}
          i18nText={i18nText}
          title={title}
          isLoggedIn={isLoggedIn}
          disableLogin={disableLogin}
          homepages={homepages}
        />
        <ColumnsWrapper>
          <FooterColumnLinks
            columnLinks={columnLinks}
            socialLinks={socialLinks}
          />
          <FooterSocialLinks socialLinks={socialLinks} />
        </ColumnsWrapper>
        <FooterProductLinks productLinks={productLinks} i18nText={i18nText} />
        <FooterPolicyLinks
          ccpaApplies={ccpaApplies}
          policyLinks={policyLinks}
          localizeTextContent={localizeTextContent}
        />
      </FooterWrapper>
    </Footer>
  );
}

FooterFull.defaultProps = {
  ccpaApplies: false,
  customerNav: {
    urls: {
      loginUrl: '/login',
      logoutUrl: '/logout',
      footerSubscribeUrl: '/subscribeFooterLink',
    },
  },
  currentEditionLabel: 'English',
  disableLogin: false,
  homepages: [
    {
      desktopURL: 'https://www.wsj.com/',
      index: 0,
      label: 'U.S.',
      mobileURL: 'https://www.wsj.com/',
      region: 'na,us',
      url: 'https://www.wsj.com/',
    },
  ],
  isLoggedIn: false,
  i18nText: {
    editionText: 'Edition',
    loginText: 'Sign In',
    logoutText: 'Sign Out',
    subscribeText: 'Subscribe Now',
    topText: 'Back to Top',
    djProducts: 'Dow Jones Products',
  },
  localizeTextContent: '',
  title: 'The Wall Street Journal',
  urls: {
    logoutUrl: 'https://int.accounts.wsj.com/logout?target=',
    loginUrl: 'https://int.accounts.wsj.com/login?target=',
    subscribeUrl: 'https://subscribe.wsj.com/default',
    wsjUrl: 'https://www.wsj.com',
  },
};

FooterFull.propTypes = {
  ccpaApplies: PropTypes.bool,
  customerNav: PropTypes.shape({
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      auth_time: PropTypes.number,
      status: PropTypes.string,
      vxid: PropTypes.string,
      profiles: PropTypes.shape({
        account: PropTypes.shape({
          subscriberStatus: PropTypes.string,
        }),
        onboardingProfile: PropTypes.shape({
          interests: PropTypes.arrayOf(PropTypes.string),
        }),
      }),
      abuuid: PropTypes.string,
      abBucket: PropTypes.number,
      bucket: PropTypes.number,
      wsjregion: PropTypes.string,
      site: PropTypes.string,
      type: PropTypes.string,
      experience: PropTypes.string,
      region: PropTypes.shape({
        wsjregion: PropTypes.string,
        mobileclient: PropTypes.bool,
      }),
      access: PropTypes.shape({
        fullAccess: PropTypes.bool,
        fullArticle: PropTypes.bool,
        vetoFree: PropTypes.bool,
      }),
      documentKey: PropTypes.string,
      commentingAllowed: PropTypes.bool,
    }),
    // eslint-disable-next-line react/forbid-prop-types
    ads: PropTypes.object,
    urls: PropTypes.shape({
      loginUrl: PropTypes.string,
      logoutUrl: PropTypes.string,
      subscribeUrl: PropTypes.string,
      headerSubscribeUrl: PropTypes.string,
      footerSubscribeUrl: PropTypes.string,
      registerUrl: PropTypes.string,
      customerCenterUrl: PropTypes.string,
      helpUrl: PropTypes.string,
      wsjPlusUrl: PropTypes.string,
      wsjMemberUrl: PropTypes.string,
      commentsProfileUrl: PropTypes.string,
      savedArticlesUrl: PropTypes.string,
      watchlistUrl: PropTypes.string,
      alertsUrl: PropTypes.string,
    }),
    mobileEngagementMessage: PropTypes.string,
    isLoggedOut: PropTypes.bool,
    registeredUser: PropTypes.bool,
  }),
  currentEditionLabel: PropTypes.string,
  footerLinks: PropTypes.shape({
    columnLinks: PropTypes.arrayOf(
      PropTypes.shape({
        rank: PropTypes.number,
        name: PropTypes.string,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            url: PropTypes.string,
            rank: PropTypes.number,
          })
        ),
      })
    ),
    productLinks: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        url: PropTypes.string,
        noborder: PropTypes.bool,
        rank: PropTypes.number,
      })
    ),
    socialLinks: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        url: PropTypes.string,
        type: PropTypes.string,
        class: PropTypes.string,
        rank: PropTypes.number,
      })
    ),
    policyLinks: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        url: PropTypes.string,
        ccpaHighlighting: PropTypes.bool,
        ccpaOnly: PropTypes.bool,
        rank: PropTypes.number,
      })
    ),
  }).isRequired,
  disableLogin: PropTypes.bool,
  homepages: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      label: PropTypes.string,
      region: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  isLoggedIn: PropTypes.bool,
  i18nText: PropTypes.shape({
    editionText: PropTypes.string,
    loginText: PropTypes.string,
    logoutText: PropTypes.string,
    subscribeText: PropTypes.string,
    topText: PropTypes.string,
    djProducts: PropTypes.string,
  }),
  localizeTextContent: PropTypes.string,
  title: PropTypes.string,
  urls: PropTypes.shape({
    logoutUrl: PropTypes.string,
    loginUrl: PropTypes.string,
    subscribeUrl: PropTypes.string,
    wsjUrl: PropTypes.string,
  }),
};

export default FooterFull;
