/**
 * Componente OrdenacaoProdutos
 * 
 * Este componente fornece um menu dropdown para ordenação de produtos por diferentes critérios.
 * 
 * Funcionalidades:
 * - Permite ao usuário selecionar diferentes critérios de ordenação
 * - Exibe ícones visuais para cada opção de ordenação
 * - Mantém visualmente a seleção atual do usuário
 */

import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './OrdenacaoProdutos.css';

const OrdenacaoProdutos = ({ ordenacaoAtual, aoMudarOrdenacao, className = '' }) => {
  // Opções de ordenação disponíveis
  const opcoesOrdenacao = [
    { id: 'featured', nome: 'Destaques', icone: 'bi-star-fill' },
    { id: 'price-asc', nome: 'Menor preço', icone: 'bi-sort-numeric-down' },
    { id: 'price-desc', nome: 'Maior preço', icone: 'bi-sort-numeric-up' },
    { id: 'rating', nome: 'Melhor avaliação', icone: 'bi-star-half' },
    { id: 'newest', nome: 'Mais recentes', icone: 'bi-calendar-check' }
  ];
  // Encontrar a opção de ordenação atual
  const opcaoOrdenacaoAtual = opcoesOrdenacao.find(opcao => opcao.id === ordenacaoAtual) || opcoesOrdenacao[0];  return (
    <Dropdown className={`ordenacao-produtos ${className}`}>
      <Dropdown.Toggle variant="light" id="dropdown-ordenacao" className="d-flex align-items-center">
        <i className={`bi ${opcaoOrdenacaoAtual.icone} me-2`}></i>
        <span>Ordenar por: </span>
        <span className="fw-medium ms-1">{opcaoOrdenacaoAtual.nome}</span>
      </Dropdown.Toggle><Dropdown.Menu>
        {opcoesOrdenacao.map(opcao => (
          <Dropdown.Item 
            key={opcao.id}
            active={ordenacaoAtual === opcao.id}
            onClick={() => aoMudarOrdenacao(opcao.id)}
            className="d-flex align-items-center"
          >
            <i className={`bi ${opcao.icone} me-2`}></i>
            {opcao.nome}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default OrdenacaoProdutos;
