// eslint-disable-next-line no-unused-vars
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import { Dialog } from '@headlessui/react';
import wretch from 'wretch';
import { useState, useRef } from 'react';
import sendTracking from '../../helpers/tracking';
import getDomain from '../../helpers/environment';
import { ReactComponent as CloseMedium } from '../../assets/icons/Actionables/medium/close-medium.svg';

const EmailDialog = styled(Dialog)`
  position: absolute;
  inset: 0;
  overflow-y: auto;
`;

const EmailDialogOverlay = styled(Dialog.Overlay)`
  position: absolute;
  inset: 0;
  background-color: var(--color-black);
  opacity: 0.3;
`;

const EmailDialogModal = styled.div`
  background-color: var(--color-white);
  position: absolute;
  ${({ rendermobile }) =>
    rendermobile
      ? `
    width: 100%;
    margin: 0;
  `
      : `
    width: 600px;
    margin: auto;
    top: 25%;
    left: 25%;
  `}
  padding: 35px 50px;
`;

const EmailDialogContent = styled.div`
  ${({ rendermobile }) =>
    rendermobile
      ? `
    width: 100%;
    margin: 0;
  `
      : `
    width: 350px;
    margin: auto;
  `}
`;

const EmailDialogTitle = styled(Dialog.Title)`
  font-family: var(--font-family-escrow-condensed);
  font-size: 22px;
  font-weight: 600;
  line-height: 26px;
  color: var(--color-coal);
  display: inline-block;
  max-width: 200px;
`;

const EmailDialogDescription = styled(Dialog.Description)`
  font-family: var(--font-family-retina);
  font-size: 14px;
  color: #888;
  margin-top: 11px;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 15px;
  font-weight: 300px;
`;

const EmailDialogThumbnail = styled.img`
  width: 115px;
  vertical-align: super;
  margin: 0 0 10px 10px;
  display: inline-block;
`;

const EmailDialogLabel = styled.label`
  font-family: var(--font-family-retina);
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  color: var(--color-coal);
`;

const EmailDialogErrorMessage = styled.div`
  font-family: var(--font-family-retina);
  font-size: 12px;
  font-weight: 400;
  line-height: 0;
  color: #e10000;
  margin: 0 0 17px 0;
`;

const inputStyle = `
  display: block;
  box-sizing: border-box;
  padding: 10px;
  font-family: var(--font-family-retina);
  width: 100%;
  height: 44px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: var(--color-jet);
  background: #eee;
  border: 1px solid rgb(0 0 0/50%);
  resize: none;
  opacity: 1;
  box-shadow: none;
  -webkit-appearance: none;
  margin: 10px 0 15px 0;
`;

const inputFocusStyle = `
  :focus {
    outline: none;
    border: 1px solid #0274b6;
    background: #fff;
  }
`;

const inputErrorStyle = `
  border: 1px solid #e10000;
  background: #fff;

  :focus {
    border: 1px solid #e10000;
    background: #fff;
  }
`;

const EmailDialogTo = styled.input`
  ${inputStyle}
  ${inputFocusStyle}
  ${({ error }) => error && inputErrorStyle}
`;

const EmailDialogMessage = styled.textarea`
  ${inputStyle}
  ${inputFocusStyle}
  height: 100px;
`;

const EmailDialogButton = styled.button`
  border: none;
  width: 100%;
  height: 40px;
  font-family: var(--font-family-retina);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-align: center;
  color: var(--color-white);
  background: var(--color-blue);
  border-radius: 2px;
  cursor: pointer;

  :hover {
    background: var(--color-dark-blue);
  }
`;

const EmailDialogCloseButton = styled.button`
  outline: none;
  position: absolute;
  right: 30px;
  cursor: pointer;
  border: none;
  background: none;
`;

const PostSendCss = `
  font-family: var(--font-family-retina);
  font-size: 14px;
  color: #888;
  text-align: center;
`;

const PostSendTitle = styled.div`
  ${PostSendCss}
  font-weight: 600;
  margin-bottom: 10px;
`;

const PostSendMessage = styled.div`
  ${PostSendCss}
`;

const PostSendToAddresses = styled.div`
  ${PostSendCss}
  font-weight: 500;
`;

function validateEmail(email) {
  return (
    email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(email.trim())
  );
}

function validateAllEmails(emails = []) {
  return emails.reduce((areAllEmailsValid, email) => {
    const isCurrentEmailValid = validateEmail(email);
    return areAllEmailsValid === false ? false : isCurrentEmailValid;
  }, true);
}

