import { createRoot } from "react-dom/client";
import "./assets/css/index.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import App from "./App";
import { HamburgerProvider } from "./context/HamburgerContext";

// import { UserProvider } from "./context/AuthContext";

const rootElement = document.getElementById("root") as HTMLElement;
if (rootElement) {
  createRoot(rootElement).render(
    //     <UserProvider>
    <MantineProvider>
      <HamburgerProvider>
        <App />
      </HamburgerProvider>
    </MantineProvider>
    //     </UserProvider>
  );
}
