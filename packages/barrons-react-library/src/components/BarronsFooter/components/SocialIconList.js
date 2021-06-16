import styled from 'styled-components';
import SocialIcon from './SocialIcon';

const Icons = (props) => {
  const { icons } = props;
  return (
    Array.isArray(icons) &&
    icons.map((icon) => {
      return (
        <SocialIcon
          key={icon.cssName}
          cssName={icon.cssName}
          href={icon.href}
          text={icon.text}
        />
      );
    })
  );
};

export default function SocialIconList(props) {
  return (
    <Wrapper itemScope itemType="http://schema.org/Organization">
      <Icons {...props} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: inline-flex;
  flex-grow: 1;
  text-align: right;
  margin-left: 2px;
  height: 25px;
`;
