import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as BookmarkStrokeMedium } from '../../assets/icons/Actionables/medium/bookmark-stroke-medium.svg';
import { ReactComponent as BookmarkFilledMedium } from '../../assets/icons/Actionables/medium/bookmark-filled-medium.svg';
import { getArticleSaveStatus, saveArticle, removeArticle } from './api';

const StyledSaveButton = styled.button`
  cursor: pointer;
  appearance: none;
  border: none;
  background: none;
  color: var(--color-nickel);
  font-size: 12px;
  font-family: var(--font-font-stack-retina-narrow);
  font-weight: var(--font-weight-regular);
  text-transform: uppercase;
  display: flex;
  align-items: center;

  :focus {
    outline: none;
  }

  :focus-visible {
    outline: var(--color-light-blue) auto 1px;
  }
`;

const SVGWrapper = styled.div`
  svg use {
    fill: ${({ saveActivated }) =>
      saveActivated ? 'var(--color-blue)' : 'var(--color-nickel)'}};
  }
`;

const StyledText = styled.span`
  padding-left: var(--spacing-spacer-4);
  padding-bottom: var(--spacing-spacer-4);
`;

const SaveButton = ({ baseURL, sbid }) => {
  const [saveActivated, setSaveActivated] = useState(false);

  const toggleSaveStatus = async () => {
    if (!saveActivated) {
      const { err, res } = await saveArticle(baseURL, sbid);
      if (res) setSaveActivated(true);
      if (err) console.error(err);
    } else {
      const { err, res } = await removeArticle(baseURL, sbid);
      if (res) setSaveActivated(false);
      if (err) console.error(err);
    }
  };

  useEffect(() => {
    const initializeSave = async () => {
      // Get save status. If there is an error, Save option will disappear.
      const { err, res } = await getArticleSaveStatus(baseURL, sbid);
      if (err) {
        console.error(err);
      } else {
        setSaveActivated(res);
      }
    };

    initializeSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledSaveButton onClick={toggleSaveStatus} saveActivated={saveActivated}>
      <SVGWrapper saveActivated={saveActivated}>
        {saveActivated ? <BookmarkFilledMedium /> : <BookmarkStrokeMedium />}
      </SVGWrapper>
      <StyledText>{saveActivated ? 'Saved' : 'Save'}</StyledText>
    </StyledSaveButton>
  );
};

SaveButton.propTypes = {
  sbid: PropTypes.string.isRequired,
  baseURL: PropTypes.string,
};

SaveButton.defaultProps = {
  baseURL: 'https://www.wsj.com/articles/svc/personalization',
};

export default SaveButton;
