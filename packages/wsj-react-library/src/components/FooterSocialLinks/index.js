import React from 'react';
import PropTypes from 'prop-types';
import defaultSocialLinks from './socialLinks.json';
import styled from 'styled-components';
import { ReactComponent as facebook } from '../../assets/social-icons/facebook-black-333.svg';
import { ReactComponent as twitter } from '../../assets/social-icons/twitter-black-333.svg';
import { ReactComponent as youtube } from '../../assets/social-icons/youtube-black-333.svg';
import { ReactComponent as podcast } from '../../assets/social-icons/podcast-black-333.svg';
import { ReactComponent as snapchat } from '../../assets/social-icons/snapchat-black-333.svg';
import { ReactComponent as instagram } from '../../assets/social-icons/instagram-black-000.svg';
import { ReactComponent as googleplay } from '../../assets/social-icons/google-play.svg';
import { ReactComponent as appstore } from '../../assets/social-icons/appstore.svg';

const imageSvgs = {
  facebook,
  twitter,
  youtube,
  podcast,
  snapchat,
  instagram,
  googleplay,
  appstore,
};

const SocialLinks = styled.ul`
  clear: both;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  display: flex;
  height: 50px;
  width: 555px;
  list-style: none;
  padding: 0;
`;

const SocialLogo = styled.li`
  margin: 9px 14px 0 0;
  text-align: left;
`;

const SocialLogoLink = styled.a`
  width: ${({ socialClass }) =>
    (socialClass === 'googleplay' && '85px') ||
    (socialClass === 'appstore' && '75px') ||
    'initial'};

  ${({ type }) =>
    (type === 'icon' &&
      `
      width: 30px;
      height: 30px;
      display: block;
      white-space: nowrap;
      border-radius: 50%;
      font-size: 0;
    `) ||
    (type === 'store-badge' &&
      `
      background: var(--color-black);
      border-radius: 3px;
      height: 25px;
      border: none;
      margin-top: 4px;
      font-size: 0;
      display: block;
      white-space: nowrap;
    `)}
`;

function FooterSocialLinks({ socialLinks: links = defaultSocialLinks }) {
  return (
    <SocialLinks aria-label="Social Media Links">
      {links.map(({ class: className, label, type, url }, i) => {
        const SocialSvg = imageSvgs[className];
        const isStoreBadge = type === 'store-badge';
        return (
          <SocialLogo key={`${label}_${type}_${i}`}>
            <SocialLogoLink socialClass={className} type={type} href={url}>
              {label}
              <SocialSvg
                viewBox={isStoreBadge ? '35 -8 40 40' : '-8 -5 35 35'}
                width={isStoreBadge ? 80 : 24}
                height={isStoreBadge ? 25 : 30}
              />
            </SocialLogoLink>
          </SocialLogo>
        );
      })}
    </SocialLinks>
  );
}

FooterSocialLinks.defaultProps = {
  isLoggedIn: false,
};

FooterSocialLinks.propTypes = {
  columnLinks: PropTypes.array,
  isLoggedIn: PropTypes.bool,
  socialLinks: PropTypes.array,
};

export default FooterSocialLinks;
