import React from 'react'
import {Routes, Route} from 'react-router-dom'

import Main from './pages/Main/Main';
import Pokemon from './pages/Pokemon/Pokemon';

const Routers: React.FC = () => {
  return <Routes>
  <Route path="/" element={<Main/>}/>
  <Route path="/pokemon/:id" element={<Pokemon/>}/>
  </Routes>
}

export default Routers; 
