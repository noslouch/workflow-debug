/* global window */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { initCoral, getParameterByName } from './coral-lib';
import { ReactComponent as CommentCaret } from './comment-caret.svg';

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
  transform: ${(props) =>
    props.isCoralDisplayed ? 'rotate(-180deg)' : 'none'};
`;

const BUTTON_LABELS = {
  SHOW: 'Show Conversation',
  HIDE: 'Hide Conversation',
  ERROR: 'Conversation Temporarily Unavailable',
};

const ArticleCommenting = ({
  canComment,
  commentCount,
  coralURL,
  loginURL,
  isAdmin,
  id,
}) => {
  const [toggle, setToggle] = useState(false);
  const [coralRendered, setCoralRendered] = useState(false);
  const [buttonCoralMessage, setButtonCoralMessage] = useState(
    BUTTON_LABELS.SHOW
  );
  const refCoralContainer = useRef(null);

  const coralSetup = useCallback(async () => {
    if (coralRendered) {
      return;
    }
    const CORAL_OPS = {
      node: refCoralContainer.current,
      baseURL: coralURL,
      articleId: id,
      isAdmin,
      canComment,
      loginURL,
    };

    try {
      await initCoral(CORAL_OPS);
      setCoralRendered(true);
    } catch (e) {
      setToggle(false);
      setButtonCoralMessage(BUTTON_LABELS.ERROR);
    }
  }, [canComment, coralRendered, coralURL, id, isAdmin, loginURL]);

  const toggleClickHandler = () => {
    coralSetup();
    setToggle(!toggle);
    setButtonCoralMessage(toggle ? BUTTON_LABELS.SHOW : BUTTON_LABELS.HIDE);
  };

  useEffect(() => {
    const loadCoral = () => {
      if (window.location.hash === '#comments_sector') {
        coralSetup();
        setToggle(true);
        setButtonCoralMessage(BUTTON_LABELS.HIDE);
      }
    };

    window.addEventListener('hashchange', loadCoral);

    const commentId = getParameterByName('commentId');
    if (commentId) {
      window.location.hash = '#comments_sector';
    }

    return () => {
      window.removeEventListener('hashchange', loadCoral);
    };
  }, [coralSetup]);

  return (
    <div
      id="comments_sector"
      role="region"
      aria-label="Conversation"
      tabIndex="-1"
    >
      <Button id={`coral_toggle_${id}`} onClick={toggleClickHandler}>
        <ShowOrHideCommentsSpan>{buttonCoralMessage}</ShowOrHideCommentsSpan>
        {commentCount >= 0 ? (
          <CommentCountSpan>({commentCount})</CommentCountSpan>
        ) : null}
        <CaretSpan isCoralDisplayed={toggle} aria-hidden="true">
          <CommentCaret height={24} width={24} />
        </CaretSpan>
      </Button>

      <ContentDiv isCoralDisplayed={toggle} id={id} ref={refCoralContainer} />
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
  /**
    Base URL to use for calls to third-party library and API calls.
  */
  coralURL: PropTypes.string,
  /**
    URL to redirect unauthenticated users
  */
  loginURL: PropTypes.string,
  /**
    Specify if the user is an admin. Adjusts domain aginst which API calls are made.
  */
  isAdmin: PropTypes.bool,
};

ArticleCommenting.defaultProps = {
  id: '',
  commentCount: 0,
  canComment: false,
  isAdmin: false,
  coralURL: 'https://commenting.s.dev.wsj.com',
  loginURL: 'https://int.accounts.wsj.com/login',
};

export default ArticleCommenting;
