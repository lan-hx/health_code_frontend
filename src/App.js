import React from 'react';
import HealthCodeMain from "./pages/HealthCodeMain";
import store from "./redux/store";
import {Provider} from "react-redux";

function App() {
  return (
   <Provider store={store}>
    <HealthCodeMain />
   </Provider>
  );
}

export default App;
