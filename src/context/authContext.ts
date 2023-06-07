import { createContext } from "react";

export interface AuthContextData {
  username: string;
  setUsername: (username: string) => void;
  clearUsername: () => void;
}

export const AuthContext = createContext<AuthContextData>({
  username: "",
  setUsername: () => {},
  clearUsername: () => {},
});
