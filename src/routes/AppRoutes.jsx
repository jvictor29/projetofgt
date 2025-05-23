import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import HomePage from '../pages/HomePage/HomePage';
import PaginaProdutos from '../pages/PaginaProdutos/PaginaProdutos';
import PaginaDetalhesProduto from '../pages/PaginaDetalhesProduto/PaginaDetalhesProduto';
import PaginaCarrinho from '../pages/PaginaCarrinho/PaginaCarrinho';

const AppRoutes = () => {  return (
    <Routes>      <Route path="/" element={<PaginaProdutos />} />
      <Route path="/produtos" element={<PaginaProdutos />} />
      <Route path="/produtos/:id" element={<PaginaDetalhesProduto />} />
      <Route path="/carrinho" element={<PaginaCarrinho />} />
      {/* Adicione outras rotas conforme necessário */}
      <Route path="*" element={<h1 className="text-center mt-5">Página não encontrada</h1>} />
    </Routes>
  );
};

export default AppRoutes;
