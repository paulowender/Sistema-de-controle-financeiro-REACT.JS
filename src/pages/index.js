import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Modules from '../constants/modules';
import { AuthenticationService } from '../services/auth';
import ThemeService from '../services/theme';

const authService = new AuthenticationService();
function App() {
  return (
    <div>
      <Routes>
        {Modules.map((module, index) => (
          <Route
            key={index}
            path={module.path}
            element={
              // Inject the theme context here
              <ThemeService>
                <module.page authService={authService} />
              </ThemeService>
            }
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;