/**
 * Componente CabecalhoListaProdutos
 * 
 * Este componente fornece controles para a visualização da lista de produtos,
 * incluindo opções de ordenação e mudança de visualização.
 * 
 * Funcionalidades:
 * - Exibe contagem de produtos e informações de paginação
 * - Permite alternar entre visualização em grade ou lista
 * - Fornece opções de ordenação de produtos
 * - Permite ajustar a quantidade de produtos exibidos por página
 */

import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import OrdenacaoProdutos from '../OrdenacaoProdutos/OrdenacaoProdutos';
import './CabecalhoListaProdutos.css';

const CabecalhoListaProdutos = ({ 
  totalProdutos, 
  paginaAtual, 
  produtosPorPagina, 
  aoMudarProdutosPorPagina, 
  modoVisualizacao,
  aoMudarModoVisualizacao,
  ordenacaoAtual,
  aoMudarOrdenacao
}) => {return (
    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 bg-light p-3 rounded">
      <div className="d-flex align-items-center mb-2 mb-md-0">
        <span className="me-3 text-muted small">
          {paginaAtual * produtosPorPagina - produtosPorPagina + 1} a {Math.min(paginaAtual * produtosPorPagina, totalProdutos)} de {totalProdutos} produtos
        </span>
        <ButtonGroup size="sm" aria-label="Opções de visualização">
          <Button 
            variant="light" 
            className={modoVisualizacao === 'grid' ? 'active' : ''}
            aria-label="Visualização em grade"
            onClick={() => aoMudarModoVisualizacao('grid')}
            title="Visualização em grade"
          >
            <i className="bi bi-grid-3x3-gap-fill"></i>
          </Button>          <Button 
            variant="light" 
            className={modoVisualizacao === 'list' ? 'active' : ''}
            aria-label="Visualização em lista"
            onClick={() => aoMudarModoVisualizacao('list')}
            title="Visualização em lista"
          >
            <i className="bi bi-list-ul"></i>
          </Button>
        </ButtonGroup>      </div>
      
      <div className="d-flex align-items-center">        {aoMudarOrdenacao && (
          <OrdenacaoProdutos 
            ordenacaoAtual={ordenacaoAtual}
            aoMudarOrdenacao={aoMudarOrdenacao}
            className="me-3"
          />
        )}
          <Dropdown align="end" className="ms-2">
          <Dropdown.Toggle variant="light" size="sm" id="viewDropdown">
            {produtosPorPagina} por página
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item 
              onClick={() => aoMudarProdutosPorPagina(15)}
              active={produtosPorPagina === 15}
            >
              15 por página
            </Dropdown.Item>
            <Dropdown.Item 
              onClick={() => aoMudarProdutosPorPagina(30)}
              active={produtosPorPagina === 30}
            >
              30 por página
            </Dropdown.Item>
            <Dropdown.Item 
              onClick={() => aoMudarProdutosPorPagina(45)}
              active={produtosPorPagina === 45}
            >
              45 por página
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default CabecalhoListaProdutos;
