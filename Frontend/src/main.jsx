import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AlertProvider } from './components/Alerts.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AlertProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AlertProvider>
  </StrictMode>,
)
