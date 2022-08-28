import React from 'react'
import {Routes, Route} from 'react-router-dom'

import Main from './pages/Main/Main.tsx';
import Pokemon from './pages/Pokemon/Pokemon.tsx';

const Routers: React.FC = () => {
  return <Routes>
  <Route path="/" element={<Main/>}/>
  <Route path="/pokemon/:id" element={<Pokemon/>}/>
  </Routes>
}

export default Routers; 
