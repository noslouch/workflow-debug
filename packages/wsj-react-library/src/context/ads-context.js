import React, { useContext, createContext } from 'react';
import PropTypes from 'prop-types';

const AdsContext = createContext();
AdsContext.displayName = 'AdsContext';

const useAdsContext = () => {
  const context = useContext(AdsContext);
  if (context === undefined) {
    throw new Error('useAdsContext must be used within an AdsProvider');
  }
  return context;
};

const AdsProvider = ({ children, ads }) => {
  return <AdsContext.Provider value={ads}>{children}</AdsContext.Provider>;
};

AdsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  ads: PropTypes.objectOf(
    PropTypes.shape({
      adActivate: PropTypes.bool,
      adId: PropTypes.string,
      adLocation: PropTypes.string,
      adUnitPath: PropTypes.string,
      pageId: PropTypes.string,
      params: PropTypes.shape({ parallax: PropTypes.bool }),
      trackingKey: PropTypes.string,
      formattedAdSizes: PropTypes.shape({
        at4units: PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.number),
            PropTypes.string,
          ])
        ),
        at8units: PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.number),
            PropTypes.string,
          ])
        ),
        at12units: PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.number),
            PropTypes.string,
          ])
        ),
        at16units: PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.number),
            PropTypes.string,
          ])
        ),
      }),
    })
  ),
};

AdsProvider.defaultProps = {
  children: '',
  ads: null,
};

export { useAdsContext, AdsProvider };
