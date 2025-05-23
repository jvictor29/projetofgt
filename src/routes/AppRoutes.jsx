import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import FinalizarCompra from '../pages/FinalizarCompra/FinalizarCompra';



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/FinalizarCompra" element={<FinalizarCompra />} />

    </Routes>
  );
};

export default AppRoutes;
