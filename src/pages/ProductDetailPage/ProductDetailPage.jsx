import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Breadcrumb, Tabs, Tab } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import { getProductById } from '../../data/products';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Buscar dados do produto
  useEffect(() => {
    const fetchProduct = () => {
      try {
        const productData = getProductById(id);
        if (productData) {
          setProduct(productData);
        }
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Funções para manipular quantidade
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };  const handleAddToCart = async () => {
    if (product) {
      try {
        // Chamar a função addToCart com o produto e a quantidade selecionada
        const success = await addToCart(product, quantity);
        
        if (success) {
          // Mostrar mensagem de sucesso
          setShowSuccessMessage(true);
          // Esconder a mensagem após 3 segundos
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        }
      } catch (error) {
        console.error("Erro ao adicionar produto ao carrinho:", error);
        // Opcionalmente, mostrar uma mensagem de erro ao usuário
      }
    }
  };

  // Renderizar estrelas com base na classificação
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

  // Simular galeria de imagens
  const productImages = product ? [
    product.image,
    product.image, // Repetindo a mesma imagem para simular mais fotos
    product.image, // Na implementação real, viria da API
    product.image,
  ] : [];

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3">Carregando detalhes do produto...</p>
      </Container>
    );
  }

  if (!product) {
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
    <Container className="my-5 product-detail-page">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/produtos" }}>Produtos</Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        {/* Galeria de imagens */}
        <Col lg={6} md={6} className="mb-4">
          <div className="product-gallery">
            <div className="product-main-image">
              <img 
                src={productImages[activeImage]} 
                alt={product.name} 
                className="img-fluid main-product-image"
              />
              {product.discount > 0 && (
                <Badge bg="danger" className="product-discount-badge">
                  {product.discount}% OFF
                </Badge>
              )}
            </div>
            <div className="product-thumbnails mt-3 d-flex">
              {productImages.map((img, index) => (
                <div 
                  key={index}
                  className={`product-thumbnail-item ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="img-fluid" />
                </div>
              ))}
            </div>
          </div>
        </Col>

        {/* Detalhes do produto */}
        <Col lg={6} md={6}>
          <div className="product-info">
            <p className="product-brand mb-1">{product.brand}</p>
            <h1 className="product-title mb-3">{product.name}</h1>
            
            <div className="product-rating mb-4">
              <div className="product-stars">
                {renderStars(product.rating)}
              </div>
              <span className="product-review-count">({product.reviewCount} avaliações)</span>
            </div>
            
            <div className="product-price mb-4">
              {product.oldPrice && (
                <span className="product-old-price">R$ {product.oldPrice.toFixed(2).replace('.', ',')}</span>
              )}
              <span className="product-current-price">R$ {product.currentPrice.toFixed(2).replace('.', ',')}</span>
              <span className="product-installments">
                ou 10x de R$ {(product.currentPrice / 10).toFixed(2).replace('.', ',')}
              </span>
            </div>
            
            <div className="product-description mb-4">
              <p>Este produto é perfeito para o seu estilo. Confortável, durável e com design moderno, 
              o {product.name} da {product.brand} é ideal para diversas ocasiões.</p>
            </div>
            
            <div className="product-actions mb-4">
              <div className="quantity-selector d-flex align-items-center mb-3">
                <span className="me-3">Quantidade:</span>
                <div className="quantity-controls">
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="quantity-display">{quantity}</span>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={increaseQuantity}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="d-grid gap-2">
                <Button 
                  className="add-to-cart-btn" 
                  size="lg"
                  onClick={handleAddToCart}
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  Adicionar ao Carrinho
                </Button>
                <Button 
                  variant="light" 
                  className="buy-now-btn" 
                  size="lg"
                >
                  <i className="bi bi-lightning-fill me-2"></i>
                  Comprar Agora
                </Button>
              </div>
            </div>
            
            {showSuccessMessage && (
              <div className="alert alert-success">
                Produto adicionado ao carrinho com sucesso!
              </div>
            )}
            
            <div className="product-meta mt-4">
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
      <div className="product-details-tabs mt-5">
        <Tabs
          defaultActiveKey="description"
          className="mb-4"
        >
          <Tab eventKey="description" title="Descrição">
            <div className="p-4 bg-light rounded">
              <h4>Sobre o Produto</h4>
              <p>O {product.name} da {product.brand} é a escolha perfeita para quem busca conforto e estilo. 
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
              <div className="specs-table">
                <div className="specs-row">
                  <div className="specs-label">Marca</div>
                  <div className="specs-value">{product.brand}</div>
                </div>
                <div className="specs-row">
                  <div className="specs-label">Modelo</div>
                  <div className="specs-value">{product.name}</div>
                </div>
                <div className="specs-row">
                  <div className="specs-label">Categoria</div>
                  <div className="specs-value">{product.category}</div>
                </div>
                <div className="specs-row">
                  <div className="specs-label">Gênero</div>
                  <div className="specs-value">{product.gender === 'male' ? 'Masculino' : 'Feminino'}</div>
                </div>
                <div className="specs-row">
                  <div className="specs-label">Condição</div>
                  <div className="specs-value">{product.condition === 'new' ? 'Novo' : 'Usado'}</div>
                </div>
                <div className="specs-row">
                  <div className="specs-label">Código do Produto</div>
                  <div className="specs-value">SKU-{product.id.toString().padStart(5, '0')}</div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="reviews" title={`Avaliações (${product.reviewCount})`}>
            <div className="p-4 bg-light rounded">
              <div className="d-flex align-items-center mb-4">
                <div className="overall-rating me-4">
                  <div className="rating-number">{product.rating.toFixed(1)}</div>
                  <div className="rating-stars">
                    {renderStars(product.rating)}
                  </div>
                  <div className="rating-count">({product.reviewCount} avaliações)</div>
                </div>
                <div className="rating-summary flex-grow-1">
                  <div className="rating-bar">
                    <span>5 estrelas</span>
                    <div className="progress">
                      <div className="progress-bar bg-success" style={{ width: "70%" }}></div>
                    </div>
                    <span>70%</span>
                  </div>
                  <div className="rating-bar">
                    <span>4 estrelas</span>
                    <div className="progress">
                      <div className="progress-bar bg-success" style={{ width: "20%" }}></div>
                    </div>
                    <span>20%</span>
                  </div>
                  <div className="rating-bar">
                    <span>3 estrelas</span>
                    <div className="progress">
                      <div className="progress-bar bg-warning" style={{ width: "5%" }}></div>
                    </div>
                    <span>5%</span>
                  </div>
                  <div className="rating-bar">
                    <span>2 estrelas</span>
                    <div className="progress">
                      <div className="progress-bar bg-danger" style={{ width: "3%" }}></div>
                    </div>
                    <span>3%</span>
                  </div>
                  <div className="rating-bar">
                    <span>1 estrela</span>
                    <div className="progress">
                      <div className="progress-bar bg-danger" style={{ width: "2%" }}></div>
                    </div>
                    <span>2%</span>
                  </div>
                </div>
              </div>
              
              <Button variant="outline-primary" className="write-review-btn">
                <i className="bi bi-pencil me-2"></i>
                Escrever avaliação
              </Button>
              
              <hr className="my-4" />
              
              <div className="reviews-list">
                <p className="text-center text-muted">
                  As avaliações serão carregadas em breve...
                </p>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>

      {/* Produtos relacionados (simulados) */}
      <div className="related-products mt-5">
        <h3 className="section-title mb-4">Produtos Relacionados</h3>
        <p className="text-center text-muted">
          Os produtos relacionados serão carregados em breve...
        </p>
      </div>
    </Container>
  );
};

export default ProductDetailPage;