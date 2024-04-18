/* eslint-disable react-refresh/only-export-components */
import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { LayoutSplashScreen } from '../../../../_metronic/layout/core';
import { AuthModel, UserByIdProps, UserModel } from './_models';
import * as authHelper from './AuthHelpers';
import { getUserById, getUserByToken } from './_requests';
import { WithChildren } from '../../../../_metronic/helpers';
import { getSubscriptionStatus } from '../../../../_metronic/helpers/subscriptions-helpers/SubscriptionsHelpers';

type AuthContextProps = {
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: UserByIdProps | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserByIdProps | undefined>>;
  logout: () => void;
  facebookAuthCode: string;
  setFacebookAuthCode: Dispatch<SetStateAction<string>>;
  isSubscriptionActive: boolean;
  setIsSubscriptionActive: Dispatch<SetStateAction<boolean>>;
};

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
  facebookAuthCode: '',
  setFacebookAuthCode: () => {},
  isSubscriptionActive: false,
  setIsSubscriptionActive: () => {},
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const storedAuthLogin = localStorage.getItem('authLogin');
  const storedCurrentUser = localStorage.getItem('currentUser');
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<UserByIdProps | undefined>(
    storedCurrentUser ? JSON.parse(storedCurrentUser) : undefined
  );
  const [facebookAuthCode, setFacebookAuthCode] = useState<string>('');
  const [isSubscriptionActive, setIsSubscriptionActive] =
    useState<boolean>(false);

  useEffect(() => {
    const subscriptionStatus = currentUser?.subscription?.status;
    const statusIsActive = getSubscriptionStatus(subscriptionStatus);

    setIsSubscriptionActive(statusIsActive);
  }, [currentUser?.subscription?.status]);

  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
    setFacebookAuthCode('');
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        saveAuth,
        currentUser,
        setCurrentUser,
        logout,
        facebookAuthCode,
        setFacebookAuthCode,
        isSubscriptionActive,
        setIsSubscriptionActive,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, currentUser, logout, setCurrentUser } = useAuth();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const jwtToken = auth?.accessToken;
    const userId = auth?.userId;
    const requestUser = async (jwtToken: string) => {
      try {
        if (!currentUser && jwtToken && userId) {
          const { data } = await getUserById(userId, jwtToken);
          if (data) {
            setCurrentUser(data);
          }
        }
      } catch (error) {
        console.error(error);
        if (currentUser) {
          logout();
        }
      } finally {
        setShowSplashScreen(false);
      }
    };

    if (auth && jwtToken) {
      requestUser(jwtToken);
    } else {
      logout();
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

export { AuthProvider, AuthInit, useAuth };
