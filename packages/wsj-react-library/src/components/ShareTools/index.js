import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { useUserContext } from '../../context/user-context';
import EmailScrim from '../EmailScrim';
import HeadlessShareItem from '../HeadlessShareItem';

const StyledShareTools = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0px;
  border: 1px solid #ebebeb;
  background: #fff;
  ${({ shareToolsOpen }) => `width: ${shareToolsOpen ? '160' : '50'}px;`};
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
  font-size: 14px;
  font-weight: 300;
  width: 130px;
  height: 24px;
  margin: 16px 12px;
  cursor: pointer;
`;

const ShareTargetLink = styled.a`
  display: flex;
  align-items: center;
  color: var(--color-nickel);
  text-decoration: none;
  font-weight: var(--font-weight-light);

  & svg {
    height: 24px;
    width: 24px;
    margin-right: 15px;
  }
`;

const ShareTools = ({
  articleURL,
  author,
  emailSharePath,
  freeArticle,
  headline,
  id,
  seoId,
  shareTargets,
  shareURLWithToken,
  shouldEncodeEmailURL,
  source,
  summary,
  template,
  thumbnailURL,
}) => {
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [copyLinkText, setCopyLinkText] = useState('Copy Link');
  const [shareToolsOpen, setShareToolsOpen] = useState(false);
  const openShareTools = () => setShareToolsOpen(true);
  const closeShareTools = () => setShareToolsOpen(false);
  const { isLoggedIn } = useUserContext();

  const allShareTargets = [
    ...shareTargets,
    { key: 'permalink', title: copyLinkText },
  ];

  if (isLoggedIn) {
    allShareTargets.push({ key: 'mail', title: 'Email' });
  }

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
        {allShareTargets.map((shareTarget) => (
          <HeadlessShareItem
            key={shareTarget.key}
            as={ShareTarget}
            articleURL={articleURL}
            headline={headline}
            shareURLWithToken={shareURLWithToken}
            freeArticle={freeArticle}
            itemKey={shareTarget.key}
            baseURL={shareTarget.baseURL}
            title={shareTarget.title}
            setCopyLinkText={setCopyLinkText}
            setEmailDialogOpen={setEmailDialogOpen}
          >
            {({ icon: ItemIcon, externalURL }) => (
              <ShareTargetLink
                href={externalURL || null}
                as={!externalURL && 'div'}
                target={externalURL ? '_blank' : null}
                role="button"
                aria-label="Share Button"
              >
                <ItemIcon />
                <div>{shareTarget.title}</div>
              </ShareTargetLink>
            )}
          </HeadlessShareItem>
        ))}
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
};

ShareTools.defaultProps = {
  emailSharePath: null,
  freeArticle: false,
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
};

export default ShareTools;
