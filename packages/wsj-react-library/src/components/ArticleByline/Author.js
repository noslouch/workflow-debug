import React from 'react';
import { Popover } from '@headlessui/react';
import styled from 'styled-components';

import { ReactComponent as ProfileIcon } from '../../assets/icons/Actionables/medium/profile-stroke-medium.svg';
import { ReactComponent as TwitterIcon } from '../../assets/icons/Social/twitter-color-medium.svg';
import { ReactComponent as FacebookIcon } from '../../assets/icons/Social/facebook-color-medium.svg';
import { ReactComponent as MailIcon } from '../../assets/icons/Actionables/medium/mail-stroke-medium.svg';

const AuthorContainer = styled.div`
  display: inline;
`;

const AuthorButton = styled.button`
  background: transparent;
  border: 0;
  color: #0080c3;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  text-decoration: underline;

  &:hover {
    cursor: pointer;
  }
`;

const AuthorLink = styled.a`
  color: #0080c3;
`;

const Dropdown = styled.ul`
  background: #fff;
  border: 1px solid var(--color-silver);
  padding: 12px 14px;

  list-style: none;
  margin: 0;
`;

const DropdownListItemLink = styled.a`
  align-items: center;
  color: var(--color-nickel);
  display: flex;
  text-decoration: none;
  text-transform: uppercase;

  font-family: var(--font-family-retina-narrow);
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 32px;

  &:hover {
    color: var(--color-jet);
  }

  :focus {
    outline: #0080c3 solid 3px;
    outline-offset: -2px;
  }

  svg {
    margin-right: 12px;
  }
`;

const Author = ({ authorUrl = '/news/author/', data, isAmp = false }) => {
  const { id, emailAddress, facebookAccount, text, twitterHandle } = data || {};
  if (!text) return null;
  if (isAmp)
    return (
      <AuthorLink
        href={`${authorUrl}${id}`}
        aria-label={`Author page for ${text}`}
      >
        {text}
      </AuthorLink>
    );
  return (
    <Popover as={AuthorContainer}>
      <Popover.Button
        as={AuthorButton}
        aria-label={`Author information for ${text}`}
      >
        {text}
      </Popover.Button>

      <Popover.Panel as={Dropdown}>
        <li>
          <DropdownListItemLink href={`${authorUrl}${id}`}>
            <ProfileIcon /> Biography
          </DropdownListItemLink>
        </li>

        {twitterHandle && (
          <li>
            <DropdownListItemLink
              href={`https://www.twitter.com/${twitterHandle}`}
              target="blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon aria-label="Twitter profile" /> {`@${twitterHandle}`}
            </DropdownListItemLink>
          </li>
        )}

        {facebookAccount && (
          <li>
            <DropdownListItemLink
              href={`https://www.facebook.com/${facebookAccount}`}
              target="blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon aria-label="Facebook profile" /> {facebookAccount}
            </DropdownListItemLink>
          </li>
        )}

        {emailAddress && (
          <li>
            <DropdownListItemLink href={`mailto:${emailAddress}`}>
              <MailIcon aria-label="Email" /> {emailAddress}
            </DropdownListItemLink>
          </li>
        )}
      </Popover.Panel>
    </Popover>
  );
};

export default Author;