export default function EmailScrim({
  articleURL,
  author,
  id,
  headline,
  emailDialogOpen,
  renderMobile,
  setEmailDialogOpen,
  source,
  summary,
  template,
  thumbnailURL,
}) {
  const [openState, setOpenState] = useState(true);
  const recaptchaEl = useRef(null);
  const emailToEl = useRef(null);
  const emailMessageEl = useRef(null);
  const [validationStatus, setValidationStatus] = useState({
    valid: false,
    touched: false,
  });
  const [toAddresses, setToAddresses] = useState('');
  const [sent, setSent] = useState(false);

  function handleClose() {
    const closeFunc = setEmailDialogOpen || setOpenState;
    closeFunc(false);
  }

  function validateToInput() {
    const to = (toAddresses && toAddresses.split(',')) || [];
    let isValidInput = true;
    let inputError = '';

    if (to.length > 10) {
      inputError = 'You may only specify up to 10 recipients.';
      isValidInput = false;
    } else {
      isValidInput = validateAllEmails(to);
      inputError = isValidInput ? '' : 'Email address is not valid.';
    }

    const status = {
      touched: true,
      valid: isValidInput,
      inputError,
    };

    setValidationStatus(status);
    return status;
  }

  function getCurrentFormData() {
    return {
      to: emailToEl.current.value,
      msg: emailMessageEl.current.value,
    };
  }

  function updateToAddresses() {
    setToAddresses(emailToEl.current.value);
  }

  const isValidToAddress =
    !validationStatus.touched ||
    (validationStatus.valid && validationStatus.touched);

  function sendEmail(recaptchaRes) {
    // This is done because this function was not getting the updated state for some reason
    const { to: currentTo, msg: currentMsg } = getCurrentFormData();
    const to = currentTo.replace(/\s+/g, '').split(',');
    const emailData = {
      to,
      msg: currentMsg,
      url: articleURL,
      img: thumbnailURL || null,
      headline,
      byline: `By ${author}`,
      summ: summary || null,
      id,
      template,
      'g-recaptcha-response': recaptchaRes,
      source,
    };

    const baseURL = getDomain();
    const handleRequestError = () => {
      recaptchaEl.current.reset();
      setValidationStatus({
        valid: false,
        touched: true,
        // eslint-disable-next-line quotes
        inputError: "We've encountered an error.",
      });
    };

    wretch(`${baseURL}/emailthis`)
      .options({ credentials: 'include', mode: 'cors' })
      .post(emailData)
      .notFound(handleRequestError)
      .forbidden(handleRequestError)
      .res((resp) => {
        if (!resp.ok) {
          handleRequestError();
        } else {
          setSent(true);
          recaptchaEl.current.reset();
          sendTracking({
            event_name: 'social_share',
            social_share_type: 'email',
          });
        }
      })
      .catch(handleRequestError);
  }

  function handleSendClick() {
    if (isValidToAddress) {
      recaptchaEl.current.execute();
    }
  }

  function renderPostSend() {
    return (
      <>
        <PostSendTitle>Thank You</PostSendTitle>
        <PostSendMessage>This article has been sent to</PostSendMessage>
        <PostSendToAddresses>{toAddresses}</PostSendToAddresses>
      </>
    );
  }

  function renderForm() {
    return (
      <>
        <EmailDialogTitle>{headline}</EmailDialogTitle>
        <EmailDialogThumbnail src={thumbnailURL} />
        <EmailDialogDescription>{summary}</EmailDialogDescription>
        <EmailDialogLabel>To</EmailDialogLabel>
        <EmailDialogTo
          ref={emailToEl}
          error={!isValidToAddress}
          onChange={updateToAddresses}
          onBlur={validateToInput}
          type="email"
          autoCorrect="off"
          autoCapitalize="none"
          data-testid="emailTo"
        />
        {!isValidToAddress && (
          <EmailDialogErrorMessage>
            {validationStatus.inputError || ''}
          </EmailDialogErrorMessage>
        )}
        <EmailDialogLabel>Message</EmailDialogLabel>
        <EmailDialogMessage
          ref={emailMessageEl}
          maxLength="500"
          type="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          data-testid="emailMessage"
        />
        <EmailDialogButton type="button" onClick={handleSendClick}>
          SEND
        </EmailDialogButton>
        <ReCAPTCHA
          ref={recaptchaEl}
          sitekey="6Le53yIUAAAAAJNRIXVFRauqFbABehXfSaPwi2yQ"
          size="invisible"
          onChange={sendEmail}
        />
      </>
    );
  }

  return (
    <EmailDialog
      open={emailDialogOpen === null ? openState : emailDialogOpen}
      onClose={handleClose}
    >
      <EmailDialogOverlay />
      <EmailDialogModal rendermobile={renderMobile}>
        <EmailDialogContent rendermobile={renderMobile}>
          <EmailDialogCloseButton
            type="button"
            onClick={handleClose}
            aria-label="Close"
          >
            <CloseMedium />
          </EmailDialogCloseButton>
          {sent ? renderPostSend() : renderForm()}
        </EmailDialogContent>
      </EmailDialogModal>
    </EmailDialog>
  );
}

EmailScrim.propTypes = {
  articleURL: PropTypes.string,
  author: PropTypes.string.isRequired, // should not include "By "
  emailDialogOpen: PropTypes.bool,
  id: PropTypes.string.isRequired, // guid for video or sbid for articles
  headline: PropTypes.string,
  renderMobile: PropTypes.bool,
  setEmailDialogOpen: PropTypes.func,
  source: PropTypes.string,
  summary: PropTypes.string,
  template: PropTypes.string.isRequired, // can be 'wsj_video' for video or a template name
  thumbnailURL: PropTypes.string,
};

EmailScrim.defaultProps = {
  articleURL: '',
  emailDialogOpen: null,
  headline: '',
  renderMobile: false,
  setEmailDialogOpen: null,
  source: '',
  summary: '',
  thumbnailURL: 'https://ore.wsj.net/fp/assets/images/ico/WSJ_facebook.png',
};
