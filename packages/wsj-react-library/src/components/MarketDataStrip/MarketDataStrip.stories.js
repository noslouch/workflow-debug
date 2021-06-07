import { useState, useEffect } from 'react';
import MarketDataStrip from '.';
import marketDataMock from '../../../__mocks__/marketDataStrip.json';

import useMedia from '../../hooks/useMediaQuery';

export default {
  title: 'Market Data Strip',
  component: MarketDataStrip,
};

const twelveUTicker = marketDataMock.filter(
  (ticker) => ticker.hideIn12u !== true
);
const eightUTicker = marketDataMock.filter(
  (ticker) => ticker.ticker === 'SPX' || !ticker.hideIn4u
);
const fourUTicker = marketDataMock.filter((ticker) => !ticker.hideIn4u);

const ResponsiveTemplate = (args) => {
  const { marketData } = args;
  const is4u = useMedia('(min-width: 0px) and (max-width: 639px)');
  const is8u = useMedia('(min-width: 640px) and (max-width: 979px)');
  const is12u = useMedia('(min-width: 980px) and (max-width: 1299px)');
  const is16u = useMedia('(min-width: 1300px)');

  const [tickers, setTickers] = useState(marketData);

  useEffect(() => {
    if (is16u) {
      setTickers(marketData);
    } else if (is12u) {
      setTickers(twelveUTicker);
    } else if (is8u) {
      setTickers(eightUTicker);
    } else if (is4u) {
      setTickers(fourUTicker);
    }
  }, [is16u, is12u, is8u, is4u, marketData]);

  return <MarketDataStrip {...args} marketData={tickers} />;
};

export const Default = ResponsiveTemplate.bind({});

Default.args = {
  arrowAtEnd: true,
  isFixedScroll: false,
  marketData: marketDataMock,
};
