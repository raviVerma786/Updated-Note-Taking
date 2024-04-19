import React, { useContext, useEffect } from "react";
import "./SignIn.css";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { UserContext } from "../Context/UserCredentials";

export const SignIn = (props) => {
  let navigate = useNavigate();

  let [authMode, setAuthMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const userDetails = useContext(UserContext);

  const NavigateToHome = () => {
    let path = `/`;
    navigate(path);
  };

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const SignInHandle = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // console.log(userCredentials);
        userDetails.setSignedIn(true);
        userDetails.setEmail(email);
        localStorage.setItem("token", userCredentials._tokenResponse.idToken);
        localStorage.setItem("userId", userCredentials._tokenResponse.localId);
        NavigateToHome();
      })
      .catch((error) => {
        console.log(error);
        alert("User does not exist ! \nPlease Sign up !");
      });
  };

  const SignUpHandle = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // console.log(userCredentials);
        console.log("New user account created successfully !")
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            {/* <p className="text-center mt-2">
              Forgot <a href="">password?</a>
            </p> */}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          {/* <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p> */}
        </div>
      </form>
    </div>
  );
};
