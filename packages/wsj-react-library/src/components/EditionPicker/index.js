import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { setCookie } from '../../cookies';
import { ReactComponent as ChevronDownSmall } from '../../assets/icons/Standard/small/chevron-down-small.svg';
import { ReactComponent as ChevronUpSmall } from '../../assets/icons/Standard/small/chevron-up-small.svg';

const EditionPickerWrapper = styled.div`
  cursor: pointer;
  position: ${({ placement }) => (placement === 'footer' ? 'relative' : '')};
  display: flex;
  ${({ placement }) =>
    placement == 'footer' &&
    `
    opacity: 1;
    margin: 15px 14px 0;
    border-right: 0;
    font-size: 13px;
    background-color: transparent;
    }
`};
`;

const EditionDropDown = styled.span`
  a:active,
  a:link,
  a:visited {
    color: inherit;
    text-decoration: none;
    outline: none;
  }
`;

const DropDownIcon = styled.span`
  position: absolute;
  width: 12px;
  right: 18px;
  top: 0px;
  height: 12px;
`;

const SelectedEdition = styled.span`
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: ${({ placement }) =>
    placement === 'footer' ? '25px' : '12px'};
  outline: none;
`;

const ExpandEscaper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: transparent;
  width: 100vw;
  height: 100vh;
  display: ${({ editionPickerExpanded }) =>
    editionPickerExpanded ? 'block' : 'none'};
`;

const EditionPickerUl = styled.ul`
  border: 1px solid #ccc;
  max-height: 400px;
  padding: 0;
  box-sizing: border-box;
  margin-top: 5px;
  position: absolute;
  right: ${({ placement }) => (placement === 'footer' ? '-1px' : '-13px')};
  background: #fff;
  overflow: hidden;
  z-index: 90;
  width: 125px;
  list-style: none;
  visibility: ${({ editionPickerExpanded }) =>
    editionPickerExpanded ? null : 'hidden'};

  a:hover {
    text-decoration: none;
    color: #0080c3;
  }

  /* accessibility improvement: to ensure that outline is not clipped when element is in focus */
  a:focus {
    outline: #0080c3 solid 3px;
    outline-offset: -2px;
  }
`;

const EditionItemButton = styled.button`
  background-color: ${({ highlighted }) =>
    highlighted ? '#f9f9f9' : '#ffffff'};
  border: none;
  width: 100%;
  padding: 8px 12px;
  display: block;
  text-align: left;
  font-size: 11px;
  line-height: 10px;
  cursor: pointer;

  :hover {
    color: #0080c3;
  }
`;
function EditionPicker({
  currentEditionLabel,
  placement,
  homepages,
  region,
  tagName: TagName,
}) {
  const editionPickerRef = useRef(null);
  const [editionPickerExpanded, setEditionPickerExpanded] = useState(false);

  function closeEditionPickerViaKeyboard(e) {
    /* accessibility feature - enables the Edition Picker menu to be closed via keyboard
     *  by checking for the ref; if the user tabs outside of the Edition Picker, editionPickerExpanded
     *  will set to false, hiding the menu, and the event listener will be removed.
     */
    if (editionPickerRef?.current?.contains(e.relatedTarget)) return;
    setEditionPickerExpanded(false);
  }

  function handleEditionChange(url) {
    toggleEditionPicker();
    setCookie('wsjregion', region);
    document.location.href = url;
  }

  function toggleEditionPicker(e) {
    if (!e || (e && e.keyCode && e.keyCode !== 13)) return;
    setEditionPickerExpanded(!editionPickerExpanded);
  }

  return (
    <EditionPickerWrapper
      placement={placement}
      onKeyUp={toggleEditionPicker}
      ref={editionPickerRef}
      onClick={toggleEditionPicker}
    >
      <EditionDropDown
        as={TagName}
        editionPickerExpanded={editionPickerExpanded}
        placement={placement}
        data-testid="expandEscaper"
      >
        <ExpandEscaper
          editionPickerExpanded={editionPickerExpanded}
          onClick={toggleEditionPicker}
        />
        <SelectedEdition
          data-testid="selectedEdition"
          role="button"
          tabIndex="0"
          placement={placement}
          id={`selected-edition-${placement}`}
          aria-haspopup="true"
          aria-expanded={editionPickerExpanded}
          aria-controls={`edition-picker-${placement}`}
        >
          {currentEditionLabel}
          <EditionPickerUl
            id={`edition-picker-${placement}`}
            aria-labelledby={`selected-edition-${placement}`}
            role="menu"
            editionPickerExpanded={editionPickerExpanded}
            placement={placement}
          >
            {homepages.map((item) => (
              <li key={item.region} role="none">
                <EditionItemButton
                  onClick={() => handleEditionChange(item.url)}
                  onBlur={closeEditionPickerViaKeyboard}
                  role="menuitem"
                  highlighted={item.isCurrentRegion}
                >
                  {item.chineseLabel || item.label}
                </EditionItemButton>
              </li>
            ))}
          </EditionPickerUl>
        </SelectedEdition>
      </EditionDropDown>
      <DropDownIcon>
        {editionPickerExpanded ? <ChevronUpSmall /> : <ChevronDownSmall />}
      </DropDownIcon>
    </EditionPickerWrapper>
  );
}

EditionPicker.propTypes = {
  currentEditionLabel: PropTypes.string,
  homepages: PropTypes.arrayOf(
    PropTypes.shape({
      chineseLabel: PropTypes.string,
      label: PropTypes.string,
      region: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  placement: PropTypes.oneOf(['header', 'footer']),
  region: PropTypes.oneOf(['na,us', 'asia,cn', 'asia,jp', 'asia,cn_hant']),
  tagName: PropTypes.string,
};

EditionPicker.defaultProps = {
  currentEditionLabel: 'English Edition',
  homepages: [
    {
      label: 'English',
      region: 'na,us',
      url: 'https://www.wsj.com',
    },
  ],
  placement: 'footer',
  region: 'na,us',
  tagName: 'div',
};

export default EditionPicker;
