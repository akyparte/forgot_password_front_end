import Login from "./components/login";
import SignUp from "./components/signup";
import ForgotPassword from "./components/forgot";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import SecretData from "./components/details";
import Message from "./components/message";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/secret-data" element={<SecretData />}></Route>
        <Route path="/pass-ch-tem" element={<Message />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
