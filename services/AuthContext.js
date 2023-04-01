import React, { useState, createContext } from "react";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export const AuthenticatedUserContext = createContext({
  user: null,
  setUser: () => {},
});

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    const auth = getAuth();
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
      }
    );
    return unsubscribeAuth;
  }, []);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
