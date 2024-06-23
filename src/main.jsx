import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Login from "./components/Login.jsx"
import ReceviedBorrowRequests from './components/ReceviedBorrowRequests.jsx'
import Book from './components/Book.jsx'
import SentBorrowRequests from './components/SentBorrowRequests.jsx'

import { RouterProvider } from 'react-router-dom'

import router from './router.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>

  </React.StrictMode>,
)
