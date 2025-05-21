import React from 'react';
import { Card, Button, Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductListItem.css';

const ProductListItem = ({ product, isSelected = false, onCompareToggle }) => {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = React.useState(false);
  
  const { 
    id, 
    brand, 
    name, 
    image, 
    description,
    oldPrice, 
    currentPrice, 
    discount, 
    rating, 
    reviewCount 
  } = product;

  // Renderização das estrelas com base na classificação
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Adiciona estrelas cheias
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`star-${i}`} className="bi bi-star-fill"></i>);
    }
    
    // Adiciona meia estrela, se necessário
    if (hasHalfStar) {
      stars.push(<i key="half-star" className="bi bi-star-half"></i>);
    }
    
    // Completa com estrelas vazias
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star"></i>);
    }
    
    return stars;
  };
    // Função para adicionar ao carrinho
  const handleAddToCart = () => {
    addToCart(product);
    setShowToast(true);
  };  return (
    <>
      <article className={`list-item-product mb-3 ${isSelected ? 'list-item-product--selected' : ''}`}>
        <div className="row align-items-center">
          {/* Imagem do produto */}
          <div className="col-md-3 col-4 mb-2 mb-md-0">
            <div className="list-item-product__image-container position-relative">              {discount && (
                <div className="list-item-product__discount position-absolute">
                  <span>{discount}% OFF</span>
                </div>
              )}              <Link to={`/produtos/${id}`}>
                <img 
                  src={image} 
                  alt={name} 
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
            <p className="list-item-product__brand text-muted mb-1">{brand}</p>
            <h3 className="list-item-product__title fs-5 mb-2">
              <Link to={`/produtos/${id}`} className="text-decoration-none text-dark">
                {name}
              </Link>
            </h3>
            <div className="list-item-product__rating mb-2">
              <span className="list-item-product__stars text-warning me-2">
                {renderStars(rating)}
              </span>
              <span className="list-item-product__review-count text-muted small">
                ({reviewCount} avaliações)
              </span>
            </div>
            <p className="list-item-product__description d-none d-md-block text-muted small">
              {description ? description.substring(0, 120) + '...' : 'Sem descrição disponível.'}
            </p>
          </div>
          
          {/* Preço e botão de compra */}
          <div className="col-md-3 mt-3 mt-md-0">
            <div className="list-item-product__price-area text-end text-md-center mb-3">
              {oldPrice && (
                <>
                  <del className="list-item-product__old-price d-block">
                    R${oldPrice.toFixed(2).replace('.', ',')}
                  </del>
                  {discount && <span className="list-item-product__savings">Economize R${(oldPrice - currentPrice).toFixed(2).replace('.', ',')}</span>}
                </>
              )}<span className="list-item-product__current-price fw-bold fs-5 text-primary">
                R${currentPrice.toFixed(2).replace('.', ',')}
              </span>
              <div className="list-item-product__stock mb-2 mt-2">
                <span className="list-item-product__stock-qty">
                  {Math.floor(Math.random() * 20) + 5} unidades disponíveis
                </span>
              </div>
            </div>
            <div className="d-flex gap-2">              <button 
                className="list-item-product__cart-button flex-grow-1"
                onClick={handleAddToCart}
              >
                <i className="bi bi-cart-plus me-2"></i>
                Adicionar
              </button>{onCompareToggle && (
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
          onClose={() => setShowToast(false)} 
          show={showToast} 
          delay={3000} 
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Produto adicionado</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {name} foi adicionado ao carrinho com sucesso!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ProductListItem;
