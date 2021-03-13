import { createContext } from "react";

type AuthContextState = {
  token: string;
  userId: string;
  login: (jwtToken: string, id: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const authContextDefaultValues: AuthContextState = {
  token: "",
  userId: "",
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextState>(authContextDefaultValues);

export default AuthContext;
