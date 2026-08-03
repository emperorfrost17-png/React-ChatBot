import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  //<StrictMode gives us some additional checks and warnings when developing our app
  <StrictMode>
    <App />
  </StrictMode>,
)
