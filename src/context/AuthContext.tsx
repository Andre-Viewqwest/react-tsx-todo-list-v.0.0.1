import React, {
  useEffect,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import Cookies from "js-cookie";

// Define the type structure for a user
export type User = {
  token: string;
};

// Define the structure of the UserContext
export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

// Define the default state for the UserContext
const defaultState: UserContextInterface = {
  user: {
    token: "",
  },
  setUser: () => {}, // This function doesn't do anything by default
};

// Create the UserContext using createContext
export const UserContext = createContext(defaultState);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    const storedUser = Cookies.get("user");
    return storedUser ? JSON.parse(storedUser) : defaultState.user;
  });

  useEffect(() => {
    Cookies.set("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
