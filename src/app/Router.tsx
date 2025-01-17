import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Repository from '../pages/Repository/Repository';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repository/:name" element={<Repository />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
