import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home';
import { Request } from './pages/Request';
import { NavBar } from './layouts/Navbar';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Edit } from './pages/Edit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element ={<Home/>} /> 
      <Route path='request' element={<Request/>} />
      <Route path='edit/:id' element={<Edit/>} />
    </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
    
);