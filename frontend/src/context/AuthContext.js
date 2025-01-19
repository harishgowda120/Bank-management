import { createContext, useState, useEffect } from 'react';

// Create the AuthContext to share authentication state
export const AuthContext = createContext();

// Create the AuthProvider component that will wrap the app and provide authentication context to all components
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Check localStorage for saved user data (if any) on page reload
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');

    // Return the initial state based on what's stored in localStorage
    return storedToken && storedUsername && storedUserId
      ? { token: storedToken, username: storedUsername, userId: storedUserId }
      : null;
  });

  useEffect(() => {
    // Save auth data in localStorage whenever it changes
    if (auth) {
      localStorage.setItem('token', auth.token);
      localStorage.setItem('username', auth.username);
      localStorage.setItem('userId', auth.userId);
    } else {
      // Clear the localStorage when the user logs out
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
