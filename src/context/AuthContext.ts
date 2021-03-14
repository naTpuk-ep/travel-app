import { createContext } from "react";

type AuthContextState = {
  token: string;
  userId: string;
  name: string;
  userImage: string[];
  login: (
    jwtToken: string,
    id: string,
    userName: string,
    image: string[]
  ) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const authContextDefaultValues: AuthContextState = {
  token: "",
  userId: "",
  name: "",
  userImage: [""],
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextState>(authContextDefaultValues);

export default AuthContext;
