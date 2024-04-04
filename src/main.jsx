import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="962478663698-smvrpka2llkrrjp77l4vr1i5plkc2k9r.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
