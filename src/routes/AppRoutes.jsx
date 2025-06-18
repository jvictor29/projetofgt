import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import Cadastro from '../pages/Cadastro';
import PaginaProdutos from '../pages/PaginaProdutos/PaginaProdutos';
import PaginaDetalhesProduto from '../pages/PaginaDetalhesProduto/PaginaDetalhesProduto';
import PaginaCarrinho from '../pages/PaginaCarrinho/PaginaCarrinho';
import { Descricao } from './components/Descricao/descricao';
import 'Descricao/descricao.jsx'
import 'descricao/descricao.css'
import 'DescricaoPage/Descricaopage.jsx'
import 'DescricaoPage/Descricaopage.css'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/Descricao" element={<Descricao />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/produtos" element={<PaginaProdutos />} />
      <Route path="/produtos/:id" element={<PaginaDetalhesProduto />} />
      <Route path="/carrinho" element={<PaginaCarrinho />} />
      <Route path="/categorias" element={<h1 className="text-center mt-5">Página em desenvolvimento</h1>} /> 
      <Route path="/meus-pedidos" element={<h1 className="text-center mt-5">Meus Pedidos</h1>} />
      <Route path="/sobre" element={<h1 className="text-center mt-5">Sobre</h1>} />
      <Route path="/contato" element={<h1 className="text-center mt-5">Contato</h1>} />
      <Route path="/termos" element={<h1 className="text-center mt-5">Termos e Condições</h1>} />
      <Route path="/devolucoes" element={<h1 className="text-center mt-5">Trocas e Devoluções</h1>} />
      <Route path="*" element={<h1 className="text-center mt-5">Página em desenvolvimento</h1>} /> 
      
    </Routes>
  );
};

export default AppRoutes;
