import React from 'react';
import { render } from '@testing-library/react';
import MarketDataStrip from './index';
import marketDataMock from '../../../__mocks__/marketDataStrip.json';

test('Market Data Strip is not rendered when when marketStripData prop is not provided', () => {
  const { container } = render(<MarketDataStrip />);
  expect(container.firstChild).toBeNull();
});

test('Market Data Strip renders correct tickers names', () => {
  const tickerDisplayNames = marketDataMock.map((data) => data.displayName);

  const { getByText } = render(
    <MarketDataStrip
      marketData={marketDataMock}
      arrowAtEnd
      isFixedScroll={false}
      region="na,us"
    />
  );

  tickerDisplayNames.forEach((tickerDisplayName) => {
    expect(getByText(tickerDisplayName)).toBeInTheDocument();
  });
});

test('Market Data Strip renders arrow at the end of the ticker with arrowAtEnd prop is set to true', () => {
  const { getAllByRole } = render(
    <MarketDataStrip
      marketData={marketDataMock}
      arrowAtEnd
      isFixedScroll={false}
      region="na,us"
    />
  );

  const tickers = getAllByRole('link');
  tickers.forEach((ticker) => {
    const arrowAtEnd = ticker.children[4].textContent;
    expect(arrowAtEnd === '▼' || arrowAtEnd === '▲').toBe(true);
  });
});

test('Market Data Strip renders arrow at the middle of the ticker with arrowAtEnd prop is set to true', () => {
  const { getAllByRole } = render(
    <MarketDataStrip
      marketData={marketDataMock}
      arrowAtEnd={false}
      isFixedScroll={false}
      region="na,us"
    />
  );

  const tickers = getAllByRole('link');
  tickers.forEach((ticker) => {
    const arrowInMiddle = ticker.children[1].textContent;
    expect(arrowInMiddle === '▼' || arrowInMiddle === '▲').toBe(true);
  });
});

test('Market Data Strip renders arrow with the correct color', () => {
  const { getAllByRole } = render(
    <MarketDataStrip
      marketData={marketDataMock}
      arrowAtEnd={false}
      isFixedScroll={false}
      region="na,us"
    />
  );

  const tickers = getAllByRole('link');
  tickers.forEach((ticker, index) => {
    const { up } = marketDataMock[index];
    const arrow = ticker.children[1];
    if (up) {
      expect(arrow).toHaveStyle('color: #68be0a');
    } else {
      expect(arrow).toHaveStyle('color: #ff352d');
    }
  });
});

test('Market Data Strip renders the ticker in correct format and order', () => {
  const { getAllByRole } = render(
    <MarketDataStrip
      marketData={marketDataMock}
      arrowAtEnd={false}
      isFixedScroll={false}
      region="na,us"
    />
  );
  const tickers = getAllByRole('link');

  tickers.forEach((ticker, index) => {
    const renderedDisplayName = ticker.children[0].textContent;
    const arrowMiddle = ticker.children[1].textContent;
    const renderedDisplayPrice = ticker.children[2].textContent.trim();
    const renderedTickerAccPoints = ticker.children[3].textContent;
    const renderedPerChangeToDisplay = ticker.children[4].textContent;

    const {
      displayName,
      displayPrice,
      commonName,
      displayPerChange,
      isUS10YrBond,
    } = marketDataMock[index];

    const T_NOTE = 'U.S. 10 Year Treasury Note';

    const getTickerPerChange = (perchange) => perchange?.split('-');

    const transformedPerChange = getTickerPerChange(displayPerChange);

    expect(renderedDisplayName).toBe(displayName);
    expect(arrowMiddle === '▼' || arrowMiddle === '▲').toBe(true);
    expect(renderedDisplayPrice).toBe(
      isUS10YrBond ? `${displayPrice}  Yield` : displayPrice
    );
    expect(renderedTickerAccPoints).toBe(
      commonName === T_NOTE ? 'with a' : 'points with a'
    );
    expect(transformedPerChange.includes(renderedPerChangeToDisplay)).toBe(
      true
    );
  });
});

test('Market Data Strip renders the correct aria label for the ticker', () => {
  const CRUDE = 'Crude Oil WTI (NYM $/bbl) Front Month';
  const formatTickerAriaLabel = (commonName) =>
    commonName === CRUDE ? 'Crude Oil currently' : `${commonName} currently`;

  const { getByLabelText } = render(
    <MarketDataStrip
      marketData={marketDataMock}
      arrowAtEnd={false}
      isFixedScroll={false}
      region="na,us"
    />
  );
  const tickers = marketDataMock;

  tickers.forEach((ticker) => {
    const tickerAriaLabel = formatTickerAriaLabel(ticker.commonName);
    expect(getByLabelText(tickerAriaLabel)).toBeInTheDocument();
  });
});

test('Market Data Strip renders the correct aria label for arrows', () => {
  const { getAllByLabelText } = render(
    <MarketDataStrip
      marketData={marketDataMock}
      arrowAtEnd={false}
      isFixedScroll={false}
      region="na,us"
    />
  );
  const tickers = marketDataMock;
  let countUp = 0;

  tickers.forEach((ticker) => {
    if (ticker.up) {
      countUp += 1;
    }
  });

  expect(getAllByLabelText('increase').length).toBe(countUp);
  expect(getAllByLabelText('decrease').length).toBe(
    marketDataMock.length - countUp
  );
});
