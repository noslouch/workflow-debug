import React from 'react';
import styled from 'styled-components';
import Box from '../Box';
import PropTypes from 'prop-types';
import appendQueryParams from '../../urlHelpers/appendQueryParams';
import DotSmall from '../../assets/icons/Standard/small/dot-small.svg';
import PlayTriangleFilledSmall from '../../assets/icons/AudioVideo/small/play-triangle-filled-small.svg';
import Volume2FilledSmall from '../../assets/icons/AudioVideo/small/volume2-filled-small.svg';

const StyledRibbon = styled(Box)`
  border-bottom: ${({ border }) => (border.includes('bottom') ? '1px solid #cccccc' : '')};
  border-top: ${({ border }) => (border.includes('top') ? '1px solid #cccccc' : '')};
  border-right: ${({ border }) => (border.includes('right') ? '1px solid #cccccc' : '')};
  border-left: ${({ border }) => (border.includes('left') ? '1px solid #cccccc' : '')};
  font-family: 'Retina Narrow', 'Retina', 'Arial Narrow', Arial, Helvetica, sans-serif;
  background-color: ${({ isOpinion }) => (isOpinion ? '#f8f7f5' : '#f4f4f4')};
  @media (max-width: 980px) and (min-width: 0px) {
    overflow-x: scroll;
  }
  @media print {
    display: none;
  }
`;

const RibbonContainer = styled(Box)`
  display: flex;
  width: 1280px;
  margin: 0 auto;
  @media (max-width: 1280px) and (min-width: 980px) {
    width: 980px;
  }
  @media (max-width: 980px) and (min-width: 0px) {
    width: 100%;
  }
`;

const SectionHeading = styled(Box)`
  margin-right: 65px;
  margin-top: 13px;
  @media (max-width: 980px) and (min-width: 0px) {
    margin-left: 10px;
    margin-right: 30px;
    margin-top: 13px;
  }
`;

const SectionTitle = styled.span`
  font-size: 17px;
  line-height: 17px;
  font-weight: 500;
  text-transform: uppercase;
  display: block;
  padding-bottom: 2px;
  margin-top: 0px;
  margin-bottom: 0px;
  & a {
    color: #222222;
    text-decoration: none;
  }
`;

const OpinionSectionTitle = styled.span`
  font-family: 'Escrow Condensed', Georgia, serif;
  font-weight: 600;
  letter-spacing: 0.2px;
  height: 22px;
  line-height: 22px;
  font-size: 20px;
  text-transform: none;
  & a {
    color: #222222;
    text-decoration: none;
    display: flex;
  }
`;

const SectionSubHead = styled.span`
  font-size: 13px;
  line-height: 13px;
  color: ${({ isOpinion }) => (isOpinion ? '#675842' : '#555555')};
  font-weight: 300;
`;

const LinkContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  padding-top: 18px;
  padding-bottom: 11px;
  @media (max-width: 980px) and (min-width: 0px) {
    flex-wrap: nowrap;
  }
`;

const StyledLink = styled.a`
  border: ${({ isOpinion }) => (isOpinion ? '1px solid #867256' : '1px solid #999999')};
  border-radius: 2px;
  padding: 6px 10px 4px 10px;
  margin-right: 7px;
  margin-top: 1px;
  margin-bottom: 7px;
  line-height: 11px;
  font-weight: ${({ isOpinion }) => (isOpinion ? '700' : '500')};
  font-size: 13px;
  white-space: nowrap;
  text-transform: uppercase;
  color: ${({ isOpinion }) => (isOpinion ? '#867256' : '#555555')};
  text-decoration: none;
  display: flex;
  align-items: center;
  :hover {
    text-decoration: none;
    color: ${({ isOpinion }) => (isOpinion ? '' : '#666')};
  }

  ${({ redAndFlashing }) =>
    redAndFlashing &&
    `
    padding: 3px 6px 3px 4px;
    :not(.nohover) {
      border-color: #d30204;
      color: #d30204;
    }

  `}

  @keyframes blink {
    0% {
      opacity: 0.25;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.25;
    }
  }
`;

const Icon = styled.span`
  color: ${({ isOpinion }) => (isOpinion ? '#867256' : '#555555')};
  margin-right: 6px;
  margin-bottom: 2px;
  padding-top: 2px;

  use {
    fill: ${({ isOpinion }) => (isOpinion ? '#867256' : '#555555')};
  }

  ${({ redAndFlashing }) =>
    redAndFlashing &&
    `
    animation-name: blink;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.77, 0, 0.251, 1);
    display: inline-block;
    margin-right: 2px;
    color: #ec0404;
    use {
      fill: #ec0404;
    }
  `}
`;

const appendMod = (href, modCode) => {
  if (!modCode) return href;
  return appendQueryParams(href, { mod: modCode });
};

const renderTabs = (tabs, modCode, isOpinion) => {
  return (
    <LinkContainer isOpinion={isOpinion}>
      {tabs.map((tab) => {
        const { audio, href, redAndFlashing, title, video } = tab;
        const key = btoa(title);
        return (
          <StyledLink redAndFlashing={redAndFlashing} isOpinion={isOpinion} href={appendMod(href, modCode)} key={key}>
            {audio && !redAndFlashing ? (
              <Icon isOpinion={isOpinion}>
                <Volume2FilledSmall />
              </Icon>
            ) : null}
            {redAndFlashing ? (
              <Icon redAndFlashing={redAndFlashing}>
                <DotSmall />
              </Icon>
            ) : null}
            {video && !redAndFlashing ? (
              <Icon isOpinion={isOpinion}>
                <PlayTriangleFilledSmall />
              </Icon>
            ) : null}
            <span>{title}</span>
          </StyledLink>
        );
      })}
    </LinkContainer>
  );
};

const Ribbon = ({ tabs, titleUrl, isOpinion, sectionSubHed, sectionTitle, border, modCode }) => {
  if (!tabs || tabs.length == 0) return null;
  return (
    <StyledRibbon border={border} isOpinion={isOpinion}>
      <RibbonContainer>
        <SectionHeading>
          {isOpinion ? (
            <OpinionSectionTitle>
              <a href={appendMod(titleUrl, modCode)}>{sectionTitle}</a>
            </OpinionSectionTitle>
          ) : (
            <SectionTitle>
              <a href={appendMod(titleUrl, modCode)}>{sectionTitle}</a>
            </SectionTitle>
          )}
          <SectionSubHead isOpinion={isOpinion}>{sectionSubHed}</SectionSubHead>
        </SectionHeading>
        {renderTabs(tabs, modCode, isOpinion)}
      </RibbonContainer>
    </StyledRibbon>
  );
};

Ribbon.defaultProps = {
  border: [],
};

Ribbon.propTypes = {
  /**
   Array to in case border is needed example: ["top", "bottom"]
  */
  border: PropTypes.arrayOf(PropTypes.string),
  /**
   Boolean to decided weather the ribbon is opinion or not
  */
  isOpinion: PropTypes.bool,
  /**
   Section title name
  */
  sectionTitle: PropTypes.string,
  /**
   Section sub hed name
  */
  sectionSubHed: PropTypes.string,
  /**
   Url for the section title
   */
  titleUrl: PropTypes.string,
  /**
   This is the modcode for analytics
   */
  modCode: PropTypes.string,
  /**
     Each element displayed in the Ribbon
   */
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      audio: PropTypes.bool,
      redAndFlashing: PropTypes.bool,
      video: PropTypes.bool,
      appleNews: PropTypes.bool,
      href: PropTypes.string,
    })
  ),
};

export default Ribbon;
