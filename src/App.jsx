import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/login.jsx";
import Signup from "./components/Signup.jsx";
import CurrencyExchanger from "./components/CurrencyExchanger";

import "./assets/css/style.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/currency" element={<CurrencyExchanger />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;