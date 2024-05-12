import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Authentication/Login/Login";
import Signup from "./pages/Authentication/SignUp/SignUp";
import Dashboard from "./pages/Authentication/Dashboard/Dashboard";
import ProtectedRoute from "./lib/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<ProtectedRoute Children={Login} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard?/:id" element={<ProtectedRoute Children={Dashboard} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
