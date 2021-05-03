import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Popover } from '@headlessui/react';

import { useUserContext } from '../../context/user-context';
import { NavWrapper, PromoBottom } from './customerNavStyles';
import cNavConfig from './customerConfig.json';

// TODO: Delete SVG components when wsj-svg library is ready.
import { ReactComponent as BookmarkFilledSmall } from '../../assets/icons/Standard/small/bookmark-filled-small.svg';
import { ReactComponent as CommentFilledSmall } from '../../assets/icons/Standard/small/comment-filled-small.svg';
import { ReactComponent as MailFilledSmall } from '../../assets/icons/Standard/small/mail-filled-small.svg';
import { ReactComponent as MemberFilledSmall } from '../../assets/icons/Standard/small/member-filled-small.svg';
import { ReactComponent as PeopleFilledSmall } from '../../assets/icons/Standard/small/people-filled-small.svg';
import { ReactComponent as PlusCircleStrokeSmall } from '../../assets/icons/Standard/small/plus-circle-stroke-small.svg';
import { ReactComponent as WatchlistFilledSmall } from '../../assets/icons/Standard/small/watchlist-filled-small.svg';

const CxenseWidgetContainer = () => {
  return null;
};

const svgMap = {
  BookmarkFilledSmall,
  CommentFilledSmall,
  MailFilledSmall,
  MemberFilledSmall,
  PeopleFilledSmall,
  PlusCircleStrokeSmall,
  WatchlistFilledSmall,
};

const ContentWrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 0;
  opacity: 0;
  transform: scale(0);
  transform-origin: top right;
  transition-property: transform, opacity;
  transition-duration: 0.2s;
  ${({ isSlim }) => isSlim && 'z-index: 100;'}
  ${({ isOpen }) =>
    isOpen &&
    `
      opacity: 1;
      transform: scale(1);
    `}
`;

const NavButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-family: var(--font-family-retina);
  color: var(--color-nickel);
  cursor: pointer;
  font-size: 12px;
  font-weight: var(--font-weight-regular);

  &:hover {
    color: var(--color-blue);
  }

  &:after {
    content: '';
    width: 0;
    height: 0;
    margin-left: 5px;
    border-width: 5px 3px 0;
    border-style: solid;
    border-color: var(--color-nickel) transparent;
    pointer-events: none;
    display: inline-block;
    position: relative;
    top: -2px;
    margin-right: 3px;
    transition: 250ms;
    ${({ isOpen }) => isOpen && 'transform: rotateX(180deg);'}
  }

  &:hover:after {
    border-color: var(--color-blue) transparent;
  }
`;

const ExpandEscaper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  ${({ isOpen }) => `display: ${isOpen ? 'block' : 'none'};`}
`;

const MenuWrapper = styled.div`
  width: 200px;
  border-color: rgba(0, 0, 0, 0.2);
  background-color: var(--color-white);
  box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.15);
`;

const Menu = styled.ul`
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  border-top: 1px solid var(--color-white);
  border-bottom: 1px solid var(--color-white);
  height: 30px;
  padding-left: 13px;
  margin: 0;
  clear: both;
  text-align: left;
  list-style: none;
  cursor: pointer;
`;

const ItemLink = styled.a`
  display: flex;
  align-items: center;
  line-height: 40px;
  color: var(--color-coal);
  font-size: 12px;
  font-weight: var(--font-weight-regular);

  &&&:hover {
    color: var(--color-blue);
  }
`;

const ItemIcon = styled.svg`
  width: 16px;
  height: 16px;
  display: block;
  opacity: 0.2;

  ${ItemLink}:hover & {
    opacity: 1;
  }
`;

const ItemText = styled.span`
  position: relative;
  left: 12px;
`;

const Footer = styled.ul`
  text-align: center;
  padding: 10px 10px 13px 14px;
  margin: 0;
  list-style: none;
`;

const FooterItem = styled.li`
  &:first-child {
    margin-right: 2px;
  }
`;

const FooterItemLink = styled.a`
  display: flex;
  justify-content: center;
  width: 170px;
  padding: 7px 0;
  border: 1px solid var(--color-silver);
  background-color: var(--color-white);
  font-weight: var(--font-weight-medium);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 15px;

  &&&:hover {
    background: var(--color-coal);
    color: var(--color-white);
  }
`;

const UserMenu = (props) => {
  const { cxense, isSlim, logoutText, region, urls, logoutUrl } = props;

  const { user } = useUserContext();
  const { firstName = '', lastName = '' } = user;
  const menuItemTypes = cNavConfig[region];

  return (
    <Popover>
      {({ open: isOpen }) => (
        <>
          <NavWrapper>
            <Popover.Button as={NavButton} isOpen={isOpen} aria-haspopup="true">
              {firstName} {lastName}
            </Popover.Button>
            <CxenseWidgetContainer options={cxense.notificationCallOut} />
          </NavWrapper>
          <PromoBottom isSlim={isSlim}>
            <CxenseWidgetContainer options={cxense.popup} />
          </PromoBottom>
          <Popover.Overlay as={ExpandEscaper} isOpen={isOpen} />
          <Popover.Panel as={ContentWrapper} isOpen={isOpen} isSlim={isSlim}>
            {urls && menuItemTypes && (
              <MenuWrapper>
                <Menu>
                  {Object.entries(menuItemTypes).map(([key, item]) => (
                    <MenuItem role="none" item={key} key={`m-item-${key}`}>
                      <ItemLink role="menuitem" href={urls[item.urlName]}>
                        <ItemIcon
                          as={svgMap[item?.icon] || BookmarkFilledSmall}
                          viewBox="0 0 15 15"
                        />
                        <ItemText>{item.text}</ItemText>
                      </ItemLink>
                    </MenuItem>
                  ))}
                </Menu>
                <Footer>
                  <FooterItem>
                    <FooterItemLink href={logoutUrl}>
                      {logoutText}
                    </FooterItemLink>
                  </FooterItem>
                </Footer>
              </MenuWrapper>
            )}
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

UserMenu.propTypes = {
  cxense: PropTypes.shape({
    popup: PropTypes.shape({
      divID: PropTypes.string,
      widgetCall: PropTypes.string,
    }),
    notificationCallOut: PropTypes.shape({
      divID: PropTypes.string,
      widgetCall: PropTypes.string,
    }),
  }),
  isSlim: PropTypes.bool,
  logoutText: PropTypes.string,
  region: PropTypes.string,
  logoutUrl: PropTypes.string,
  urls: PropTypes.shape({
    firstName: PropTypes.string, // check if first name is in urls object
    lastName: PropTypes.string,
    headerSubscribeUrl: PropTypes.string /* format: 'uri' */,
    logoutUrl: PropTypes.string /* format: 'uri' */,
    loginUrl: PropTypes.string /* format: 'uri' */,
    customerCenterUrl: PropTypes.string /* format: 'uri' */,
    wsjPlusUrl: PropTypes.string /* format: 'uri' */,
    wsjMemberUrl: PropTypes.string /* format: 'uri' */,
    commentsProfileUrl: PropTypes.string /* format: 'uri' */,
    watchlistUrl: PropTypes.string /* format: 'uri' */,
    alertsUrl: PropTypes.string /* format: 'uri' */,
    savedArticlesUrl: PropTypes.string /* format: 'uri' */,
  }),
};

UserMenu.defaultProps = {
  cxense: {
    popup: {
      divID: 'cx-popup',
    },
    notificationCallOut: {
      divID: 'cx-notification-callout',
    },
  },
  isSlim: false,
  logoutText: '',
  region: 'na,us',
  logoutUrl: '',
  urls: null,
};

export default UserMenu;
