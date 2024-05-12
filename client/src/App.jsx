import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Header';
import Profile from './components/Profile';
import Chat from './components/Chat';

const App = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Adjust this value according to your design
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <div className="App bg-black">
        <Navbar />
        <div className='bg-black flex'>
          {!isSmallScreen && <Profile />}
          <Chat />
        </div>
        {/* Other components/routes */}
      </div>
    </Router>
  );
};

export default App;
