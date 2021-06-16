import styled from 'styled-components';
import PropTypes from 'prop-types';

import SocialIconList from './SocialIconList';

export default function FloatingBar({ content: { links, header, title } }) {
  const socialIcons = [
    { cssName: 'fb', href: links.fb || '' },
    { cssName: 'twitter', href: links.twitter || '' },
    { cssName: 'linkedin', href: links.linkedin || '' },
    { cssName: 'instagram', href: links.instagram || '' },
  ];

  return (
    <Wrapper>
      <Header>{header}</Header>
      <Title>{title}</Title>
      <SocialIconList icons={socialIcons} />
    </Wrapper>
  );
}

FloatingBar.propTypes = {
  content: PropTypes.shape({
    links: PropTypes.shape({
      fb: PropTypes.string,
      twitter: PropTypes.string,
      linkedin: PropTypes.string,
      instagram: PropTypes.string,
    }),
    header: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

const Wrapper = styled.div`
  margin-bottom: -10px;
  display: flex;
  flex-flow: column;
  margin-top: -7px;
`;

const Header = styled.div`
  font-family: 'Tiempos Headline', georgia, serif;
  line-height: 28px;
  font-size: 24px;
  font-weight: 500;
  color: color-text;
  margin: 17px 0 0 12px;
`;

const Title = styled.div`
  font-family: 'Tiempos Headline', georgia, serif;
  line-height: 19px;
  font-size: 16px;
  color: color-grey;
  margin: 6px 12px;
`;
