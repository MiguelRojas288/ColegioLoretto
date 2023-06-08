import React, { Suspense } from "react";

// ** Router Import
import Router from "./router/Router";
import { Provider } from "./views/context/Provider"

const App = () => {
  return (
    <Provider>
      <Suspense fallback={null}>
        <Router />
      </Suspense>
    </Provider>
  );
};

export default App;
