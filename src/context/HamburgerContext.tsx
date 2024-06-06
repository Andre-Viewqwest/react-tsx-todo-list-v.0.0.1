import React, {
  useEffect,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import Cookies from "js-cookie";

// Define the type structure for a hamburger menu state
export type Hamburger = {
  isOpen: boolean; // This indicates whether the hamburger menu is open
};

// Define the structure of the HamburgerContext
export interface HamburgerContextInterface {
  hamburger: Hamburger; // The state object representing the hamburger menu state
  setHamburger: Dispatch<SetStateAction<Hamburger>>; // Function to update the hamburger state
}

// Define the default state for the HamburgerContext
const defaultState: HamburgerContextInterface = {
  hamburger: {
    isOpen: false, // The default value for the isOpen property
  },
  setHamburger: () => {}, // This function doesn't do anything by default
};

// Create the HamburgerContext using createContext
export const HamburgerContext = createContext(defaultState);

export function HamburgerProvider({ children }: { children: React.ReactNode }) {
  // Initialize hamburger state with the value from cookies or default state
  const [hamburger, setHamburger] = useState<Hamburger>(() => {
    const storedHamburger = Cookies.get("hamburger"); // Retrieve the hamburger state from cookies
    return storedHamburger
      ? JSON.parse(storedHamburger)
      : defaultState.hamburger; // Parse and return if found, else return default
  });

  // Use useEffect to update cookies whenever the hamburger state changes
  useEffect(() => {
    Cookies.set("hamburger", JSON.stringify(hamburger)); // Store the updated hamburger state in cookies
  }, [hamburger]);

  // Provide the hamburger state and setHamburger function to the context
  return (
    <HamburgerContext.Provider value={{ hamburger, setHamburger }}>
      {children} {/* Render the children components */}
    </HamburgerContext.Provider>
  );
}
