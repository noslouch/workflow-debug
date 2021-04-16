import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ProfileIcon } from '../../assets/icons/Actionables/medium/profile-stroke-medium.svg';
import { ReactComponent as TwitterIcon } from '../../assets/icons/Social/twitter-color-medium.svg';
import { ReactComponent as FacebookIcon } from '../../assets/icons/Social/facebook-color-medium.svg';
import { ReactComponent as MailIcon } from '../../assets/icons/Actionables/medium/mail-stroke-medium.svg';

const AuthorContainer = styled.div`
  display: inline;
  position: relative;
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

const Dropdown = styled.div`
  background: #fff;
  border: 1px solid var(--color-silver);
  padding: 12px 14px;
  position: fixed;
  left: 4px;
  right: 4px;
  z-index: 99;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  @media (min-width: 640px) {
    position: absolute;
    left: 0;
    right: unset;
  }
`;

const DropdownListItem = styled.li`
  font-family: var(--font-family-retina-narrow);
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 32px;
`;

const DropdownListItemLink = styled.a`
  align-items: center;
  color: var(--color-nickel);
  display: flex;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    color: var(--color-jet);
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
      <AuthorLink href={`${authorUrl}${id}`} aria-label={`Author page for ${text}`}>
        {text}
      </AuthorLink>
    );
  let timeoutId = null;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const onClickHandler = () => setIsDropdownOpen(!isDropdownOpen);
  const onFocusHandler = () => clearTimeout(timeoutId);
  const onBlurHandler = () => (timeoutId = setTimeout(() => setIsDropdownOpen(false)));
  return (
    <AuthorContainer onFocus={onFocusHandler} onBlur={onBlurHandler}>
      <AuthorButton
        onClick={onClickHandler}
        aria-expanded={isDropdownOpen}
        aria-label={`Author information for ${text}`}
      >
        {text}
      </AuthorButton>
      {isDropdownOpen && (
        <Dropdown>
          <ul>
            <DropdownListItem>
              <DropdownListItemLink href={`${authorUrl}${id}`}>
                <ProfileIcon /> Biography
              </DropdownListItemLink>
            </DropdownListItem>
            {twitterHandle && (
              <DropdownListItem>
                <DropdownListItemLink
                  href={`https://www.twitter.com/${twitterHandle}`}
                  target="blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon aria-label="Twitter profile" /> {`@${twitterHandle}`}
                </DropdownListItemLink>
              </DropdownListItem>
            )}
            {facebookAccount && (
              <DropdownListItem>
                <DropdownListItemLink
                  href={`https://www.facebook.com/${facebookAccount}`}
                  target="blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon aria-label="Facebook profile" /> {facebookAccount}
                </DropdownListItemLink>
              </DropdownListItem>
            )}
            {emailAddress && (
              <DropdownListItem>
                <DropdownListItemLink href={`mailto:${emailAddress}`}>
                  <MailIcon aria-label="Email" /> {emailAddress}
                </DropdownListItemLink>
              </DropdownListItem>
            )}
          </ul>
        </Dropdown>
      )}
    </AuthorContainer>
  );
};

export default Author;
