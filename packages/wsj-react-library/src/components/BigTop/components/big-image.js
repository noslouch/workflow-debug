import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { QUERIES } from '../../../lib/consts';

const Picture = styled.picture`
  img {
    display: block;
    width: 100%;
    height: auto;

    margin: 0 auto;
  }
`;

const Wrapper = styled.div`
  margin-bottom: 5px;

  @media ${QUERIES.medium} {
    margin-bottom: 0;
  }
`;

export default function BigImage({ ariaCaption, images, onLoad, className }) {
  const img = useRef();

  // sometimes the image is already loaded by the time react is hydrated
  useEffect(() => {
    if (img.current?.complete) {
      onLoad();
    }
  }, [onLoad]);

  return (
    <Wrapper
      className={className}
      role="img"
      aria-describedby={ariaCaption}
      itemScope
      itemType="https://schema.org/ImageObject"
    >
      <Picture>
        <source
          media="(min-width: 640px)"
          srcSet={images.large.url}
          width={images.large.width}
          height={images.small.height}
        />
        <img
          ref={img}
          src={images.small.url}
          width={images.small.width}
          height={images.small.height}
          alt=""
          onLoad={onLoad}
          aria-label="big top image"
        />
      </Picture>
    </Wrapper>
  );
}

const ImageProp = PropTypes.shape({
  url: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
});

BigImage.propTypes = {
  ariaCaption: PropTypes.string,
  className: PropTypes.string,
  images: PropTypes.shape({
    large: ImageProp,
    small: ImageProp,
  }),
  onLoad: PropTypes.func,
};

BigImage.defaultProps = {
  ariaCaption: '',
  className: '',
  images: {},
  onLoad: undefined,
};
