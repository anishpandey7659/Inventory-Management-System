import { useState, createContext, useEffect } from 'react'

export const AuthContext = createContext();

const Authprovider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to check if token is expired
  const checkTokenExpiration = () => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      setIsLoggedIn(false);
      return false;
    }
    
    try {
      // Decode JWT token payload
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      
      if (currentTime >= expirationTime) {
        // Token has expired
        console.log('Token expired, logging out...');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken'); // Remove refresh token too if you have one
        window.location.href = '/'
        setIsLoggedIn(false);
        return false;
      }
      
      // Token is still valid
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error('Invalid token format:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsLoggedIn(false);
      return false;
    }
  };

  // Check token on component mount
  useEffect(() => {
    checkTokenExpiration();
    
    // Check every 5 seconds if token has expired
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 5000); // Check every 5 seconds
    
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Login function
  const login = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    setIsLoggedIn(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout, checkTokenExpiration }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Authprovider;