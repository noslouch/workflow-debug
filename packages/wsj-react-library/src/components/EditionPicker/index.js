import React from 'react';
import { Popover } from '@headlessui/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { setCookie } from '../../cookies';
import { ReactComponent as Arrow } from '../../assets/icons/Standard/small/arrow-down-filled-small.svg';

const Wrapper = styled.div`
  position: relative;
  font-family: var(--font-font-stack-retina);
  font-weight: var(--font-weight-light);
  font-size: 12px;
  line-height: 1.16;
`;

const Flyout = styled.ul`
  position: absolute;
  width: 125px;
  text-align: left;
  border: 1px solid var(--color-silver);
  background: var(--color-white);
  padding: 0;
  margin: 5px 0;
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

  :hover {
    text-decoration: none;
    color: var(--color-dark-blue);
  }
`;

const Button = styled.button`
  font-weight: inherit;
  font-family: inherit;
  font-size: inherit;
  width: 100%;
  padding-top: 0;
  padding-bottom: 0;
  display: flex;
  align-items: center;
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
            <Arrow style={{ transform: open ? 'rotate(180deg)' : '' }} />
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
  className: PropTypes.string,
  currentEditionLabel: PropTypes.string,
  homepages: PropTypes.arrayOf(
    PropTypes.shape({
      chineseLabel: PropTypes.string,
      label: PropTypes.string,
      region: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

EditionPicker.defaultProps = {
  className: '',
  currentEditionLabel: 'English Edition',
  homepages: [
    {
      label: 'English',
      region: 'na,us',
      url: 'https://www.wsj.com',
    },
  ],
};
