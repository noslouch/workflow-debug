import { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { loadAtmoLib } from '../../helpers/load-libs';

const Container = styled.div`
  width: 100%;
  height: 100%;
  video {
    display: block;
  }
`;

const AtmosphericPlayer = (props) => {
  const { endpoint, guid, idPrefix } = props;
  const videoRef = useRef(null);
  useEffect(() => {
    loadAtmoLib(endpoint)
      .then(() => {
        // eslint-disable-next-line no-new,new-cap
        new window.com_marketwatch_atmplayer(videoRef.current);
      })
      .catch((err) => console.error('Failed to load atmo player', err));
  }, [endpoint]);

  if (!guid) return null;
  return (
    <Container
      key={guid}
      ref={videoRef}
      id={`${idPrefix}${guid}`}
      role="presentation"
      data-atm={guid}
    />
  );
};

AtmosphericPlayer.propTypes = {
  endpoint: PropTypes.string,
  guid: PropTypes.string.isRequired,
  idPrefix: PropTypes.string,
};

AtmosphericPlayer.defaultProps = {
  endpoint: 'https://video-api.wsj.com',
  idPrefix: 'atmo',
};

export default memo(AtmosphericPlayer);
