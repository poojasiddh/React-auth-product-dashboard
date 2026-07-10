import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem("setData");
    return savedData ? JSON.parse(savedData) : [];
  });

  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isUserLogin,setIsUserLogin] = useState(true); 

  useEffect(() => {
    localStorage.setItem("setData", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  
  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        loggedInUser,
        setLoggedInUser,
        isUserLogin,
        setIsUserLogin,
        cart,
        setCart,
      }}>
      {children}
    </UserContext.Provider>
  );
}