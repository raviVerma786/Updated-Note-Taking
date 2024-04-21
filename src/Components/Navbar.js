import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserCredentials";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = (props) => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/login`;
    navigate(path);
  };

  const userDetails = useContext(UserContext);
  // console.log(userDetails);

  const logOutUser = () => {
    console.log("Log out called !");
    signOut(auth).then((res) => {
      console.log("Successfully logged out!");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      userDetails.setSignedIn(false);
      userDetails.setUser(null);
      userDetails.setEmail(null);
      routeChange();
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top d-flex bd-highlight">
        <a id="logo" className="navbar-brand mx-2 p-2 flex-grow-1 bd-highlight" href="/">
          Note Taking App
        </a>
        {!userDetails.signedIn ? (
          <button
            id="LogInButton"
            className="btn btn-outline-primary mx-3 my-sm-0"
            onClick={routeChange}
          >
            Log in/Sign up
          </button>
        ) : (
          <>
          <input
            className="form-control mr-sm-2 p-2 bd-highlight w-25"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value = {userDetails.searchInput}
            onChange={(e)=>userDetails.setSearchInput(e.target.value)}
          />

          <button
            id="LogInButton"
            className="btn btn-outline-primary mx-2 my-sm-0 p-2 bd-highlight"
            onClick={logOutUser}
          >
            Log out
          </button>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
