import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the new `createRoot` API
import App from './App';
import "./index.css"
import { AuthProvider } from './context/AuthContext'; // Ensure AuthProvider is imported correctly

// Find the root DOM node
const rootElement = document.getElementById('root');

// Create a root
const root = ReactDOM.createRoot(rootElement);

// Render the app
root.render(
  // <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  // </React.StrictMode>
);
