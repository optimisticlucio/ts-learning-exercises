import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Autocomplete from './Autocomplete.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Autocomplete />
  </StrictMode>,
)
