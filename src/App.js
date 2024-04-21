import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import { SignIn } from "./Components/SignIn";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/login" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default App;
