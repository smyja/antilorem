import React from "react";
import logo from "./logo.svg";
import { LandingPage } from "./components/Landingpage";
import Demo from "./components/Demo";
import { Routes, Route, Navigate, Router } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route exact path="demo" element={<Demo />} />
    </Routes>
  );
}

export default App;
