// src/context/auth-context.js
import React from "react";

const AuthContext = React.createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = React.useState('');

    React.useEffect(() => {
      const token = window.localStorage.getItem("token");
      if (token) {
        setAuthState({ token });
      }
    }, []);


  const setUserAuthInfo = ( data ) => {
       localStorage.setItem("token", data.token);
      const token=localStorage.getItem('token')
    setAuthState({
      token,
    });
  };

  

  return (
    <Provider
      value={{
        auth,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
      }}
    >
      {children}
    </Provider>
  );
};
export { AuthContext, AuthProvider };

