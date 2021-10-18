import { createContext, useState, useEffect } from "react";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import nookies from "nookies";

import app from "../firebase/clientApp";

const auth = getAuth(app);
//Storing auth state for long term, explicit sign out required
setPersistence(auth, browserLocalPersistence);

const AuthContext = createContext({
  user: null,
});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // onIdTokenChanged is triggered when User is signed in or token is refreshed.
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
    return unsubscribe;
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
