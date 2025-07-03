import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'   // ✅ This one is correct
import App from './App.jsx'

// Yeh line duplicate thi: remove this → import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
