import React from 'react';
import { Popover } from '@headlessui/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { setCookie } from '../../cookies';
import { ReactComponent as ChevronDownSmall } from '../../assets/icons/Standard/small/chevron-down-small.svg';
import { ReactComponent as ChevronUpSmall } from '../../assets/icons/Standard/small/chevron-up-small.svg';

const Wrapper = styled.div`
  font-family: var(--font-font-stack-retina);
  font-weight: 400;
  font-size: var(--typography-flashline-font-size-m);
  line-height: 10px;
`;

const Flyout = styled.ul`
  border: 1px solid var(--color-silver);
  background: #fff;

  padding: 0;
  margin: 0;
  list-style: none;
`;

const Link = styled.a`
  display: block;
  padding: var(--spacing-spacer-8) var(--spacing-spacer-12);

  ${({ $current }) =>
    $current &&
    `
    background-color: #f9f9f9;
  `}

  color: inherit;
  text-decoration: none;
  outline: none;

  :focus {
    outline: #0080c3 solid 3px;
    outline-offset: -2px;
  }

  :hover {
    text-decoration: none;
    color: #0080c3; // need a token for this
  }
`;

const Button = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-family: inherit;
  appearance: none;
  background: transparent;
  border: none;
  cursor: pointer;

  > svg {
    margin-left: 5px;
  }
`;

export default function EditionPicker({
  currentEditionLabel,
  homepages,
  className,
}) {
  return (
    <Popover as={Wrapper} className={className}>
      <Popover.Button as={Button} aria-label="WSJ Edition Picker">
        {({ open }) => (
          <>
            {currentEditionLabel}{' '}
            {open ? <ChevronUpSmall /> : <ChevronDownSmall />}
          </>
        )}
      </Popover.Button>
      <Popover.Panel as={Flyout}>
        {homepages.map((item) => (
          <li key={item.region}>
            <Link
              $current={item.isCurrentRegion}
              onClick={() => setCookie(item.region)}
              href={item.url}
            >
              {item.chineseLabel || item.label}
            </Link>
          </li>
        ))}
      </Popover.Panel>
    </Popover>
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
