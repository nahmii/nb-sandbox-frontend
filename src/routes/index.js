import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../views/auth/Dashboard'

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default AppRoute;