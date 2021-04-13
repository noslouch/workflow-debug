import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getCoralToken, setCoralScript, getEmbedURL, coralTalkRender, getParameterByName } from './enable-coral';
import CommentCaret from './comment-caret.svg';

const Button = styled.button`
  display: flex;
  width: 100%;
  border: none;
  height: 45px;
  padding: 0 20px;
  border-radius: 2px;
  transition: background-color 125ms ease;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 15px;
  align-items: center;
  justify-content: center;
  background-color: #0080c3;
  letter-spacing: 0.5px;

  &:hover {
    background-color: #015483;
  }
  &:focus {
    outline-color: #666;
  }
`;

const ShowOrHideCommentsSpan = styled.span`
  font-size: 14px;
  line-height: 18px;
  font-family: var(--font-sans-serif);
  font-weight: 500;
  display: inline-block;
`;

const ContentDiv = styled.div`
  display: ${(props) => (props.isCoralDisplayed ? 'block' : 'none')};
`;

const CommentCountSpan = styled.div`
  margin-left: 5px;
`;

const CaretSpan = styled.span`
  transform: rotate(-180deg);
  height: 24px;
  width: 24px;
  transition: transform 600ms ease;
  margin-left: 5px;
  transform: ${(props) => (props.isCoralDisplayed ? 'rotate(-180deg)' : 'none')};
`;

const BUTTON_LABELS = {
  SHOW: 'Show Conversation',
  HIDE: 'Hide Conversation',
  ERROR: 'Conversation Temporarily Unavailable',
};

const ArticleCommenting = ({ canComment, commentCount, id }) => {
  const [toggle, setToggle] = useState(false);
  const [coralRendered, setCoralRendered] = useState(false);
  const [buttonCoralMessage, setButtonCoralMessage] = useState(BUTTON_LABELS.SHOW);
  const refCoralContainer = useRef(null);

  const embedURL = getEmbedURL();

  useEffect(() => {
    loadWithSpecificComment();
    window.addEventListener('hashchange', autoLoadCoralModule);
    return () => {
      window.removeEventListener('hashchange', autoLoadCoralModule);
    };
  }, []);

  const setCoralScriptAndLoad = () => {
    setCoralScript(embedURL)
      .then(() => {
        renderModule();
        setToggle(!toggle);
      })
      .catch(() => {
        setToggle(false);
        setButtonCoralMessage(BUTTON_LABELS.ERROR);
      });
  };

  const autoLoadCoralModule = () => {
    if (window.location.hash === '#comments_sector') {
      setCoralScriptAndLoad();
    }
  };

  const loadWithSpecificComment = () => {
    const commentId = getParameterByName('commentId');
    if (commentId) {
      window.location.hash = '#comments_sector';
    }
    autoLoadCoralModule();
  };

  const renderModule = async () => {
    // TODO: revisit when a solution for components that need env. info. is agreed upon.
    const envPrefix = process.env.NODE_APP !== 'production' ? 's.dev.' : '';

    // When moderator logs in via okta, cookie is dropped as flag to load admin widget,
    // there's no impact on login.
    const oktaSignedIn = document.cookie.indexOf('coral-okta-signed-in=true') !== -1;
    const adminPrefix = oktaSignedIn && !envPrefix ? 'admin.' : '';
    let baseURL = `https://${adminPrefix}commenting.${envPrefix}wsj.com`;

    // This needs further looking into, wasn't able to properly set up Docker to test comments repo
    // if (window.location.search.indexOf('local_comments=true') !== -1) {
    //   baseURL = 'http://www.local.wsj.com:3000';
    // }

    if (!coralRendered) {
      try {
        const response = await getCoralToken(baseURL, canComment);
        coralTalkRender(response.token, baseURL, refCoralContainer, id);
        setCoralRendered(true);
        setButtonCoralMessage(BUTTON_LABELS.HIDE);
      } catch {
        setToggle(false);
        setButtonCoralMessage(BUTTON_LABELS.ERROR);
      }
    }
  };

  const toggleClickHandler = () => {
    setToggle(!toggle);
    if (!coralRendered) {
      setCoralScriptAndLoad();
    }
    setButtonCoralMessage(toggle ? BUTTON_LABELS.SHOW : BUTTON_LABELS.HIDE);
  };

  return (
    <div id="comments_sector" role="region" aria-label="Conversation" tabIndex="-1">
      <Button id={`coral_toggle_${id}`} onClick={toggleClickHandler}>
        <ShowOrHideCommentsSpan>{buttonCoralMessage}</ShowOrHideCommentsSpan>
        {commentCount >= 0 ? <CommentCountSpan>({commentCount})</CommentCountSpan> : null}
        <CaretSpan isCoralDisplayed={toggle} aria-hidden="true">
          <CommentCaret height={24} width={24} />
        </CaretSpan>
      </Button>
      <ContentDiv isCoralDisplayed={toggle}>
        <div id={id} ref={refCoralContainer}></div>
      </ContentDiv>
    </div>
  );
};

ArticleCommenting.propTypes = {
  /** 
    The Article's SBID
  */
  id: PropTypes.string,
  /**
    Number of comments
  */
  commentCount: PropTypes.number,
  /**
    Determines whether or not the user could comment
  */
  canComment: PropTypes.bool,
};

ArticleCommenting.defaultProps = {
  id: '',
  commentCount: 0,
  canComment: false,
};

export default ArticleCommenting;
