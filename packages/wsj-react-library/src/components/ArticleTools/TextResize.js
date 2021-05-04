import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Popover } from '@headlessui/react';
import { ReactComponent as TextIcon } from '../../assets/icons/Standard/medium/share-text-medium.svg';
import { ReactComponent as TextBoldIcon } from '../../assets/icons/Standard/medium/share-text-bold-medium.svg';
import { ReactComponent as TextSmallIcon } from '../../assets/icons/Standard/medium/A-small-medium.svg';
import { ReactComponent as TextSmallBoldIcon } from '../../assets/icons/Standard/medium/A-small-bold-medium.svg';
import { ReactComponent as TextMediumIcon } from '../../assets/icons/Standard/medium/A-medium-medium.svg';
import { ReactComponent as TextMediumBoldIcon } from '../../assets/icons/Standard/medium/A-medium-bold-medium.svg';
import { ReactComponent as TextLargeIcon } from '../../assets/icons/Standard/medium/A-large-medium.svg';
import { ReactComponent as TextLargeBoldIcon } from '../../assets/icons/Standard/medium/A-large-bold-medium.svg';

const LOCAL_STORAGE_KEY = 'wsj.article.textScale';

const OPTIONS = {
  small: {
    label: 'Small',
    icon: TextSmallIcon,
    activeIcon: TextSmallBoldIcon,
    textScale: 1, // to equal paragraph small 17px
  },
  medium: {
    label: 'Medium',
    icon: TextMediumIcon,
    activeIcon: TextMediumBoldIcon,
    textScale: 19 / 17, // to equal paragraph medium 19px
  },
  large: {
    label: 'Large',
    icon: TextLargeIcon,
    activeIcon: TextLargeBoldIcon,
    textScale: 22 / 17, // to equal paragraph large 22px
  },
};

const Button = styled.button`
  color: var(--color-nickel);
  font-family: var(--font-font-stack-retina-narrow);
  font-size: 12px;
  font-weight: var(--font-weight-regular);
  text-transform: uppercase;
`;

const PopoverContainer = styled.div`
  position: relative;
`;

const PopoverButton = styled(Button)`
  align-items: center;
  background: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
`;

const PopoverButtonText = styled.span`
  margin-left: 4px;

  ${({ isOpen }) =>
    isOpen &&
    `
    && {
      color: var(--color-jet);
    }
  `}
`;

const PopoverPanel = styled.div`
  background-color: var(--article-background-color-primary);
  border: 1px solid var(--color-silver);
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 12px 0 0 0;
  padding: 10px;
  position: absolute;
  z-index: 999;
`;

const PanelItem = styled(Button)`
  align-items: center;
  background: transparent;
  border: 1px solid var(--color-silver);
  display: flex;
  cursor: pointer;
  flex-direction: column;
  height: 72px;
  justify-content: center;
  width: 72px;

  svg {
    margin-bottom: 4px;
  }

  &:not(:last-child) {
    margin-right: var(--spacing-spacer-8);
  }

  ${({ isSelected }) =>
    isSelected &&
    `
    && {
      color: var(--color-jet);
    }
  `}
`;

const PopoverPanelItem = ({ activeScale, scale, onClick }) => {
  if (!OPTIONS[scale]) return null;
  const SVG =
    activeScale === scale ? OPTIONS[scale].activeIcon : OPTIONS[scale].icon;
  return (
    <PanelItem
      role="listitem"
      isSelected={activeScale === scale}
      onClick={() => onClick(scale)}
    >
      <SVG />
      {OPTIONS[scale].label}
    </PanelItem>
  );
};

PopoverPanelItem.propTypes = {
  activeScale: PropTypes.oneOf(Object.keys(OPTIONS)).isRequired,
  scale: PropTypes.oneOf(Object.keys(OPTIONS)).isRequired,
  onClick: PropTypes.func.isRequired,
};

const TextResize = () => {
  const [textScale, setTextScale] = useState('small');

  useEffect(() => {
    const localTextScale = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (OPTIONS[localTextScale]) setTextScale(localTextScale);
  }, []);

  useEffect(() => {
    const scale = OPTIONS[textScale];
    if (scale) {
      localStorage.setItem(LOCAL_STORAGE_KEY, textScale);
      document.documentElement.style.setProperty(
        '--article-text-size-scale',
        scale.textScale
      );
    }
  }, [textScale]);

  return (
    <Popover as={PopoverContainer}>
      <Popover.Button as={PopoverButton}>
        {({ open }) => (
          <>
            {open ? <TextBoldIcon /> : <TextIcon />}
            <PopoverButtonText isOpen={open}>Text</PopoverButtonText>
          </>
        )}
      </Popover.Button>
      <Popover.Panel as={PopoverPanel} role="list">
        <PopoverPanelItem
          activeScale={textScale}
          scale="small"
          onClick={setTextScale}
        />
        <PopoverPanelItem
          activeScale={textScale}
          scale="medium"
          onClick={setTextScale}
        />
        <PopoverPanelItem
          activeScale={textScale}
          scale="large"
          onClick={setTextScale}
        />
      </Popover.Panel>
    </Popover>
  );
};

export default TextResize;
