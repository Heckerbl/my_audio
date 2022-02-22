// from react
import React from "react";
import ReactDOM from "react-dom";

// components
import App from "./App";

// contex
import Context from "./context";

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);
