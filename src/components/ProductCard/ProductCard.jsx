import React from 'react';
import { Card, Button, Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, isSelected = false, onCompareToggle }) => {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = React.useState(false);
  
  const { 
    id, 
    brand, 
    name, 
    image, 
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
  };

  return (
    <>
      <article className="col">
        <div className={`card_produto ${isSelected ? 'card_produto--selected' : ''}`}>
          {discount && (
            <div className="card_produto__desconto_area">
              <span className="card_produto__desconto">{discount}% OFF</span>
            </div>
          )}
          <div className="card_produto__area_imagem">          <Link to={`/produtos/${id}`}>
              <img src={image} alt={name} className="card_produto__imagem" />
              <div className="card_produto__imagem_overlay"></div>
            </Link>
          </div>
          <div className="card_produto__corpo">
            <p className="card_produto__marca">{brand}</p>
            <h3 className="card_produto__titulo">
              <Link to={`/produtos/${id}`} className="text-decoration-none text-dark">
                {name}
              </Link>
            </h3>
            <div className="card_produto__avaliacao_area">
              <div className="card_produto__avaliacao_estrelas">
                {renderStars(rating)}
              </div>
              <span className="card_produto__avaliacao_total">({reviewCount})</span>
            </div>
            <div className="card_produto__preco_area">
              {oldPrice && <del className="card_produto__preco_antigo">R${oldPrice.toFixed(2).replace('.', ',')}</del>}
              <span className="card_produto__preco_atual">R${currentPrice.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="d-flex gap-2">
              <button 
                className="card_produto__botao_carrinho flex-grow-1"
                onClick={handleAddToCart}
              >
                <i className="bi bi-cart-plus card_produto__icone_carrinho"></i>
                Adicionar
              </button>
              {onCompareToggle && (
                <button 
                  className={`card_produto__botao_comparar ${isSelected ? 'active' : ''}`}
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

export default ProductCard;
