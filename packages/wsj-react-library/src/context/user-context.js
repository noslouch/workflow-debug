import React, { useContext, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();
UserContext.displayName = 'UserContext';

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

const UserProvider = ({ children, user }) => {
  const value = useMemo(
    () => ({ user, isLoggedIn: user?.status === 'user_logged_in' }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    status: PropTypes.string,
    abBucket: PropTypes.number,
    bucket: PropTypes.number,
    profiles: PropTypes.shape({
      account: PropTypes.shape({
        subscriberStatus: PropTypes.string,
      }),
      onboardingProfile: PropTypes.shape({
        interests: PropTypes.arrayOf(PropTypes.string),
      }),
      wsjregion: PropTypes.string,
      site: PropTypes.string,
      type: PropTypes.string,
      experience: PropTypes.string,
      region: PropTypes.shape({
        wsjregion: PropTypes.string,
        mobileclient: PropTypes.bool,
      }),
      access: PropTypes.shape({
        fullAccess: PropTypes.bool,
        fullArticle: PropTypes.bool,
        vetoFree: PropTypes.bool,
      }),
      documentKey: PropTypes.string,
      commentingAllowed: PropTypes.bool,
    }),
  }),
};

export { useUserContext, UserProvider };
