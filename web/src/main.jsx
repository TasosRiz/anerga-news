/**

* Σημείο εκκίνησης της React εφαρμογής.
* Δημιουργεί το root element, ενεργοποιεί το Strict Mode,
* προσθέτει το BrowserRouter για τη διαχείριση των routes
* και αποδίδει το κεντρικό component App.
  */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./Components/common/Auth/provider/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Παρέχει σε όλα τα components πρόσβαση σε user, token, login και logout. */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);