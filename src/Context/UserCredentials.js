import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = (props) => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [searchInput,setSearchInput] = useState("");

  return (
    <UserContext.Provider
      value={{ signedIn, setSignedIn, email, setEmail, user, setUser, searchInput,setSearchInput }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
