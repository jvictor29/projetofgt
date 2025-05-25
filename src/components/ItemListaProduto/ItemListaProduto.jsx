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

import React, { useEffect } from 'react';
import { Card, Button, Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../../context/ContextoCarrinho';
import './ItemListaProduto.css';

const ItemListaProduto = ({ produto, estaSelecionado = false, aoAlternarComparacao }) => {
  const { adicionarAoCarrinho } = useCarrinho();
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
  } = produto;

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
  const handleAdicionarAoCarrinho = () => {
    adicionarAoCarrinho(produto);
    setMostrarToast(true);
  };

  // Efeito para esconder o toast automaticamente
  useEffect(() => {
    // Se o toast estiver visível, configurar um timer para escondê-lo
    let timerId;
    if (mostrarToast) {
      timerId = setTimeout(() => {
        setMostrarToast(false);
      }, 3000);
    }

    // Limpeza do timer se o componente for desmontado
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [mostrarToast]);

  return (
    <>
      <article className={`item-lista-produto mb-3 ${estaSelecionado ? 'item-lista-produto--selected' : ''}`}>
        <div className="row align-items-center">
          {/* Imagem do produto */}
          <div className="col-md-3 col-4 mb-2 mb-md-0">
            <div className="item-lista-produto__container-imagem position-relative">              {desconto > 0 && (
              <div className="item-lista-produto__desconto-area">
                <span className="item-lista-produto__desconto">
                  {desconto}% OFF</span>
              </div>
            )}
              <Link to={`/produtos/${id}`}><img src={imagem}alt={nome}className="item-lista-produto__imagem img-fluid rounded"/>
                <div className="item-lista-produto__imagem-overlay">
                  <span className="item-lista-produto__visualizacao-detalhes">
                    <i className="bi bi-eye me-1"></i> Ver detalhes
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Informações do produto */}
          <div className="col-md-6 col-8">
            <p className="item-lista-produto__marca text-muted mb-1">{marca}</p>
            <h3 className="item-lista-produto__titulo fs-5 mb-2">
              <Link to={`/produtos/${id}`} className="text-decoration-none text-dark">
                {nome}
              </Link>
            </h3>
            <div className="item-lista-produto__avaliacoes mb-2">
              <span className="item-lista-produto__estrelas text-warning me-2">
                {renderizarEstrelas(avaliacao)}
              </span>
              <span className="item-lista-produto__contador-avaliacoes text-muted small">
                ({numeroAvaliacoes} avaliações)
              </span>
            </div>
            <p className="item-lista-produto__descricao d-none d-md-block text-muted small">
              {descricao ? descricao.substring(0, 120) + '...' : 'Sem descrição disponível.'}
            </p>
          </div>

          {/* Preço e botão de compra */}
          <div className="col-md-3 mt-3 mt-md-0">
            <div className="item-lista-produto__area-preco text-end text-md-center mb-3">
              {precoAntigo && (
                <>
                  <del className="item-lista-produto__preco-antigo d-block">
                    R${precoAntigo.toFixed(2).replace('.', ',')}
                  </del>
                  {desconto && <span className="item-lista-produto__economia">Economize R${(precoAntigo - precoAtual).toFixed(2).replace('.', ',')}</span>}
                </>
              )}
              <span className="item-lista-produto__preco-atual fw-bold fs-5 text-primary">
                R${precoAtual.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <div className="d-flex gap-2">
              <button
                className="item-lista-produto__botao-carrinho flex-grow-1"
                onClick={handleAdicionarAoCarrinho}
              >
                <i className="bi bi-cart-plus me-2"></i>
                Adicionar
              </button>
              {aoAlternarComparacao && (
                <button
                  className={`item-lista-produto__botao-comparar ${estaSelecionado ? 'item-lista-produto__botao-comparar--selecionado' : ''}`}
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
        <Toast
          onClose={() => setMostrarToast(false)}
          show={mostrarToast}
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
