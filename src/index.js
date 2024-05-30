import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { tr } from './lang';
import App from './pages/index';

const container = document.getElementById('root');
const title = document.getElementById('title');

title.innerHTML = tr('appName');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
