const T_NOTE = 'U.S. 10 Year Treasury Note';
const CRUDE = 'Crude Oil WTI (NYM $/bbl) Front Month';

const formatTickerAriaLabel = (commonName) =>
  commonName === CRUDE ? 'Crude Oil currently' : `${commonName} currently`;

const getTickerAccPoints = (commonName) =>
  commonName === T_NOTE ? 'with a' : 'points with a';

const getTickerPerChange = (displayPerChange) => displayPerChange?.split('-');

const dataTransformer = (marketData) => {
  const filteredData = marketData.filter((ticker) => {
    return ticker.displayName || ticker.displayPrice;
  });
  const transformedData = [];
  filteredData.forEach((ticker) => {
    const { commonName, displayPerChange } = ticker;
    const transformed = { ...ticker };
    transformed.tickerAriaLabel = formatTickerAriaLabel(commonName);
    transformed.tickerAccPoints = getTickerAccPoints(commonName);
    transformed.perChangeToDisplay = getTickerPerChange(displayPerChange);
    transformedData.push(transformed);
  });

  return transformedData;
};

export default dataTransformer;
