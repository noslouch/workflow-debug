import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import getShareUrlWithToken from '../../helpers/entitlements/getShareURL';
import copyToClipboard from '../../helpers/copy-to-clipboard';
import sendTracking from '../../helpers/tracking';
import appendQueryParams from '../../urlHelpers/appendQueryParams';
import { ReactComponent as Facebook } from '../../assets/social-icons/blue-facebook-round.svg';
import { ReactComponent as Twitter } from '../../assets/social-icons/blue-twitter.svg';
import { ReactComponent as LinkedIn } from '../../assets/social-icons/blue-linkedin.svg';
import { ReactComponent as CopyLink } from '../../assets/icons/Actionables/medium/copy-link-medium.svg';
import { ReactComponent as Mail } from '../../assets/icons/Actionables/medium/mail-stroke-medium.svg';
import EmailScrim from '../EmailScrim';

const icons = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: LinkedIn,
  permalink: CopyLink,
  mail: Mail,
};

const StyledShareTools = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0px;
  border: 1px solid #ebebeb;
  background: #fff;
  width: ${({ shareToolsOpen }) => (shareToolsOpen ? '160px' : '50px')};
  transition: width 0.5s;
  overflow: hidden;
  font-family: var(--font-family-retina-narrow);
`;

const ShareText = styled.div`
  font-size: 12px;
  font-weight: 400;
  width: 100%;
  text-align: center;
  padding: 5px 0 5px 0;
`;

const ShareTarget = styled.li`
  text-transform: uppercase;
  color: #555;
  text-decoration: none;
  font-size: 14px;
  font-weight: 300;
  width: 150px;
  padding: 8px 13px;
  cursor: pointer;

  svg {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 2px;
  }
`;

const ShareTargetTitle = styled.div`
  margin-left: 10px;
  display: inline-block;
`;

const ShareTools = ({
  articleURL,
  author,
  emailSharePath,
  freeArticle,
  headline,
  id,
  isLoggedIn,
  seoId,
  shareTargets,
  shareURLWithToken,
  shouldEncodeEmailURL,
  source,
  summary,
  template,
  thumbnailURL,
  userEmail,
}) => {
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [copyLinkText, setCopyLinkText] = useState('Copy Link');
  const [shareToolsOpen, setShareToolsOpen] = useState(false);
  const openShareTools = () => setShareToolsOpen(true);
  const closeShareTools = () => setShareToolsOpen(false);

  const allShareTargets = [
    ...shareTargets,
    { key: 'permalink', title: copyLinkText },
  ];

  if (userEmail) {
    allShareTargets.push({ key: 'mail', title: 'Email' });
  }

  function sendTrackingFor(socialPlatform) {
    const params = {
      event_name: 'social_share',
      social_share_type: socialPlatform,
      social_share_headline: headline,
    };
    sendTracking(params);
  }

  function copyAction(copyURL) {
    return copyToClipboard(copyURL, () => {
      setCopyLinkText('Copied');
      setTimeout(() => {
        setCopyLinkText('Copy Link');
        sendTrackingFor('permalink');
      }, 2000);
    });
  }

  const renderShareTarget = ({ key, title, baseURL }) => {
    const handleClick = () => {
      const encodedUrl = encodeURIComponent(articleURL);
      let externalURL;

      if (key === 'permalink') {
        if (shareURLWithToken) {
          copyAction(shareURLWithToken);
        } else if (!shareURLWithToken && isLoggedIn && !freeArticle) {
          getShareUrlWithToken(articleURL).then((URLWithToken) =>
            copyAction(URLWithToken)
          );
        } else {
          copyAction(
            appendQueryParams(articleURL, {
              reflink: 'desktopwebshare_permalink',
            })
          );
        }
        return false;
      }

      if (key === 'mail') {
        return setEmailDialogOpen(true);
      }

      if (key === 'twitter') {
        const encodedBody = encodeURIComponent(headline);
        externalURL = `${baseURL}${encodedBody}&url=${encodedUrl}&via=WSJ`;
      } else {
        externalURL = `${baseURL}${encodedUrl}`;
      }

      window.open(externalURL, '_blank');
      return sendTrackingFor(title);
    };

    const Icon = icons[key];
    return (
      <ShareTarget
        key={key}
        onClick={handleClick}
        role="button"
        aria-label="Share Button"
      >
        <Icon />
        <ShareTargetTitle>{title}</ShareTargetTitle>
      </ShareTarget>
    );
  };

  const emailScrimProps = {
    articleURL:
      shouldEncodeEmailURL && emailSharePath
        ? `${emailSharePath}/${seoId}`
        : articleURL,
    author,
    headline,
    id,
    emailDialogOpen,
    setEmailDialogOpen,
    source,
    summary,
    template,
    thumbnailURL,
    userEmail,
  };

  return (
    <>
      <StyledShareTools
        onMouseEnter={openShareTools}
        onMouseLeave={closeShareTools}
        shareToolsOpen={shareToolsOpen}
        aria-label="Share Menu"
      >
        <ShareText>SHARE</ShareText>
        {allShareTargets.map((shareTarget) => renderShareTarget(shareTarget))}
      </StyledShareTools>
      <EmailScrim {...emailScrimProps} />
    </>
  );
};

ShareTools.propTypes = {
  articleURL: PropTypes.string,
  author: PropTypes.string.isRequired, // should not include "By "
  emailSharePath: PropTypes.string,
  freeArticle: PropTypes.bool,
  headline: PropTypes.string,
  id: PropTypes.string.isRequired, // guid for video or sbid for articles
  isLoggedIn: PropTypes.bool,
  shareTargets: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      baseURL: PropTypes.string,
    })
  ),
  seoId: PropTypes.string,
  shareURLWithToken: PropTypes.string,
  shouldEncodeEmailURL: PropTypes.bool,
  source: PropTypes.string.isRequired,
  summary: PropTypes.string,
  template: PropTypes.string.isRequired, // can be 'wsj_video' for video or a template name
  thumbnailURL: PropTypes.string,
  userEmail: PropTypes.string,
};

ShareTools.defaultProps = {
  emailSharePath: null,
  freeArticle: false,
  isLoggedIn: false,
  articleURL: '',
  headline: '',
  seoId: null,
  shareTargets: [
    {
      key: 'facebook',
      title: 'Facebook',
      baseURL: 'https://www.facebook.com/sharer/sharer.php?u=',
    },
    {
      key: 'twitter',
      title: 'Twitter',
      baseURL: 'https://twitter.com/intent/tweet?text=',
    },
    {
      key: 'linkedin',
      title: 'LinkedIn',
      baseURL: 'https://www.linkedin.com/shareArticle?mini=true&url=',
    },
  ],
  shareURLWithToken: null,
  shouldEncodeEmailURL: false,
  summary: '',
  thumbnailURL: '',
  userEmail: '',
};

export default ShareTools;
