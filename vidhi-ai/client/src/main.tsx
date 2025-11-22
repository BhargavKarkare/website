// src/main.tsx  (or src/index.tsx / src/index.tsx depending on your filename)
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App'
import './index.css'

import ErrorBoundary from './components/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
