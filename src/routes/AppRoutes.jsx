import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import HomePage from '../pages/HomePage/HomePage';
import ProductsPage from '../pages/ProductsPage/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage/ProductDetailPage';
import CartPage from '../pages/CartPage/CartPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/produtos" element={<ProductsPage />} />
      <Route path="/produtos/:id" element={<ProductDetailPage />} />
      <Route path="/carrinho" element={<CartPage />} />
      {/* Adicione outras rotas conforme necessário */}
      <Route path="*" element={<h1 className="text-center mt-5">Página não encontrada</h1>} />
    </Routes>
  );
};

export default AppRoutes;
