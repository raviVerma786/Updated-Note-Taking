import React, { useEffect } from "react";
import "./SignIn.css";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import useZustandStore from "../Context/ZustandStore";

export const SignIn = () => {
  let navigate = useNavigate();

  let [authMode, setAuthMode] = useState("signin");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const {
    email,
    setEmail,
    user,
    setUser,
    signedIn,
    setSignedIn,
    searchInput,
    setSearchInput,
  } = useZustandStore((state) => ({
    email: state.email,
    setEmail: state.setEmail,
    user: state.user,
    setUser: state.setUser,
    signedIn: state.signedIn,
    setSignedIn: state.setSignedIn,
    searchInput: state.searchInput,
    setSearchInput: state.setSearchInput,
  }));

  const NavigateToHome = () => {
    let path = `/`;
    navigate(path);
  };

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const SignInHandle = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userEmail, password)
      .then((userCredentials) => {
        setSignedIn(true);
        setEmail(userEmail);
        localStorage.setItem("token", userCredentials._tokenResponse.idToken);
        localStorage.setItem("userId", userCredentials._tokenResponse.localId);
        setUser(localStorage.getItem("userId"));
        NavigateToHome();
      })
      .catch((error) => {
        console.log(error);
        alert("User does not exist ! \nPlease Sign up !");
      });
  };

  const SignUpHandle = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, userEmail, password)
      .then((userCredentials) => {
        console.log("New user account created successfully !");
      })
      .catch((error) => {
        console.log(error);
      });

    changeAuthMode();
  };

  useEffect(() => {
    if (authMode === "signin") {
      document.getElementById("signInEmailInput").select();
    } else {
      document.getElementById("signUpNameInput").select();
    }
  }, [authMode]);

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={SignInHandle}>
          <div className="Auth-form-content">
            <h1 className="Auth-form-title">Sign In</h1>
            <div className="text-center">
              Not registered yet?{" "}
              <span
                id="signUpButton"
                className="link-primary"
                onClick={changeAuthMode}
              >
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label className="h6">Email address</label>
              <input
                id="signInEmailInput"
                type="email"
                className="form-control mt-1 updateInput"
                placeholder="Enter email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label className="h6">Password</label>
              <input
                type="password"
                className="form-control mt-1 updateInput"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-grid gap-2 mt-5 text-center">
              <button type="submit" className="btn btn-primary ">
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={SignUpHandle}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span
              id="signInButton"
              className="link-primary "
              onClick={changeAuthMode}
            >
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label className="h6">Full Name</label>
            <input
              type="text"
              className="form-control mt-1 updateInput"
              placeholder="e.g Jane Doe"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              id="signUpNameInput"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label className="h6">Email address</label>
            <input
              type="email"
              className="form-control mt-1 updateInput"
              placeholder="Email Address"
              value={userEmail}
              onChange={(e) => userEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label className="h6">Password</label>
            <input
              type="password"
              className="form-control mt-1 updateInput"
              placeholder="Password"
              value={password}
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid gap-2 mt-5 text-center">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
