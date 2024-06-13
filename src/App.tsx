import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserContext } from "./context/AuthContext";
import routerConfig from "./router";

const App: React.FC = () => {
  const { user } = useContext(UserContext);
  let selectedRoute = "auth";
  // let selectedRoute = "admin";
  const routingConfig = routerConfig[selectedRoute];
  return (
    <BrowserRouter>
      <Routes>
        {routingConfig.map((route, index) => (
          <Route key={index} path={route.path} element={route.element}>
            {route.children &&
              route.children.map((childRoute, childIndex) => (
                <Route
                  key={childIndex}
                  path={childRoute.path}
                  element={childRoute.element}
                >
                  {childRoute.children &&
                    childRoute.children.map((nestedRoute, nestedIndex) => (
                      <Route
                        key={nestedIndex}
                        path={nestedRoute.path}
                        element={nestedRoute.element}
                      />
                    ))}
                </Route>
              ))}
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
