import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Breadcrumb, Tabs, Tab } from 'react-bootstrap';
import { useCarrinho } from '../../context/ContextoCarrinho';
import { obterProdutoPorId } from '../../data/produtos';
import './PaginaDetalhesProduto.css';

let PaginaDetalhesProduto = () => {
  let { id } = useParams();
  let { adicionarAoCarrinho } = useCarrinho();
  let [produto, setProduto] = useState(null);
  let [carregando, setCarregando] = useState(true);
  let [quantidade, setQuantidade] = useState(1);
  let [imagemAtiva, setImagemAtiva] = useState(0);
  let [mostrarMensagemSucesso, setMostrarMensagemSucesso] = useState(false);
  // Buscar dados do produto
  useEffect(() => {
    let estaMontado = true;
    
    let buscarProduto = () => {
      try {
        let dadosProduto = obterProdutoPorId(id);
        if (dadosProduto && estaMontado) {
          setProduto(dadosProduto);
        }
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        if (estaMontado) {
          setCarregando(false);
        }
      }
    };
    
    buscarProduto();
    
    // Limpeza para evitar atualizações de estado após desmontagem
    return () => {
      estaMontado = false;
    };
  }, [id]);

  // Funções para manipular quantidade
  const aumentarQuantidade = () => {
    setQuantidade(prev => prev + 1);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(prev => prev - 1);
    }
  };  
  const handleAdicionarAoCarrinho = async () => {
    if (produto) {
      try {
        // Chamar a função adicionarAoCarrinho com o produto e a quantidade selecionada
        const sucesso = await adicionarAoCarrinho(produto, quantidade);
        
        if (sucesso) {
          // Mostrar mensagem de sucesso
          setMostrarMensagemSucesso(true);
        }
      } catch (error) {
        console.error("Erro ao adicionar produto ao carrinho:", error);
        // Opcionalmente, mostrar uma mensagem de erro ao usuário
      }
    }
  };

  // Efeito para gerenciar o tempo de exibição da mensagem de sucesso
  useEffect(() => {
    let timeoutId;
    
    if (mostrarMensagemSucesso) {
      timeoutId = setTimeout(() => {
        setMostrarMensagemSucesso(false);
      }, 3000);
    }
    
    // Limpar timeout se o componente for desmontado ou a mensagem mudar
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [mostrarMensagemSucesso]);

  // Renderizar estrelas com base na classificação
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

  // Simular galeria de imagens
  const imagensProduto = produto ? [
    produto.image,
    produto.image, // Repetindo a mesma imagem para simular mais fotos
    produto.image, // Na implementação real, viria da API
    produto.image,
  ] : [];

  if (carregando) {
    return (
      <Container className="my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3">Carregando detalhes do produto...</p>
      </Container>
    );
  }

  if (!produto) {
    return (
      <Container className="my-5 text-center">
        <div className="alert alert-warning">
          <h2>Produto não encontrado</h2>
          <p>O produto que você está procurando não existe ou foi removido.</p>
          <Link to="/produtos" className="btn btn-primary mt-3">
            Voltar para a lista de produtos
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5 pagina-detalhes-produto">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/produtos" }}>Produtos</Breadcrumb.Item>
        <Breadcrumb.Item active>{produto.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        {/* Galeria de imagens */}
        <Col lg={6} md={6} className="mb-4">
          <div className="galeria-produto">
            <div className="imagem-principal-produto">
              <img 
                src={imagensProduto[imagemAtiva]} 
                alt={produto.name} 
                className="img-fluid imagem-produto-principal"
              />
              {produto.discount > 0 && (
                <Badge bg="danger" className="selo-desconto-produto">
                  {produto.discount}% OFF
                </Badge>
              )}
            </div>
            <div className="miniaturas-produto mt-3 d-flex">
              {imagensProduto.map((img, index) => (
                <div 
                  key={index}
                  className={`item-miniatura-produto ${imagemAtiva === index ? 'ativo' : ''}`}
                  onClick={() => setImagemAtiva(index)}
                >
                  <img src={img} alt={`Miniatura ${index + 1}`} className="img-fluid" />
                </div>
              ))}
            </div>
          </div>
        </Col>

        {/* Detalhes do produto */}
        <Col lg={6} md={6}>
          <div className="info-produto">
            <p className="marca-produto mb-1">{produto.brand}</p>
            <h1 className="titulo-produto mb-3">{produto.name}</h1>
            
            <div className="avaliacao-produto mb-4">
              <div className="estrelas-produto">
                {renderizarEstrelas(produto.rating)}
              </div>
              <span className="contagem-avaliacao-produto">({produto.reviewCount} avaliações)</span>
            </div>
            
            <div className="preco-produto mb-4">
              {produto.oldPrice && (
                <span className="preco-antigo-produto">R$ {produto.oldPrice.toFixed(2).replace('.', ',')}</span>
              )}
              <span className="preco-atual-produto">R$ {produto.currentPrice.toFixed(2).replace('.', ',')}</span>
              <span className="parcelas-produto">
                ou 10x de R$ {(produto.currentPrice / 10).toFixed(2).replace('.', ',')}
              </span>
            </div>
            
            <div className="descricao-produto mb-4">
              <p>Este produto é perfeito para o seu estilo. Confortável, durável e com design moderno, 
              o {produto.name} da {produto.brand} é ideal para diversas ocasiões.</p>
            </div>
            
            <div className="acoes-produto mb-4">
              <div className="seletor-quantidade d-flex align-items-center mb-3">
                <span className="me-3">Quantidade:</span>
                <div className="controles-quantidade">
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={diminuirQuantidade}
                    disabled={quantidade <= 1}
                  >
                    -
                  </Button>
                  <span className="exibicao-quantidade">{quantidade}</span>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={aumentarQuantidade}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="d-grid gap-2">
                <Button 
                  className="btn-adicionar-carrinho" 
                  size="lg"
                  onClick={handleAdicionarAoCarrinho}
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  Adicionar ao Carrinho
                </Button>
                <Button 
                  variant="light" 
                  className="btn-comprar-agora" 
                  size="lg"
                >
                  <i className="bi bi-lightning-fill me-2"></i>
                  Comprar Agora
                </Button>
              </div>
            </div>
            
            {mostrarMensagemSucesso && (
              <div className="alert alert-success">
                Produto adicionado ao carrinho com sucesso!
              </div>
            )}
            
            <div className="meta-produto mt-4">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-truck me-2"></i>
                <span>Frete grátis para compras acima de R$ 200,00</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-arrow-repeat me-2"></i>
                <span>30 dias para troca ou devolução</span>
              </div>
              <div className="d-flex align-items-center">
                <i className="bi bi-shield-check me-2"></i>
                <span>Garantia de 1 ano</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Tabs de informações adicionais */}
      <div className="tabs-detalhes-produto mt-5">
        <Tabs
          defaultActiveKey="description"
          className="mb-4"
        >
          <Tab eventKey="description" title="Descrição">
            <div className="p-4 bg-light rounded">
              <h4>Sobre o Produto</h4>
              <p>O {produto.name} da {produto.brand} é a escolha perfeita para quem busca conforto e estilo. 
              Fabricado com materiais de alta qualidade, proporciona aderência excepcional e suporte para seus pés.</p>
              
              <h5 className="mt-4">Características</h5>
              <ul>
                <li>Cabedal em material respirável</li>
                <li>Entressola com tecnologia de amortecimento</li>
                <li>Solado de borracha para melhor aderência</li>
                <li>Design moderno e versátil</li>
                <li>Ideal para uso casual e esportivo</li>
              </ul>
            </div>
          </Tab>
          <Tab eventKey="specifications" title="Especificações">
            <div className="p-4 bg-light rounded">
              <h4>Especificações Técnicas</h4>
              <div className="tabela-especificacoes">
                <div className="linha-especificacoes">
                  <div className="rotulo-especificacoes">Marca</div>
                  <div className="valor-especificacoes">{produto.brand}</div>
                </div>
                <div className="linha-especificacoes">
                  <div className="rotulo-especificacoes">Modelo</div>
                  <div className="valor-especificacoes">{produto.name}</div>
                </div>
                <div className="linha-especificacoes">
                  <div className="rotulo-especificacoes">Categoria</div>
                  <div className="valor-especificacoes">{produto.category}</div>
                </div>
                <div className="linha-especificacoes">
                  <div className="rotulo-especificacoes">Gênero</div>
                  <div className="valor-especificacoes">{produto.gender === 'male' ? 'Masculino' : 'Feminino'}</div>
                </div>
                <div className="linha-especificacoes">
                  <div className="rotulo-especificacoes">Condição</div>
                  <div className="valor-especificacoes">{produto.condition === 'new' ? 'Novo' : 'Usado'}</div>
                </div>
                <div className="linha-especificacoes">
                  <div className="rotulo-especificacoes">Código do Produto</div>
                  <div className="valor-especificacoes">SKU-{produto.id.toString().padStart(5, '0')}</div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="reviews" title={`Avaliações (${produto.reviewCount})`}>
            <div className="p-4 bg-light rounded">
              <div className="d-flex align-items-center mb-4">
                <div className="avaliacao-geral me-4">
                  <div className="numero-avaliacao">{produto.rating.toFixed(1)}</div>
                  <div className="estrelas-avaliacao">
                    {renderizarEstrelas(produto.rating)}
                  </div>
                  <div className="contagem-avaliacao">({produto.reviewCount} avaliações)</div>
                </div>
                <div className="resumo-avaliacao flex-grow-1">
                  <div className="barra-avaliacao">
                    <span>5 estrelas</span>
                    <div className="progress">
                      <div className="progress-bar bg-success" style={{ width: "70%" }}></div>
                    </div>
                    <span>70%</span>
                  </div>
                  <div className="barra-avaliacao">
                    <span>4 estrelas</span>
                    <div className="progress">
                      <div className="progress-bar bg-success" style={{ width: "20%" }}></div>
                    </div>
                    <span>20%</span>
                  </div>
                  <div className="barra-avaliacao">
                    <span>3 estrelas</span>
                    <div className="progress">
                      <div className="progress-bar bg-warning" style={{ width: "5%" }}></div>
                    </div>
                    <span>5%</span>
                  </div>
                  <div className="barra-avaliacao">
                    <span>2 estrelas</span>
                    <div className="progress">
                      <div className="progress-bar bg-danger" style={{ width: "3%" }}></div>
                    </div>
                    <span>3%</span>
                  </div>
                  <div className="barra-avaliacao">
                    <span>1 estrela</span>
                    <div className="progress">
                      <div className="progress-bar bg-danger" style={{ width: "2%" }}></div>
                    </div>
                    <span>2%</span>
                  </div>
                </div>
              </div>
              
              <Button variant="outline-primary" className="btn-escrever-avaliacao">
                <i className="bi bi-pencil me-2"></i>
                Escrever avaliação
              </Button>
              
              <hr className="my-4" />
              
              <div className="lista-avaliacoes">
                <p className="text-center text-muted">
                  As avaliações serão carregadas em breve...
                </p>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>

      {/* Produtos relacionados (simulados) */}
      <div className="produtos-relacionados mt-5">
        <h3 className="titulo-secao mb-4">Produtos Relacionados</h3>
        <p className="text-center text-muted">
          Os produtos relacionados serão carregados em breve...
        </p>
      </div>
    </Container>
  );
};

export default PaginaDetalhesProduto;
