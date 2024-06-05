import React, {
  useEffect,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import Cookies from "js-cookie";

// Define the type structure for a hamburger
export type Hamburger = {
  isOpen: boolean;
};

// Define the structure of the HamburgerContext
export interface HamburgerContextInterface {
  hamburgerData: Hamburger;
  setHamburger: Dispatch<SetStateAction<Hamburger>>;
}

// Define the default state for the HamburgerContext
const defaultState: HamburgerContextInterface = {
  hamburgerData: {
    isOpen: false,
  },
  setHamburger: () => {}, // This function doesn't do anything by default
};

// Create the HamburgerContext using createContext
export const HamburgerContext = createContext(defaultState);

export function HamburgerProvider({ children }: { children: React.ReactNode }) {
  const [hamburger, setHamburger] = useState<Hamburger>(() => {
    const storedHamburger = Cookies.get("hamburgerData");
    return storedHamburger
      ? JSON.parse(storedHamburger)
      : defaultState.hamburgerData;
  });

  useEffect(() => {
    Cookies.set("hamburgerData", JSON.stringify(hamburger));
  }, [hamburger]);

  return (
    <HamburgerContext.Provider
      value={{ hamburgerData: hamburger, setHamburger }}
    >
      {children}
    </HamburgerContext.Provider>
  );
}
