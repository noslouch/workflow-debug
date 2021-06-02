import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HatProducts from './HatProducts';
import { ReactComponent as CloseMedium } from '../../assets/icons/Standard/medium/close-medium.svg';
import dataTransformer from './dataTransformer';
import useMediaQuery from '../../hooks/useMediaQuery';

const StyledHat = styled.nav`
  height: ${({ isOpen }) => (isOpen ? '350px' : '20px')};
  line-height: 18px;
  color: var(--color-black);
  text-align: left;
  display: block;
  font-family: var(--font-font-stack-retina);
  transition: 0.3s;
  width: 100%;
  background-color: #eee;

  && a:hover {
    text-decoration: none;
    color: #0080c3;
  }

  a:active,
  a:link,
  a:visited {
    text-decoration: none;
    color: inherit;
  }
`;

const AboutWsj = styled.a`
  font-family: var(--font-font-stack-retina);
  color: var(--color-jet);
  font-size: 12px;
  font-weight: 500;
  display: ${({ isOpen }) => (isOpen ? 'none' : 'inline')};
`;

const HatButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: inline-block;
  font-family: var(--font-font-stack-retina);
  font-size: 11px;
  font-weight: 500;
  padding: 0 20px 0 0;
  text-transform: uppercase;
`;

const HatButtonArrow = styled.span`
  margin-left: 5px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: ${({ isOpen }) =>
    isOpen ? '6px solid transparent' : '6px solid #000'};
  border-bottom: ${({ isOpen }) => (isOpen ? '6px solid #000' : null)};
  top: ${({ isOpen }) => (isOpen ? '1px' : '7px')};
  display: inline-block;
`;

const HatWrapper = styled.div`
  line-height: 20px;
  margin: 0 10px;

  display: ${({ isOpen }) => (isOpen ? 'block' : 'flex')};
  justify-content: ${({ isOpen }) => (isOpen ? '' : 'space-between')};
`;

const HatInner = styled.div`
  width: 100%;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  background: #eee;
  left: 0;
  top: 20px;
  transition: 0.3s;
  z-index: 99;
  box-sizing: border-box;
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? '330px' : '0px')};
`;

const HatInnerWrapper = styled.ul`
  position: relative;
  margin: 0 10px;
  padding: 20px 0 0;
  clear: both;
  list-style: none;
  display: flex;

  @media only screen and (min-width: 980px) and (max-width: 1299px) {
    display: block;
  }
`;

const HatBio = styled.li`
  height: 310px;
  width: 300px;
  line-height: 20px;
  font-weight: 100;
  padding-right: 25px;
  margin-right: 20px;
  box-sizing: border-box;
  font-size: 12px;
  text-transform: none;

  @media only screen and (min-width: 980px) and (max-width: 1299px) {
    height: auto;
    width: 470px;
    font-size: 11px;
    line-height: 18px;
    margin-bottom: 10px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 0;
  width: 5pc;
  height: 5pc;
  z-index: 100;
  background-color: transparent;
  text-align: center;
  line-height: 5pc;
  color: var(--color-black);
  cursor: pointer;
  border: none;
`;

const HatEscape = styled.div`
  position: absolute;
  top: 350px;
  left: 0;
  height: 100vh;
  width: 100%;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const debounce = (callback, wait) => {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
};

const linksColumns = (columnLength, linksLength) => {
  return {
    col1: [0, columnLength - 1],
    col2: [columnLength, linksLength.length - 1],
  };
};

const linksLength = (links) => {
  return links.length % 2 === 0
    ? Math.floor(links.length) / 2
    : Math.floor(links.length + 1) / 2;
};

const Hat = ({ hatData, showAboutWsj }) => {
  const [open, setOpen] = useState(false);
  const [showHat, setShowHat] = useState(false);
  const hatButtonRef = useRef(null);

  const { djLinks, ncLinks } = dataTransformer(hatData);

  const is12or16u = useMediaQuery('(min-width: 980px)');
  useEffect(() => {
    if (is12or16u) {
      setShowHat(true);
    } else {
      setShowHat(false);
    }
  }, [is12or16u]);

  if (djLinks?.length < 1 || ncLinks?.length < 1) return null;

  const scrollCloseHat = () => {
    const scroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (scroll > 0 && open) {
      setOpen(!open);
    }
  };

  const closeHat = () => {
    setOpen(false);
    hatButtonRef.current.focus();
  };

  const onEscape = (event) => {
    if (event.keyCode === 27 && open) {
      closeHat();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', debounce(scrollCloseHat, 50));
    window.addEventListener('keyup', onEscape);

    return () => {
      window.removeEventListener('scroll', debounce(scrollCloseHat, 50));
      window.removeEventListener('keyup', onEscape);
    };
  }, [open]);

  const djLinksLength = linksLength(djLinks);
  const ncLinksLength = linksLength(ncLinks);

  const djLinksColumns = linksColumns(djLinksLength, djLinks);
  const ncLinksColumns = linksColumns(ncLinksLength, ncLinks);

  if (!showHat) return null;

  return (
    <StyledHat isOpen={open} aria-label="Secondary">
      <HatWrapper isOpen={open}>
        <HatButton
          onClick={() => setOpen(!open)}
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls="hat-dropdown"
          id="hat-button"
          ref={hatButtonRef}
        >
          <span>Dow Jones, a News Corp company</span>
          <HatButtonArrow isOpen={open} />
        </HatButton>
        {showAboutWsj ? (
          <AboutWsj
            isOpen={open}
            href="https://www.wsj.com/about-us?mod=wsjcorphat"
          >
            About WSJ
          </AboutWsj>
        ) : null}
      </HatWrapper>
      <HatInner isOpen={open}>
        <HatInnerWrapper
          id="hat-dropdown"
          role="menu"
          aria-labelledby="hat-button"
        >
          <HatBio role="none">
            News Corp is a global, diversified media and information services
            company focused on creating and distributing authoritative and
            engaging content and other products and services.
          </HatBio>
          <HatProducts
            columns={djLinksColumns}
            data={djLinks}
            title="Dow Jones"
          />
          <HatProducts
            columns={ncLinksColumns}
            data={ncLinks}
            title="News Corp"
          />
          <li role="none">
            <CloseButton onClick={closeHat} aria-label="Close menu">
              <CloseMedium />
            </CloseButton>
          </li>
        </HatInnerWrapper>
      </HatInner>
      <HatEscape />
    </StyledHat>
  );
};

Hat.propTypes = {
  hatData: PropTypes.arrayOf(
    PropTypes.shape({
      array: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          url: PropTypes.url,
          nofollow: PropTypes.bool,
        })
      ),
    })
  ),
  showAboutWsj: PropTypes.bool,
};

Hat.defaultProps = {
  /**
     Hat data that contains the links that will be displayed in both
     hat columns(Dow Jones and News Corp) links.
   */
  hatData: [
    {
      djLinks: [],
    },
    {
      ncLinks: [],
    },
  ],
  /**
    Boolean to know whether we will display the about wsj label or not.
   */
  showAboutWsj: true,
};

export default Hat;
