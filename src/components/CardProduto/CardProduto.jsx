import React, { useEffect, useState } from 'react';
import { Card, Button, Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../../context/ContextoCarrinho';
import { BsStarFill, BsStarHalf, BsStar, BsCartPlus, BsBarChart, BsDashCircle, BsEye } from 'react-icons/bs';
import './CardProduto.css';

const formatarPreco = (valor) => `R$${valor.toFixed(2).replace('.', ',')}`;

const EstrelasAvaliacao = ({ avaliacao }) => {
  const estrelas = [];
  const completas = Math.floor(avaliacao);
  const meia = avaliacao % 1 >= 0.5;
  
  for (let i = 0; i < completas; i++) estrelas.push(<BsStarFill key={`estrela-${i}`} />);
  if (meia) estrelas.push(<BsStarHalf key="meia-estrela" />);
  while (estrelas.length < 5) estrelas.push(<BsStar key={`vazia-${estrelas.length}`} />);

  return <>{estrelas}</>;
};

const CardProduto = ({ produto, estaSelecionado = false, aoAlternarComparacao }) => {
  const { adicionarAoCarrinho } = useCarrinho();
  const [mostrarToast, setMostrarToast] = useState(false);

  const {
    id,
    brand: marca,
    name: nome,
    image: imagem,
    oldPrice: precoAntigo,
    currentPrice: precoAtual,
    discount: desconto,
    rating: avaliacao,
    reviewCount: numeroAvaliacoes
  } = produto;

  const handleAdicionarAoCarrinho = () => {
    adicionarAoCarrinho(produto);
    setMostrarToast(true);
  };

  useEffect(() => {
    if (!mostrarToast) return;
    const timer = setTimeout(() => setMostrarToast(false), 3000);
    return () => clearTimeout(timer);
  }, [mostrarToast]);

  return (
    <>
      <article className="col">
        <div className={`card_produto ${estaSelecionado ? 'card_produto--selected' : ''}`}>
          {desconto && (
            <div className="card_produto__desconto_area">
              <span className="card_produto__desconto">-{desconto}% OFF</span>
            </div>
          )}

          <div className="card_produto__area_imagem">
            <Link to={`/produtos/${id}`}>
              <img src={imagem} alt={nome} className="card_produto__imagem" />
              <div className="card_produto__imagem_overlay">
                <span className="card_produto__visualizacao_rapida">
                  <BsEye className="me-1" /> Ver detalhes
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
                <EstrelasAvaliacao avaliacao={avaliacao} />
              </div>
              <span className="card_produto__avaliacao_total">({numeroAvaliacoes})</span>
            </div>

            <div className="card_produto__preco_area">
              {precoAntigo && (
                <>
                  <del className="card_produto__preco_antigo">{formatarPreco(precoAntigo)}</del>
                  {desconto && <span className="card_produto__economia">Economize {formatarPreco(precoAntigo - precoAtual)}</span>}
                </>
              )}
              <span className="card_produto__preco_atual">{formatarPreco(precoAtual)}</span>
            </div>

            <div className="d-flex gap-2">
              <button
                className="card_produto__botao_carrinho flex-grow-1"
                onClick={handleAdicionarAoCarrinho}
                aria-label="Adicionar ao carrinho"
              >
                <BsCartPlus className="card_produto__icone_carrinho" /> Adicionar
              </button>

              {aoAlternarComparacao && (
                <button
                  className={`card_produto__botao_comparar ${estaSelecionado ? 'card_produto__botao_comparar--selecionado' : ''}`}
                  onClick={aoAlternarComparacao}
                  aria-label={estaSelecionado ? "Remover da comparação" : "Adicionar à comparação"}
                >
                  {estaSelecionado ? <BsDashCircle /> : <BsBarChart />}
                </button>
              )}
            </div>
          </div>
        </div>
      </article>

      <ToastContainer position="bottom-right" className="p-3">
        <Toast onClose={() => setMostrarToast(false)} show={mostrarToast} bg="success">
          <Toast.Header>
            <strong className="me-auto">Produto adicionado</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{nome} foi adicionado ao carrinho com sucesso!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default CardProduto;
