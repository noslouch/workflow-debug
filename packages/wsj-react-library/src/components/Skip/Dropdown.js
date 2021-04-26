/* global document */
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  createRef,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  background-color: var(--color-white);
  padding: 0;
  position: relative;
  font-family: var(--font-family-retina);
`;

const DropdownButton = styled.button`
  background-color: ${({ isExpanded }) =>
    isExpanded ? 'var(--color-white)' : '#e5e5e5'};
  border: 1px solid #e5e5e5;
  border-radius: 0;
  font-size: 12px;
  margin-bottom: 10px;
  padding: 10px;
  position: relative;
  text-align: left;
  width: 100%;

  &:after {
    content: '\\02228';
    color: var(--color-nickel);
    position: relative;
    transform: scaleX(2);
    font-size: 9px;
    display: block;
    right: 5px;
    float: right;
  }

  &:hover {
    cursor: pointer;
  }
`;

const DropdownList = styled.ul`
  border: 1px solid #e5e5e5;
  height: 100px;
  list-style: none;
  margin: 0;
  overflow-y: scroll;
  padding: 0;
  display: ${({ isExpanded }) => (isExpanded ? 'block' : 'none')};
`;

const DropdownListItem = styled.li`
  ${({ isSelected }) => isSelected && 'background-color: #e5e5e5;'}
  box-sizing: border-box;
  display: inline-block;
  font-size: 12px;
  font-weight: 300;
  padding: 5px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
    background-color: #e5e5e5;
  }
`;

const KEY_CODES = {
  DOWN_ARROW: 40,
  ENTER: 13,
  ESCAPE: 27,
  TAB: 9,
  UP_ARROW: 38,
};

const NAVIGATION_KEYS = [
  KEY_CODES.ESCAPE,
  KEY_CODES.UP_ARROW,
  KEY_CODES.DOWN_ARROW,
];

const Dropdown = ({ landmarks, handleSelect }) => {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [listItemRefs, setListItemRefs] = useState([]);

  const closeDropdown = (shouldFocus = false) => {
    setOpen(false);
    if (shouldFocus && buttonRef) {
      buttonRef.current.focus();
    }
  };

  const focusElement = useCallback(() => {
    const element = listItemRefs[selectedIndex];
    if (element) {
      element.current.focus();
      element.current.scrollIntoView({ block: 'center' });
    }
  }, [listItemRefs, selectedIndex]);

  useEffect(() => {
    const onClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener('mouseup', onClick, false);
    document.addEventListener('touchend', onClick, false);

    return () => {
      document.removeEventListener('mouseup', onClick);
      document.removeEventListener('touchend', onClick);
    };
  }, []);

  useEffect(() => {
    // add or remove refs
    setListItemRefs((refs) =>
      Array(landmarks.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [landmarks.length]);

  useEffect(() => {
    focusElement(selectedIndex);
  }, [selectedIndex, focusElement]);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const setSelected = (index) => {
    handleSelect(index);
    closeDropdown();
    setSelectedIndex(index);
    if (listItemRefs[index]) listItemRefs[index].current.focus();
  };

  const onNavigation = (keyCode) => {
    switch (keyCode) {
      case KEY_CODES.UP_ARROW:
        if (selectedIndex === -1) {
          setSelectedIndex(0);
        } else if (selectedIndex === 0) {
          setSelectedIndex(listItemRefs.length - 1);
        } else {
          setSelectedIndex(selectedIndex - 1);
        }
        break;
      case KEY_CODES.DOWN_ARROW:
        setSelectedIndex((selectedIndex + 1) % listItemRefs.length);
        break;
      case KEY_CODES.ESCAPE:
        closeDropdown(true);
        break;
      default:
        break;
    }
  };

  const onKeyDown = (event) => {
    const { keyCode } = event;
    if (NAVIGATION_KEYS.indexOf(keyCode) !== -1) {
      event.preventDefault();
      if (open) onNavigation(keyCode);
    } else if (keyCode === KEY_CODES.TAB) {
      closeDropdown();
    }
  };

  return (
    <DropdownContainer onKeyDown={onKeyDown} ref={containerRef}>
      <DropdownButton
        aria-haspopup="listbox"
        aria-expanded={open}
        isExpanded={open}
        onClick={toggleDropdown}
        ref={buttonRef}
      >
        {selectedIndex >= 0 && landmarks[selectedIndex]
          ? landmarks[selectedIndex].label
          : 'Select'}
      </DropdownButton>
      <DropdownList
        isExpanded={open}
        tabIndex={-1}
        role="listbox"
        aria-labelledby="skipDropdownLabel"
      >
        {landmarks.map((landmark, index) => {
          return (
            <DropdownListItem
              key={landmark.target}
              ref={listItemRefs[index]}
              tabIndex={-1}
              isSelected={selectedIndex === index}
              role="option"
              aria-selected={selectedIndex === index}
              onClick={() => setSelected(index)}
              onKeyDown={(e) =>
                e &&
                (e.which === 13 || e.keyCode === 13 || e.key === 'Enter') &&
                setSelected(index)
              }
            >
              {landmark.label}
            </DropdownListItem>
          );
        })}
      </DropdownList>
    </DropdownContainer>
  );
};

Dropdown.propTypes = {
  handleSelect: PropTypes.func,
  landmarks: PropTypes.arrayOf(
    PropTypes.shape({
      target: PropTypes.string,
      label: PropTypes.string,
    })
  ),
};

Dropdown.defaultProps = {
  handleSelect: () => {},
  landmarks: [],
};

export default Dropdown;
