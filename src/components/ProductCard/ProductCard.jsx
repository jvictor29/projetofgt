import React from 'react';
import { Card, Button, Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

let CardProduto = ({ produto, estaSelecionado = false, aoAlternarComparacao }) => {
  let { addToCart: adicionarAoCarrinho } = useCart();
  let [mostrarToast, setMostrarToast] = React.useState(false);
  
  let { 
    id, 
    brand: marca, 
    name: nome, 
    image: imagem, 
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
  };
  return (
    <>
      <article className="col">
        <div className={`card_produto ${estaSelecionado ? 'card_produto--selected' : ''}`}>
          {desconto && (
            <div className="card_produto__desconto_area">
              <span className="card_produto__desconto">{desconto}% OFF</span>
            </div>
          )}          <div className="card_produto__area_imagem">
            <Link to={`/produtos/${id}`}>
              <img src={imagem} alt={nome} className="card_produto__imagem" />
              <div className="card_produto__imagem_overlay">
                <span className="card_produto__view_details">
                  <i className="bi bi-eye me-1"></i> Ver detalhes
                </span>
              </div>
            </Link>
          </div>
          <div className="card_produto__corpo">
            <p className="card_produto__marca">{marca}</p>
            <h3 className="card_produto__titulo">
              <Link to={`/produtos/${id}`} className="text-decoration-none text-dark">
                {nome}
              </Link>
            </h3>
            <div className="card_produto__avaliacao_area">
              <div className="card_produto__avaliacao_estrelas">
                {renderizarEstrelas(avaliacao)}
              </div>
              <span className="card_produto__avaliacao_total">({quantidadeAvaliacoes})</span>
            </div>
            <div className="card_produto__preco_area">
              {precoAntigo && <del className="card_produto__preco_antigo">R${precoAntigo.toFixed(2).replace('.', ',')}</del>}
              <span className="card_produto__preco_atual">R${precoAtual.toFixed(2).replace('.', ',')}</span>
            </div>            <div className="d-flex gap-2">
              <button 
                className="card_produto__botao_carrinho flex-grow-1"
                onClick={handleAdicionarAoCarrinho}
              >                <i className="bi bi-cart-plus card_produto__icone_carrinho"></i>
                Adicionar
              </button>
              {aoAlternarComparacao && (
                <button 
                  className={`card_produto__botao_comparar ${estaSelecionado ? 'active' : ''}`}
                  onClick={aoAlternarComparacao}
                  title={estaSelecionado ? "Remover da comparação" : "Adicionar para comparar"}
                >
                  <i className={`bi ${estaSelecionado ? 'bi-dash-circle' : 'bi-bar-chart'}`}></i>
                </button>
              )}            </div>
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

export default CardProduto;
