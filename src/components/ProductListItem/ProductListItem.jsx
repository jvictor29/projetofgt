import React from 'react';
import { Card, Button, Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductListItem.css';

let ItemListaProduto = ({ produto, estaSelecionado = false, aoAlternarComparacao }) => {
  let { addToCart: adicionarAoCarrinho } = useCart();
  let [mostrarToast, setMostrarToast] = React.useState(false);
  
  let { 
    id, 
    brand: marca, 
    name: nome, 
    image: imagem, 
    description: descricao,
    oldPrice: precoAntigo, 
    currentPrice: precoAtual, 
    discount: desconto, 
    rating: avaliacao, 
    reviewCount: quantidadeAvaliacoes 
  } = produto;
  // Renderização das estrelas com base na classificação
  let renderizarEstrelas = (avaliacao) => {
    let estrelas = [];
    let estrelasCompletas = Math.floor(avaliacao);
    let temMeiaEstrela = avaliacao % 1 >= 0.5;
    
    // Adiciona estrelas cheias
    for (let i = 0; i < estrelasCompletas; i++) {
      estrelas.push(<i key={`estrela-${i}`} className="bi bi-star-fill"></i>);
    }
    
    // Adiciona meia estrela, se necessário
    if (temMeiaEstrela) {
      estrelas.push(<i key="meia-estrela" className="bi bi-star-half"></i>);
    }
      // Completa com estrelas vazias
    let estrelasVazias = 5 - estrelas.length;
    for (let i = 0; i < estrelasVazias; i++) {
      estrelas.push(<i key={`vazia-${i}`} className="bi bi-star"></i>);
    }
    
    return estrelas;
  };
    // Função para adicionar ao carrinho
  let handleAdicionarAoCarrinho = () => {
    adicionarAoCarrinho(produto);
    setMostrarToast(true);
  };return (
    <>
      <article className={`list-item-product mb-3 ${estaSelecionado ? 'list-item-product--selected' : ''}`}>
        <div className="row align-items-center">
          {/* Imagem do produto */}          <div className="col-md-3 col-4 mb-2 mb-md-0">
            <div className="list-item-product__image-container position-relative">              {desconto && (
                <div className="list-item-product__discount position-absolute">
                  <span>{desconto}% OFF</span>
                </div>
              )}              <Link to={`/produtos/${id}`}>
                <img 
                  src={imagem} 
                  alt={nome} 
                  className="list-item-product__image img-fluid rounded"
                />
                <div className="list-item-product__image-overlay"></div>
              </Link>
            </div>
          </div>
          
          {/* Informações do produto */}
          <div className="col-md-6 col-8">            <p className="list-item-product__brand text-muted mb-1">{marca}</p>
            <h3 className="list-item-product__title fs-5 mb-2">
              <Link to={`/produtos/${id}`} className="text-decoration-none text-dark">
                {nome}
              </Link>
            </h3><div className="list-item-product__rating mb-2">              <span className="list-item-product__stars text-warning me-2">
                {renderizarEstrelas(avaliacao)}
              </span>              <span className="list-item-product__review-count text-muted small">
                ({quantidadeAvaliacoes} avaliações)
              </span>
            </div>            <p className="list-item-product__description d-none d-md-block text-muted small mb-2">
              {descricao ? descricao.substring(0, 120) + '...' : ""}
            </p>
            <Link to={`/produtos/${id}`} className="list-item-product__view-details-link d-none d-md-inline-flex mb-2">
              <i className="bi bi-eye me-1"></i> Ver detalhes
            </Link>
          </div>
            {/* Preço e botão de compra */}
          <div className="col-md-3 mt-3 mt-md-0">            <div className="list-item-product__price-area text-end text-md-center mb-3">
              {precoAntigo && (
                <del className="list-item-product__old-price d-block">
                  R${precoAntigo.toFixed(2).replace('.', ',')}
                </del>
              )}
              <span className="list-item-product__current-price fw-bold fs-5 text-primary">
                R${precoAtual.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <div className="d-flex gap-2"><button 
                className="list-item-product__cart-button flex-grow-1"
                onClick={handleAdicionarAoCarrinho}
              >
                <i className="bi bi-cart-plus me-2"></i>
                Adicionar
              </button>              {aoAlternarComparacao && (
                <button 
                  className={`list-item-product__compare-button ${estaSelecionado ? 'active' : ''}`}
                  onClick={aoAlternarComparacao}
                  title={estaSelecionado ? "Remover da comparação" : "Adicionar para comparar"}
                >
                  <i className={`bi ${estaSelecionado ? 'bi-dash-circle' : 'bi-bar-chart'}`}></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </article>
      
      <ToastContainer position="bottom-right" className="p-3">
        <Toast          onClose={() => setMostrarToast(false)} 
          show={mostrarToast} 
          delay={3000} 
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Produto adicionado</strong>
          </Toast.Header>          <Toast.Body className="text-white">
            {nome} foi adicionado ao carrinho com sucesso!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ItemListaProduto;
