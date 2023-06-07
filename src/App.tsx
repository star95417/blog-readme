import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthContextProvider from "./context/AuthContextProvider";
import { Header } from "./components/Header";
import { Blog } from "./components/Blog";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Create } from "./components/Create";

import "./App.css";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/dashboard" element={<Blog />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
