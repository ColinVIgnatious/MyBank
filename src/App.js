import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Transactions from './components/Transactions';
import DepositWithdraw from './components/DepositWithdraw';
import NavBar from './components/Navbar';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleSetToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  return (
   
       <Router>
      <div>
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login setToken={handleSetToken} />}
          />
          <Route
            path="/transactions"
            element={token ? (<><NavBar/><Transactions token={token} /> </>) : <Navigate to="/login" />}
          />
          <Route
            path="/deposit-withdraw"
            element={token ? (<><NavBar/><DepositWithdraw token={token} /> </>): <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={
              token ? (
                <div>
                  <NavBar/>
                  <h1>Welcome to the Banking System</h1>
                  <p>Select an option from the navigation above.</p>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

