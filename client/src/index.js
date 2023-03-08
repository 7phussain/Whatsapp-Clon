import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/style.css";
import "./styles/globals.css"
import Main from "./pages/app";
import Login from "./pages/index";
import SignUp from "./pages/signUp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/app" element={<Main />} />
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />

      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);