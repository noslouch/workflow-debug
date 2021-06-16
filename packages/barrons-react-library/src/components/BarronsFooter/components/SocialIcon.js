import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import darkFacebook from '../../../assets/svg/social/dark-facebook.svg';
import darkTwitter from '../../../assets/svg/social/dark-twitter.svg';
import darkLinkedin from '../../../assets/svg/social/dark-linkedIn.svg';
import darkInstagram from '../../../assets/svg/social/dark-instagram.svg';
import email from '../../../assets/svg/social/email.svg';

export default function SocialIcon(props) {
  const { cssName = '', href = '', text = '' } = props;

  return (
    <Wrapper cssName={cssName}>
      <link itemProp="url" href="https://www.barrons.com" />
      <Anchor itemProp="sameAs" href={href} />
      {text && <div>{text}</div>}
    </Wrapper>
  );
}

SocialIcon.propTypes = {
  cssName: PropTypes.string,
  href: PropTypes.string,
  text: PropTypes.string,
};

SocialIcon.defaultProps = {
  cssName: '',
  href: '',
  text: '',
};

const Wrapper = styled.div`
  margin: 5px 10px 0;
  display: inline-block;
  background-position: center;
  background-repeat: no-repeat;
  height: 15px;
  ${(props) => {
    switch (props.cssName) {
      case 'fb':
        return css`
          background-image: url('${darkFacebook}');
          width: 7px;
        `;
      case 'twitter':
        return css`
          background-image: url('${darkTwitter}');
          width: 17px;
        `;
      case 'linkedin':
        return css`
          background-image: url('${darkLinkedin}');
          width: 15px;
        `;
      case 'instagram':
        return css`
          background-image: url('${darkInstagram}');
          width: 16px;
        `;
      case 'email':
        return css`
          background-image: url('${email}');
          width: 15px;
        `;
      default:
        return css``;
    }
  }}
`;

const Anchor = styled.a`
  display: inline-block;
  width: 100%;
  height: 100%;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
`;
