import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import { SignIn } from "./Components/SignIn";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  return (
    <>
      <Navbar
        setUserSignedIn={setUserSignedIn}
        userSignedIn={userSignedIn}
        setUser={setUser}
        user={user}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/login" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default App;
