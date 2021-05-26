import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as CommentFilledMedium } from '../../assets/icons/Standard/medium/comment-filled-medium.svg';

const ComponentWrapper = styled.div`
  width: 100%;
`;

const HeadlineWrapper = styled.div`
  padding: 13px 0 12px 0;
  display: flex;
`;

const SpeechBubble = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  margin-right: 10px;
  background-size: 20px 20px;
  transform: scale(-1, 1);
`;

const Headline = styled.h3`
  margin: 0;
  font-family: var(--font-font-stack-retina-narrow);
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-transform: uppercase;
`;

const StyledLink = styled.a`
  display: flex;
  text-decoration: none;
  cursor: pointer;
`;

const Items = styled.ul`
  counter-reset: li;
  list-style: none;
  display: inline;
  margin: 0;
  padding: 0;

  li:not(:first-child) h4 {
    border-top: 1px solid #eaeaea;
  }
`;

const Item = styled.li`
  overflow: hidden;
  margin: 0;

  @media only screen and (min-width: 0px) and (max-width: 639px) {
    width: 100%;
  }
`;

const Title = styled.h4`
  min-height: 62px;
  margin: 0 10px 0 0;
  padding: 5px 0;
  letter-spacing: 0;
  width: 179px;
  color: var(--color-coal);
  font-family: var(--font-font-stack-exchange);
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;

  @media only screen and (min-width: 0px) and (max-width: 639px) {
    width: calc(100% - 121px);
  }
`;

const ImageContainer = styled.div`
  width: 111px;
  height: 63px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
`;

const ListItems = ({ items }) => {
  return (
    <Items>
      {items.map((item) => {
        const { trackingUrl, url, title, image } = item;
        if (!trackingUrl || !title) return null;
        return (
          <Item key={url}>
            <StyledLink href={trackingUrl} data-url={url}>
              <Title>{title}</Title>
              <ImageContainer>
                <Image src={image} alt="" />
              </ImageContainer>
            </StyledLink>
          </Item>
        );
      })}
    </Items>
  );
};
ListItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      trackingUrl: PropTypes.string,
      url: PropTypes.string,
      title: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
};

const JoinTheConversation = ({ items }) => {
  return (
    <ComponentWrapper
      role="complementary"
      aria-label="Join the Conversation"
      tabIndex="-1"
    >
      <HeadlineWrapper>
        <SpeechBubble>
          <CommentFilledMedium />
        </SpeechBubble>
        <Headline>Join the Conversation</Headline>
      </HeadlineWrapper>
      <ListItems items={items} />
    </ComponentWrapper>
  );
};

JoinTheConversation.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      trackingUrl: PropTypes.string,
      url: PropTypes.string,
      title: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
};

export default JoinTheConversation;
