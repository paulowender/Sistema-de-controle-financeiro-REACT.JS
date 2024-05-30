import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppImages } from './constants/images';
import { tr } from './lang';
import App from './pages/index';

// Set the title
const title = document.getElementById('title');
title.innerHTML = tr('appName');

// Set the favicon
const favicon = document.getElementById('favicon');
favicon.setAttribute('href', AppImages.favicon);

// Render the app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
