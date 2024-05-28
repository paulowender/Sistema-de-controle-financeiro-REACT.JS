import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Modules from '../constants/modules';

function App() {
  return (
    <div>
      <Routes>
        {Modules.map((module, index) => (
          <Route key={index} path={module.path} element={<module.component />} />
        ))}
      </Routes>
    </div>
  );
}

export default App;