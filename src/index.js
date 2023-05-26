import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/css/custom.css'
import '../src/assets/css/fontawesome.css'
import axios from 'axios'

axios.defaults.headers.common['Authorization'] = "Bearer " + sessionStorage.getItem('token')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
