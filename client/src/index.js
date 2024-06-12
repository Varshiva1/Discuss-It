// index.js or App.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import your CSS file here if you have one
import App from './App'; // Assuming App is your root component
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <div style={{ margin: '0 auto', padding: '0 20px' }}>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// Other code remains the same
