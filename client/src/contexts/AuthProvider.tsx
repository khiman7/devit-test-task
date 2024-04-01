import {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
  useMemo,
} from 'react';

import { verifyAccessToken } from '../services/auth.service';
import { STORAGE_KEYS } from '../constants';

export interface IAuthContext {
  isAuthenticated: boolean;
  username: string | null;
  login(token: string): Promise<void>;
  logout(): void;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  username: null,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const { payload } = await verifyAccessToken();
        setIsAuthenticated(true);
        setUsername(payload.username);
      } catch (error) {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        setIsAuthenticated(false);
        setUsername(null);
      }
    }

    checkAuthentication();
  }, []);

  async function login(token: string) {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    const { payload } = await verifyAccessToken();
    setIsAuthenticated(true);
    setUsername(payload.username);
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    setIsAuthenticated(false);
    setUsername(null);
  }

  const contextValue: IAuthContext = useMemo(
    () => ({
      isAuthenticated,
      username,
      login,
      logout,
    }),
    [isAuthenticated, username]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
