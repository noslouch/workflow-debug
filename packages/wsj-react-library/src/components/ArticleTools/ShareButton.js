import { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@headlessui/react';
import styled from 'styled-components';

import { useUserContext } from '../../context/user-context';
import { ReactComponent as ArrowShareFilledMedium } from '../../assets/icons/Standard/medium/arrow-share-filled-medium.svg';
import { ReactComponent as ArrowShareStrokeMedium } from '../../assets/icons/Standard/medium/arrow-share-stroke-medium.svg';
import { ReactComponent as CloseMedium } from '../../assets/branding/close-medium.svg';
import EmailScrim from '../EmailScrim';
import HeadlessShareItem from '../HeadlessShareItem';
import translationsConfig from './translations.json';

const Button = styled.button`
  color: var(--color-nickel);
  font-family: var(--font-font-stack-retina-narrow);
  font-size: 12px;
  font-weight: var(--font-weight-regular);
  text-transform: uppercase;

  align-items: center;
  background: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
`;

const ButtonTex = styled.span`
  margin-left: 4px;

  ${({ isActive }) =>
    isActive &&
    `
    && {
      color: var(--color-jet);
    }
  `}
`;

const DialogWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--color-white);
  position: fixed;
  left: 0;
  top: 0;
`;

const Content = styled.div`
  margin: 0 auto;
  padding: 0 10px;
  max-width: 640px;
`;

const DialogHeader = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
`;

const DialogTitle = styled.p`
  color: #888;
  font-family: var(--font-font-stack-retina-narrow);
  font-weight: var(--font-weight-light);
  font-size: 14px;
  height: 27px;
  font-size: 22px;
  width: 100px;
  padding-left: 0px;
  margin-top: 20px;
  display: inline-block;
  text-align: left;
`;

const CloseButton = styled.button`
  border: none;
  width: 25px;
  height: 25px;
  background-color: transparent;
  text-indent: -10000px;
  cursor: pointer;
  z-index: 5;
  display: inline-block;
  position: relative;
  margin-top: 18px;
`;

const CloseIcon = styled(CloseMedium)`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  color: #999;
`;

const DialogMenu = styled.ul`
  border: none;
  background: var(--color-white);
  width: 160px;
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const DialogItem = styled.li`
  font-family: var(--font-font-stack-retina-narrow);
  font-weight: var(--font-weight-regular);
  list-style: none;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 14px;
  margin-bottom: 16px;
  border: 1px solid var(--color-silver);
  height: 50px;
  width: 100%;
  text-align: left;

  &,
  & a,
  & a:hover,
  & span {
    color: var(--color-nickel);
    text-decoration: none;
    font-weight: var(--font-weight-light);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ItemLink = styled.a`
  display: flex;
  align-items: center;
  padding: 13px 20px;

  & svg {
    height: 24px;
    width: 24px;
    margin-right: 20px;
  }
`;

const ShareButton = ({
  articleURL,
  headline,
  id,
  seoId,
  shareTargets,
  shareURLWithToken,
  region,
  freeArticle,
  shouldEncodeEmailURL,
  emailSharePath,
  author,
  source,
  summary,
  template,
  thumbnailURL,
}) => {
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [copyLinkText, setCopyLinkText] = useState('Copy Link');
  const [isActive, setIsActive] = useState(false);
  const translations = translationsConfig[region];
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
      <Button onClick={() => setIsActive(!isActive)}>
        {isActive ? <ArrowShareFilledMedium /> : <ArrowShareStrokeMedium />}
        <ButtonTex isActive={isActive}>{translations.share}</ButtonTex>
      </Button>
      <Dialog
        open={isActive}
        onClose={() => setIsActive(!isActive)}
        as={DialogWrapper}
      >
        <Content>
          <DialogHeader>
            <Dialog.Title as={DialogTitle}>Share</Dialog.Title>
            <CloseButton type="button" onClick={() => setIsActive(false)}>
              Close Share Menu
              <CloseIcon />
            </CloseButton>
          </DialogHeader>
          <DialogMenu>
            {allShareTargets.map((shareTarget) => (
              <HeadlessShareItem
                key={shareTarget.key}
                as={DialogItem}
                articleURL={articleURL}
                headline={headline}
                shareURLWithToken={shareURLWithToken}
                freeArticle={freeArticle}
                itemKey={shareTarget.key}
                baseURL={shareTarget.baseURL}
                title={shareTarget.title}
                setCopyLinkText={setCopyLinkText}
                setEmailDialogOpen={setEmailDialogOpen}
                isMobile
                closeShareMenu={() => setIsActive(false)}
              >
                {({ icon: ItemIcon, externalURL }) => (
                  <ItemLink
                    href={externalURL || null}
                    as={!externalURL && 'div'}
                    target={externalURL ? '_blank' : null}
                    aria-label="Share Button"
                    role="button"
                  >
                    <ItemIcon />
                    <span>
                      {translations[shareTarget.title] || shareTarget.title}
                    </span>
                  </ItemLink>
                )}
              </HeadlessShareItem>
            ))}
          </DialogMenu>
        </Content>
        <EmailScrim renderMobile {...emailScrimProps} />
      </Dialog>
    </>
  );
};

ShareButton.propTypes = {
  articleURL: PropTypes.string.isRequired,
  headline: PropTypes.string,
  id: PropTypes.string,
  seoId: PropTypes.string,
  region: PropTypes.string,
  shareTargets: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      baseURL: PropTypes.string,
    })
  ),
  shareURLWithToken: PropTypes.string,
  freeArticle: PropTypes.bool,
  shouldEncodeEmailURL: PropTypes.bool,
  emailSharePath: PropTypes.string,
  author: PropTypes.string,
  source: PropTypes.string,
  summary: PropTypes.string,
  template: PropTypes.string,
  thumbnailURL: PropTypes.string,
};

ShareButton.defaultProps = {
  headline: '',
  id: '',
  seoId: '',
  region: 'na,us',
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
      key: 'whatsapp',
      title: 'WhatsApp',
      baseURL: 'whatsapp://send?text=',
    },
    {
      key: 'sms',
      title: 'SMS',
      baseURL: 'sms:?&body=',
    },
  ],
  shareURLWithToken: '',
  freeArticle: false,
  shouldEncodeEmailURL: false,
  emailSharePath: '',
  author: '',
  source: '',
  summary: '',
  template: '',
  thumbnailURL: '',
};

export default ShareButton;
