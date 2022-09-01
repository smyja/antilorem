import React from "react";
import logo from "./logo.svg";
import { LandingPage } from "./components/Landingpage";
import Demo from "./components/Demo";
import Questiongen from "./components/Questions";
import Qgen from "./components/Qgen";
import Ho from "./components/ho";
import { Routes, Route, Navigate, Router } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route exact path="demo" element={<Demo />} />
      <Route exact path="questiongen" element={<Questiongen />} />
      <Route exact path="qgen" element={<Qgen />} />
      <Route exact path="ho" element={<Ho />} />
    </Routes>
  );
}

export default App;
