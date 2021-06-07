import PropTypes from 'prop-types';
import styled from 'styled-components';

import { NavWrapper, PromoBottom } from './customerNavStyles';

const CxenseWidgetContainer = () => {
  return null;
};

const SubscribeOptionWrapper = styled.div`
  border-right: 1px solid var(--color-silver);
  padding: 6px 8px 6px;
`;

const LoginOptionWrapper = styled.div`
  padding-left: 8px;
  padding-top: 6px;
  padding-bottom: 6px;
  align-self: end;
`;

const OptionLink = styled.a`
  cursor: pointer;
  line-height: 16px;
  white-space: nowrap;

  &:active,
  :link,
  :visited {
    color: var(--color-nickel);
    text-decoration: none;
  }

  &&&:hover {
    text-decoration: none;
    color: var(--color-blue);
  }
`;

const UserLogin = (props) => {
  const {
    cxensePopup,
    headerSubscribeUrl,
    loginText,
    subscribeText,
    loginUrl,
    isScrolled,
  } = props;

  return (
    <>
      <NavWrapper>
        <SubscribeOptionWrapper>
          <OptionLink href={headerSubscribeUrl} rel="nofollow">
            {subscribeText}
          </OptionLink>
        </SubscribeOptionWrapper>
        <LoginOptionWrapper>
          <OptionLink href={loginUrl}>{loginText}</OptionLink>
        </LoginOptionWrapper>
      </NavWrapper>
      <PromoBottom isScrolled={isScrolled}>
        <CxenseWidgetContainer options={cxensePopup} />
      </PromoBottom>
    </>
  );
};

UserLogin.propTypes = {
  cxensePopup: PropTypes.shape({
    divID: PropTypes.string,
    widgetCall: PropTypes.string,
  }),
  headerSubscribeUrl: PropTypes.string,
  loginText: PropTypes.string,
  subscribeText: PropTypes.string,
  loginUrl: PropTypes.string,
  isScrolled: PropTypes.bool,
};

UserLogin.defaultProps = {
  cxensePopup: {
    popup: {
      divID: 'cx-popup',
    },
  },
  headerSubscribeUrl: '',
  loginText: '',
  subscribeText: '',
  loginUrl: '',
  isScrolled: false,
};

export default UserLogin;
