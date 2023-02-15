import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Countries from './components/Countries';
import CountriesSingle from './components/CountriesSingle';
import Home from './components/Home';
import Layout from './pages/Layout';

import 'bootstrap-icons/font/bootstrap-icons.css';
import Favourites from './components/Favourites';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Signup } from './components/Signup';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/countries/:single" element={<CountriesSingle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
