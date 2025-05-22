/**
 * Componente ItemListaProduto
 * 
 * Este componente renderiza um item de produto para a visualização em lista na loja.
 * 
 * Funcionalidades:
 * - Exibe imagem, marca, nome, descrição, preço e avaliações do produto em layout horizontal
 * - Mostra descontos quando disponíveis
 * - Permite adicionar o produto ao carrinho
 * - Suporta funcionalidade de comparação entre produtos
 * - Exibe uma notificação toast ao adicionar produto ao carrinho
 */

import React from 'react';
import { Card, Button, Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ItemListaProduto.css';

const ItemListaProduto = ({ product, isSelected = false, onCompareToggle }) => {
  const { addToCart } = useCart();
  const [mostrarToast, setMostrarToast] = React.useState(false);
  
  const { 
    id, 
    brand: marca, 
    name: nome, 
    image: imagem, 
    description: descricao,
    oldPrice: precoAntigo, 
    currentPrice: precoAtual, 
    discount: desconto, 
    rating: avaliacao, 
    reviewCount: numeroAvaliacoes 
  } = product;

  /**
   * Renderiza as estrelas de avaliação com base na pontuação
   * @param {number} avaliacao - A pontuação da avaliação (0-5)
   * @returns {Array} Array de elementos de estrelas
   */
  const renderizarEstrelas = (avaliacao) => {
    const estrelas = [];
    const estrelasCompletas = Math.floor(avaliacao);
    const temMeiaEstrela = avaliacao % 1 >= 0.5;
    
    // Adiciona estrelas cheias
    for (let i = 0; i < estrelasCompletas; i++) {
      estrelas.push(<i key={`star-${i}`} className="bi bi-star-fill"></i>);
    }
    
    // Adiciona meia estrela, se necessário
    if (temMeiaEstrela) {
      estrelas.push(<i key="half-star" className="bi bi-star-half"></i>);
    }
    
    // Completa com estrelas vazias
    const estrelasVazias = 5 - estrelas.length;
    for (let i = 0; i < estrelasVazias; i++) {
      estrelas.push(<i key={`empty-${i}`} className="bi bi-star"></i>);
    }
    
    return estrelas;
  };
    /**
   * Função para adicionar produto ao carrinho
   */
  const adicionarAoCarrinho = () => {
    addToCart(product);
    setMostrarToast(true);
  };
    return (
    <>
      <article className={`list-item-product mb-3 ${isSelected ? 'list-item-product--selected' : ''}`}>
        <div className="row align-items-center">
          {/* Imagem do produto */}
          <div className="col-md-3 col-4 mb-2 mb-md-0">
            <div className="list-item-product__image-container position-relative">
              {desconto && (
                <div className="list-item-product__discount position-absolute">
                  <span>{desconto}% OFF</span>
                </div>
              )}
              <Link to={`/produtos/${id}`}>
                <img 
                  src={imagem} 
                  alt={nome} 
                  className="list-item-product__image img-fluid rounded"
                />
                <div className="list-item-product__overlay">
                  <span className="list-item-product__view-details">
                    <i className="bi bi-eye me-1"></i> Ver detalhes
                  </span>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Informações do produto */}
          <div className="col-md-6 col-8">
            <p className="list-item-product__brand text-muted mb-1">{marca}</p>
            <h3 className="list-item-product__title fs-5 mb-2">
              <Link to={`/produtos/${id}`} className="text-decoration-none text-dark">
                {nome}
              </Link>
            </h3>
            <div className="list-item-product__rating mb-2">
              <span className="list-item-product__stars text-warning me-2">
                {renderizarEstrelas(avaliacao)}
              </span>
              <span className="list-item-product__review-count text-muted small">
                ({numeroAvaliacoes} avaliações)
              </span>
            </div>
            <p className="list-item-product__description d-none d-md-block text-muted small">
              {descricao ? descricao.substring(0, 120) + '...' : 'Sem descrição disponível.'}
            </p>
          </div>
          
          {/* Preço e botão de compra */}
          <div className="col-md-3 mt-3 mt-md-0">
            <div className="list-item-product__price-area text-end text-md-center mb-3">
              {precoAntigo && (
                <>
                  <del className="list-item-product__old-price d-block">
                    R${precoAntigo.toFixed(2).replace('.', ',')}
                  </del>
                  {desconto && <span className="list-item-product__savings">Economize R${(precoAntigo - precoAtual).toFixed(2).replace('.', ',')}</span>}
                </>
              )}              <span className="list-item-product__current-price fw-bold fs-5 text-primary">
                R${precoAtual.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <div className="d-flex gap-2">
              <button 
                className="list-item-product__cart-button flex-grow-1"
                onClick={adicionarAoCarrinho}
              >
                <i className="bi bi-cart-plus me-2"></i>
                Adicionar
              </button>              {onCompareToggle && (
                <button 
                  className={`list-item-product__compare-button ${isSelected ? 'active' : ''}`}
                  onClick={onCompareToggle}
                  title={isSelected ? "Remover da comparação" : "Adicionar para comparar"}
                >
                  <i className={`bi ${isSelected ? 'bi-dash-circle' : 'bi-bar-chart'}`}></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </article>
      
      <ToastContainer position="bottom-right" className="p-3">
        <Toast 
          onClose={() => setMostrarToast(false)} 
          show={mostrarToast} 
          delay={3000} 
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Produto adicionado</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {nome} foi adicionado ao carrinho com sucesso!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ItemListaProduto;
