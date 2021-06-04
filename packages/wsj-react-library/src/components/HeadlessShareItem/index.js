import styled from 'styled-components';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useUserContext } from '../../context/user-context';
import { ReactComponent as Facebook } from '../../assets/icons/Social/facebook-color-medium.svg';
import { ReactComponent as Twitter } from '../../assets/icons/Social/twitter-color-medium.svg';
import { ReactComponent as LinkedIn } from '../../assets/icons/Social/linkedin-color-medium.svg';
import { ReactComponent as WhatsApp } from '../../assets/icons/Social/whatsapp-color-medium.svg';
import { ReactComponent as CopyLink } from '../../assets/icons/Actionables/medium/copy-link-medium.svg';
import { ReactComponent as Mail } from '../../assets/icons/Actionables/medium/mail-stroke-medium.svg';
import { ReactComponent as Phone } from '../../assets/icons/Standard/medium/phone-medium.svg';
import getShareUrlWithToken from '../../helpers/entitlements/getShareURL';
import copyToClipboard from '../../helpers/copy-to-clipboard';
import sendTracking from '../../helpers/tracking';
import appendQueryParams from '../../urlHelpers/appendQueryParams';

const icons = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: LinkedIn,
  permalink: CopyLink,
  mail: Mail,
  whatsapp: WhatsApp,
  sms: Phone,
};

const Wrapper = styled.div``;

const sendTrackingFor = (socialPlatform, headline) => {
  const params = {
    event_name: 'social_share',
    social_share_type: socialPlatform,
    social_share_headline: headline,
  };
  sendTracking(params);
};

const HeadlessShareItem = ({
  children,
  as,
  headline,
  articleURL,
  shareURLWithToken,
  freeArticle,
  itemKey,
  baseURL,
  title,
  setCopyLinkText,
  setEmailDialogOpen,
  isMobile,
  closeShareMenu,
}) => {
  const { isLoggedIn } = useUserContext();
  const [externalURL, setExternalURL] = useState('');
  const icon = itemKey ? icons[itemKey] : icons.permalink;

  useEffect(() => {
    if (baseURL) {
      const encodedUrl = encodeURIComponent(articleURL);

      if (itemKey === 'twitter') {
        const encodedBody = encodeURIComponent(headline);
        setExternalURL(`${baseURL}${encodedBody}&url=${encodedUrl}&via=WSJ`);
      } else {
        setExternalURL(`${baseURL}${encodedUrl}`);
      }
    }
  }, [baseURL, itemKey, articleURL, headline]);

  const copyAction = (copyURL) => {
    return copyToClipboard(copyURL, () => {
      setCopyLinkText('Copied');
      setTimeout(() => {
        setCopyLinkText('Copy Link');
        sendTrackingFor('permalink', headline);
      }, 2000);
    });
  };

  const handleClick = () => {
    const reflink = isMobile
      ? 'mobilewebshare_permalink'
      : 'desktopwebshare_permalink';

    if (itemKey === 'permalink') {
      if (shareURLWithToken) {
        copyAction(shareURLWithToken);
      } else if (!shareURLWithToken && isLoggedIn && !freeArticle) {
        getShareUrlWithToken(articleURL).then((URLWithToken) =>
          copyAction(URLWithToken)
        );
      } else {
        copyAction(
          appendQueryParams(articleURL, {
            reflink,
          })
        );
      }
      return false;
    }

    if (itemKey === 'mail') {
      return setEmailDialogOpen(true);
    }

    if (isMobile) closeShareMenu();
    return sendTrackingFor(title, headline);
  };

  return (
    <Wrapper as={as} onClick={handleClick}>
      {typeof children === 'function'
        ? children({ handleClick, icon, externalURL })
        : children}
    </Wrapper>
  );
};

HeadlessShareItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  as: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
  headline: PropTypes.string,
  articleURL: PropTypes.string,
  shareURLWithToken: PropTypes.string,
  freeArticle: PropTypes.bool,
  itemKey: PropTypes.string.isRequired,
  baseURL: PropTypes.string,
  title: PropTypes.string,
  setCopyLinkText: PropTypes.func,
  setEmailDialogOpen: PropTypes.func,
  isMobile: PropTypes.bool,
  closeShareMenu: PropTypes.func,
};

HeadlessShareItem.defaultProps = {
  as: 'div',
  children: '',
  headline: '',
  articleURL: '',
  shareURLWithToken: '',
  freeArticle: false,
  baseURL: '',
  title: '',
  setCopyLinkText: () => {},
  setEmailDialogOpen: () => {},
  isMobile: false,
  closeShareMenu: () => {},
};

export default HeadlessShareItem;
