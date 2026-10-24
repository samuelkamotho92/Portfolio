import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import CommunityPage from './pages/CommunityPage';
import registerServiceWorker from './serviceWorkerRegistration';
import './index.css';

const path = window.location.pathname.replace(/\/+$/, '') || '/';
const Page = path === '/community' ? CommunityPage : App;

ReactDOM.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
  document.getElementById('root'),
);

registerServiceWorker();
