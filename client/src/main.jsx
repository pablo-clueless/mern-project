import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import './index.css'
import { store } from './store/store'
import { ContextProvider } from './contexts/ContextProvider'
import { SocketProvider } from './contexts/SocketProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <SocketProvider>
          <ContextProvider>
            <App />
          </ContextProvider>
        </SocketProvider>
      </Provider>
    </Router>
  </React.StrictMode>
)
