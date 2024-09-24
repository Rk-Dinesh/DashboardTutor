import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//import "simplebar-react/dist/simplebar.min.css";
//import "flatpickr/dist/themes/light.css";
import "../src/assets/scss/app.scss";
import { Provider } from "react-redux";
import store from "./store";


ReactDOM.createRoot(document.getElementById("root")).render(
  <>
   
      <Provider store={store}>
        <App />
      </Provider>
   
  </>
);
