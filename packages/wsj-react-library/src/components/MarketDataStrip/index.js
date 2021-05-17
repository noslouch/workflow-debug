import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tickerTransformer from './dataTransformer';

const MdSector = styled.div`
  background-color: #000;
  font-family: var(--font-font-stack-retina-narrow);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  height: 35px;
  margin: 0 auto;
  padding: 0;
  font-size: 13px;
  color: #fff;

  @media only screen and (min-width: 640px) and (max-width: 979px) {
    position: ${({ isFixedScroll }) => (isFixedScroll ? 'fixed' : 'relative')};
    font-size: 12px;
  }

  @media only screen and (min-width: 0px) and (max-width: 639px) {
    box-sizing: border-box;
    min-width: 300px;
    position: ${({ isFixedScroll }) => (isFixedScroll ? 'fixed' : 'relative')};
    padding-left: 10px;
    font-size: 12px;
  }
`;

const Arrow = styled.span`
  margin-left: 5px;
  font-size: 13px;
  color: ${({ tickerUp }) => (tickerUp ? '#68be0a' : '#ff352d')};
`;

const Ticker = styled.div`
  line-height: 14px;
  white-space: nowrap;
  font-size: 14px;
  padding-right: 40px;
  position: relative;

  &:first-child {
    padding-left: 10px;
  }

  &:last-child {
    padding-right: 10px;
    text-align: right;
    border-right: none;
  }

  @media only screen and (min-width: 980px) and (max-width: 1299px) {
    padding-right: 30px;

    &:last-child {
      padding-right: 10px;
      text-align: right;
      border-right: none;
    }
  }

  @media only screen and (min-width: 640px) and (max-width: 979px) {
    padding-left: 4px;
    padding-right: 8px;
    text-align: center;

    &:last-child {
      text-align: center;
    }
  }

  @media only screen and (min-width: 0px) and (max-width: 639px) {
    text-align: center;
    padding-left: 8px;
    padding-right: 8px;

    &:first-child {
      padding-left: 0px;
    }

    &:last-child {
      text-align: center;
    }
  }
`;

const TickerPrice = styled.span`
  margin-left: 5px;
  font-weight: 500;

  @media only screen and (min-width: 0px) and (max-width: 639px) {
    display: none;
  }
`;

const TickerPercentage = styled.span`
  font-weight: 300;
  margin-left: 6px;
  color: ${({ tickerUp }) => (tickerUp ? '#68be0a' : '#ff352d')};
`;

const TickerLink = styled.a`
  text-decoration: none;
  color: inherit;

  :visited {
    color: inherit;
  }

  :hover {
    color: #999;
    text-decoration: none;

    ${TickerPercentage} {
      color: ${({ tickerUp }) => (tickerUp ? '#075700' : '#ba0303')};
    }

    ${Arrow} {
      color: ${({ tickerUp }) => (tickerUp ? '#075700' : '#ba0303')};
    }
  }
`;

const TickerName = styled.span`
  font-weight: 300;
`;

// to hide "points with a" from stock but element should be available for screen readers as part of accessibility.
const VisuallyHiddenSpan = styled.span`
  left: 65px;
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  white-space: nowrap; /* added line */
  pointer-events: none;
`;

const renderStrip = (marketData, arrowAtEnd) => {
  return marketData.map((data) => {
    const {
      displayName,
      displayPrice,
      isUS10YrBond,
      perChangeToDisplay,
      tickerAccPoints,
      tickerAriaLabel,
      up,
      url,
    } = data;

    const arrow = (
      <Arrow aria-label={up ? 'increase' : 'decrease'} tickerUp={up}>
        {up ? '▲' : '▼'}
      </Arrow>
    );

    const arrowMiddle = arrowAtEnd ? null : arrow;
    const arrowEnd = arrowAtEnd ? arrow : null;
    const key = displayName.toLowerCase().split(' ').join('-');
    return (
      <Ticker key={key}>
        <TickerLink tickerUp={up} href={`${url}?mod=mdstrip`}>
          <TickerName aria-label={tickerAriaLabel}>{displayName}</TickerName>
          {arrowMiddle}
          <TickerPrice>
            {displayPrice} {isUS10YrBond ? ' Yield' : null}
          </TickerPrice>
          <VisuallyHiddenSpan>{tickerAccPoints}</VisuallyHiddenSpan>
          <TickerPercentage tickerUp={up}>
            {perChangeToDisplay}
          </TickerPercentage>
          {arrowEnd}
        </TickerLink>
      </Ticker>
    );
  });
};

const MarketDataStrip = ({ marketData, arrowAtEnd, isFixedScroll }) => {
  if (!marketData || marketData.length < 1) return null;

  const transformedData = tickerTransformer(marketData);
  const strip = renderStrip(transformedData, arrowAtEnd);

  return (
    <MdSector
      role="region"
      aria-label="Markets summary"
      isFixedScroll={isFixedScroll}
    >
      {strip}
    </MdSector>
  );
};

MarketDataStrip.propTypes = {
  /**
    Market strip data, contains ticker data.
   */
  marketData: PropTypes.arrayOf(
    PropTypes.shape({
      ticker: PropTypes.string,
      commonName: PropTypes.string,
      bgChannel: PropTypes.string,
      displayName: PropTypes.string,
      up: PropTypes.bool,
      displayPrice: PropTypes.string,
      displayPerChange: PropTypes.string,
      displayChange: PropTypes.string,
      hideIn4u: PropTypes.boolean,
      hideIn12u: PropTypes.boolean,
      isUS10YrBond: PropTypes.boolean,
      url: PropTypes.string,
    })
  ),
  /**
    Boolean indicating whether the position of the arrow is at (center or end) of the ticker
   */
  arrowAtEnd: PropTypes.bool,
  /**
    Boolean indicating whether the strip position is fixed or relative   
   */
  isFixedScroll: PropTypes.bool,
};

MarketDataStrip.defaultProps = {
  marketData: [],
  arrowAtEnd: false,
  isFixedScroll: false,
};

export default MarketDataStrip;
