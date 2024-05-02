import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import "./App.css";
import logo from "./log.png";
const App = () => {
  const dispatch = useDispatch();
 
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
 
  return (
    <div className="app">
            <div className='signupbar'> 
      <div>
        <h3>Signup</h3>
      </div>
      <img src={logo}/>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
    </div>
  );
};

export default App;
