import {
  useState,
  createContext,
  ReactNode,
  ReactElement,
  useContext,
} from 'react';

interface IProps {
  children: ReactNode;
}

export function AuthProvider({ children }: IProps): ReactElement {
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

type AuthContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

const IAuthContextType = {
  token: null,
  setToken: () => undefined,
};

export const AuthContext = createContext<AuthContextType>(IAuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};
