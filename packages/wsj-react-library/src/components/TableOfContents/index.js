import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  margin: var(--spacing-spacer-20) 0;
`;

const Title = styled.h2`
  color: var(--color-jet);
  font-family: var(--font-font-stack-retina-narrow);
  font-size: var(--typography-headline-font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: 1.3;
  margin: var(--spacing-spacer-8) 0;
  text-transform: uppercase;
`;

const List = styled.ul`
  border-top: 1px solid var(--color-jet);

  && {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  ${({ isCollapsed }) =>
    !isCollapsed && {
      'border-bottom': '1px solid var(--color-jet)',
    }}
`;

const ListItem = styled.li`
  &&& {
    padding: var(--spacing-spacer-8) 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-smoke);
  }
`;

const ListItemLink = styled.a`
  color: var(--color-blue);
  display: block;
  font-family: var(--font-font-stack-retina);
  font-size: var(--typography-headline-font-size-xxs);
  line-height: 1.5;
  margin: 0 2px;

  && {
    text-decoration: none;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const HiddenContainer = styled.li`
  max-height: 40px;
  overflow: hidden;
  transition: max-height 0.5s ease-in;

  ${({ isCollapsed }) =>
    !isCollapsed && {
      'max-height': '999px',
    }}
`;

const HiddenContainerList = styled.ul`
  && {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const BottomBorder = styled.div`
  background: var(--color-white);
  border-top: 1px solid var(--color-jet);
  height: 15px;
  margin-top: -20px;
`;

const ExpandButton = styled.button`
  color: var(--color-coal);
  cursor: pointer;
  font-family: var(--font-font-stack-retina);
  background-color: var(--color-white);
  border: 1px solid var(--color-black-opac-50);
  font-style: var(--font-style-normal);
  font-weight: var(--font-weight-medium);
  padding: 0 var(--spacing-spacer-8);
  text-transform: uppercase;
  font-size: 14px;
  line-height: 1;
  letter-spacing: 0.5px;
  transition: background-color 400ms;
  border-radius: 2px;
  margin: -35px auto 0;
  height: 32px;
  width: 169px;
  white-space: nowrap;

  &:hover {
    background-color: var(--color-smoke);
  }
`;

const TableOfContents = (props) => {
  const {
    buttonText,
    collapsedItemCount,
    collapseAfter,
    contents,
    forceExpand,
    titleTag,
    titleText,
  } = props;

  const shouldCollapse =
    !forceExpand &&
    collapsedItemCount > 0 &&
    collapseAfter > 0 &&
    collapseAfter >= collapsedItemCount &&
    contents.length > collapseAfter;
  const [isCollapsed, setIsCollapsed] = useState(() => shouldCollapse);
  const hiddenElementRef = useRef(null);
  // If contents prop is not an array, or if empty skip rendering
  if (!Array.isArray(contents) || contents.length === 0) return null;
  // Initial collapse state depending on the following conditions
  const handleExpand = () => {
    setIsCollapsed(false);
    if (hiddenElementRef && hiddenElementRef.current)
      hiddenElementRef.current.focus();
  };
  return (
    <Container aria-label={titleText}>
      <Title as={titleTag}>{titleText}</Title>
      <List isCollapsed={isCollapsed}>
        <>
          {contents.map((content, index) => {
            if (index > collapsedItemCount - 1) return null;
            return (
              <ListItem key={content.id}>
                <ListItemLink href={`#${content.id}`}>
                  {content.text}
                </ListItemLink>
              </ListItem>
            );
          })}
          <HiddenContainer isCollapsed={isCollapsed}>
            <HiddenContainerList>
              {contents.map((content, index) => {
                if (index < collapsedItemCount) return null;
                const hiddenItemLinkProps = {
                  ...(isCollapsed && { tabIndex: '-1' }),
                  ...(index === collapsedItemCount && {
                    ref: hiddenElementRef,
                  }),
                };
                return (
                  <ListItem key={content.id}>
                    <ListItemLink
                      href={`#${content.id}`}
                      {...hiddenItemLinkProps}
                    >
                      {content.text}
                    </ListItemLink>
                  </ListItem>
                );
              })}
            </HiddenContainerList>
          </HiddenContainer>
        </>
      </List>
      {isCollapsed && (
        <>
          <BottomBorder />
          <ExpandButton onClick={handleExpand}>{buttonText}</ExpandButton>
        </>
      )}
    </Container>
  );
};

TableOfContents.propTypes = {
  buttonText: PropTypes.string,
  collapseAfter: PropTypes.number,
  collapsedItemCount: PropTypes.number,
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    })
  ),
  forceExpand: PropTypes.bool,
  titleTag: PropTypes.elementType,
  titleText: PropTypes.string,
};

TableOfContents.defaultProps = {
  buttonText: 'Show All Sections',
  collapseAfter: 4,
  collapsedItemCount: 3,
  contents: [],
  forceExpand: false,
  titleTag: 'h2',
  titleText: 'Table Of Contents',
};

export default TableOfContents;
