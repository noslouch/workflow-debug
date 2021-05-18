/* global document */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';

const SkipContainer = styled.div`
  position: fixed;
  top: -1000px;
  left: 100px;
  transition: top 0.3s;
  z-index: 91;
  width: 320px;

  &:focus-within {
    top: 0;
    height: auto;
    width: 320px;
    background-color: var(--color-white);
    padding: 10px;
    box-shadow: 0 2px 3px -1px #888;
  }

  @media print {
    display: none;
  }
`;

const SkipMainButton = styled.button`
  font-family: var(--font-font-stack-retina);
  width: 100%;
  display: inline-block;
  padding: 15px 10px;
  font-size: 14px;
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.5px;
  text-transform: var(--font-case-uppercase);
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #027ebe;
  color: var(--color-white);
  margin-bottom: 10px;
`;

const SkipSearchButton = styled.button`
  font-family: var(--font-font-stack-retina);
  width: 100%;
  display: block;
  padding: 15px 10px;
  font-size: 14px;
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.5px;
  text-transform: var(--font-case-uppercase);
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: var(--color-white);
  color: var(--color-nickel);
`;

const SkipLabel = styled.label`
  font-family: var(--font-font-stack-retina);
  display: block;
  font-size: 12px;
  font-weight: var(--font-weight-light);
  margin: 10px 2px;
`;

const Skip = () => {
  const [landmarks, setLandmarks] = useState([]);
  const skipRef = useRef(null);

  const removeTabIndex = () => {
    const mainLandmark = document.getElementById('main');
    mainLandmark?.removeAttribute('tabindex');
  };

  useEffect(() => {
    // Timeout needed to wait until all required elements are available in DOM.
    setTimeout(() => {
      const mainLandmark = document.getElementById('main');
      mainLandmark?.addEventListener('blur', removeTabIndex);

      const elements = [
        ...document.querySelectorAll('[role="region"], [role="complementary"]'),
      ]
        .filter(
          (element) =>
            element.hasAttribute('id') && element.hasAttribute('aria-label')
        )
        .map((element) => {
          return {
            target: element.id,
            label: element.getAttribute('aria-label'),
          };
        });
      // to prevent potential memory leak if component unmounted
      if (skipRef.current) setLandmarks(elements);

      return () => {
        mainLandmark.addEventListener('blur', removeTabIndex);
      };
    }, 100);
  }, []);

  const handleLandmarkSelect = (index) => {
    if (landmarks[index]) {
      const element = document.getElementById(landmarks[index].target);
      if (element) {
        /* Timeout needed due to unknown issue where element would gain focus only to have it shifted to the body.
          This made keyboard navigation start from the top of the page, and breaking a11y keyboard navigation order. */
        setTimeout(() => {
          element.focus({ preventScroll: false });
          element.scrollIntoView();
        }, 100);
      }
    }
  };

  const enterKeyPressed = (e) => {
    return e && (e.which === 13 || e.keyCode === 13 || e.key === 'Enter');
  };

  const focusMain = () => {
    const mainLandmark = document?.getElementById('main');
    if (mainLandmark) {
      setTimeout(() => {
        mainLandmark.setAttribute('tabindex', '-1');
        mainLandmark.focus({ preventScroll: false }); // Default scroll is to middle of main landmark
        mainLandmark.scrollIntoView();
      }, 100);
    }
  };

  const focusMainEnter = (e) => {
    if (enterKeyPressed(e)) {
      focusMain();
    }
  };

  const openSearch = () => {
    const searchInput = document.getElementById('searchInput');
    searchInput?.focus();
  };

  const enterSearch = (e) => {
    if (enterKeyPressed(e)) {
      e.preventDefault();
      e.stopPropagation();
      openSearch();
    }
  };

  return (
    <SkipContainer ref={skipRef}>
      <SkipMainButton onClick={focusMain} onKeyDown={focusMainEnter}>
        Skip to Main Content
      </SkipMainButton>
      <SkipSearchButton onClick={openSearch} onKeyDown={enterSearch}>
        Skip to Search
      </SkipSearchButton>
      {landmarks.length > 0 && (
        <div>
          <SkipLabel id="skipDropdownLabel">Skip to...</SkipLabel>
          <Dropdown landmarks={landmarks} handleSelect={handleLandmarkSelect} />
        </div>
      )}
    </SkipContainer>
  );
};

export default Skip;
