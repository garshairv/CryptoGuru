import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {Signin} from './pages/Signin';
import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {Missing} from './pages/Missing';


const App = () =>
  <BrowserRouter>
    <div>
        <div>
          <Routes>
              <Route path="/home" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signin" element={<Signin/>}/>
              <Route path="/" element={<Missing/>}/>
            </Routes>
        </div>      
    </div>
  </BrowserRouter>

export default App;
