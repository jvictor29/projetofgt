import React from 'react';
import { Container, Row, Col, Button, Table, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  
  // Calcular subtotal
  const subtotal = cart.reduce((total, item) => total + (item.currentPrice * item.quantity), 0);
  
  // Simular frete (valor fixo para demonstração)
  const shipping = subtotal > 0 ? 15.90 : 0;
  
  // Calcular total
  const total = subtotal + shipping;
  // Função para atualizar a quantidade
  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity >= 1) {
      try {
        await updateQuantity(id, newQuantity);
      } catch (error) {
        console.error('Erro ao atualizar quantidade:', error);
      }
    }
  };

  // Formatar valores para moeda
  const formatCurrency = (value) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  return (
    <Container className="my-5 cart-page">
      <h1 className="mb-4">Meu Carrinho</h1>
      
      {cart.length > 0 ? (
        <Row>
          <Col md={8}>
            <Card className="mb-4">
              <Card.Header className="bg-light">
                <h5 className="mb-0">Itens do Carrinho ({cart.length})</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="text-center" style={{ width: '100px' }}>Produto</th>
                      <th>Descrição</th>
                      <th className="text-center">Preço</th>
                      <th className="text-center">Quantidade</th>
                      <th className="text-center">Total</th>
                      <th className="text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id} className="align-middle">
                        <td className="text-center">
                          <Link to={`/produtos/${item.id}`}>
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="cart-item-img" 
                              style={{ maxWidth: '80px', height: 'auto' }}
                            />
                          </Link>
                        </td>
                        <td>
                          <Link to={`/produtos/${item.id}`} className="text-decoration-none text-dark fw-bold">
                            {item.name}
                          </Link>
                          <div className="text-muted small">{item.brand}</div>
                        </td>
                        <td className="text-center">{formatCurrency(item.currentPrice)}</td>
                        <td className="text-center" style={{ width: '150px' }}>
                          <div className="d-flex align-items-center justify-content-center">
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <Form.Control
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                              className="text-center mx-2"
                              style={{ width: '60px' }}
                            />
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td className="text-center fw-bold">{formatCurrency(item.currentPrice * item.quantity)}</td>
                        <td className="text-center">                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={async () => {
                              try {
                                await removeFromCart(item.id);
                              } catch (error) {
                                console.error('Erro ao remover item:', error);
                              }
                            }}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
              <Card.Footer className="bg-white d-flex justify-content-between">
                <Button 
                  variant="outline-secondary"
                  as={Link}
                  to="/produtos"
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Continuar Comprando
                </Button>                <Button 
                  variant="outline-danger"
                  onClick={async () => {
                    try {
                      await clearCart();
                    } catch (error) {
                      console.error('Erro ao limpar carrinho:', error);
                    }
                  }}
                >
                  <i className="bi bi-trash me-2"></i>
                  Limpar Carrinho
                </Button>
              </Card.Footer>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="mb-4">
              <Card.Header className="bg-light">
                <h5 className="mb-0">Resumo da Compra</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span className="fw-bold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Frete:</span>
                  <span className="fw-bold">{formatCurrency(shipping)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold fs-5 text-primary">{formatCurrency(total)}</span>
                </div>
                <Button variant="success" className="w-100">
                  <i className="bi bi-credit-card me-2"></i>
                  Finalizar Compra
                </Button>
              </Card.Body>
            </Card>
            
            <Card className="promo-code-card">
              <Card.Body>
                <h5>Cupom de Desconto</h5>
                <div className="d-flex mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Digite seu cupom"
                    className="me-2"
                  />
                  <Button variant="outline-primary">Aplicar</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <div className="text-center py-5 empty-cart">
          <i className="bi bi-cart-x display-1 text-muted mb-4"></i>
          <h2>Seu carrinho está vazio</h2>
          <p className="mb-4">Parece que você ainda não adicionou nenhum produto ao seu carrinho.</p>
          <Button 
            variant="primary" 
            as={Link} 
            to="/produtos"
            size="lg"
          >
            <i className="bi bi-bag me-2"></i>
            Ir às Compras
          </Button>
        </div>
      )}
    </Container>
  );
};

export default CartPage;