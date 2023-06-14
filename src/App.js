import React from 'react';
import HealthCodeMain from "./pages/HealthCodeMain";
import store from "./redux/store";
import {Provider} from "react-redux";
import {CookiesProvider} from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <HealthCodeMain/>
      </Provider>
    </CookiesProvider>
  );
}

export default App;
