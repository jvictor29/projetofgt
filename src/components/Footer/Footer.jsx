import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer mt-5">
      <Container>
        <Row className="footer-main py-5">
          <Col lg={4} md={6} className="mb-4 mb-lg-0">
            <div className="footer-brand mb-4">
              <img src="/logo-footer.svg" alt="Digital Store" />
            </div>
            <p className="footer-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="footer-social mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h5 className="footer-heading">Informações</h5>
            <ul className="footer-links">
              <li><Link to="/sobre">Sobre</Link></li>
              <li><Link to="/contato">Contato</Link></li>
              <li><Link to="/termos">Termos e Condições</Link></li>
              <li><Link to="/devolucoes">Trocas e Devoluções</Link></li>
            </ul>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h5 className="footer-heading">Categorias</h5>
            <ul className="footer-links">
              <li><Link to="/produtos?category=sport">Esporte e Lazer</Link></li>
              <li><Link to="/produtos?category=casual">Casual</Link></li>
              <li><Link to="/produtos?category=utility">Utilitário</Link></li>
              <li><Link to="/produtos?category=running">Corrida</Link></li>
            </ul>
          </Col>
          
          <Col lg={4} md={6}>
            <h5 className="footer-heading">Cadastre-se</h5>
            <p className="footer-text">
              Cadastre-se e receba nossas novidades e promoções
            </p>
            <form className="footer-form mt-3">
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Digite seu email" 
                  aria-label="Digite seu email"
                />
                <button className="btn btn-primary" type="button">
                  Enviar
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
      
      <div className="footer-bottom py-3">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start">
              <p className="mb-0">© 2025 Digital Store. Todos os direitos reservados.</p>
            </Col>
            <Col md={6} className="text-center text-md-end mt-3 mt-md-0">
              <img src="/payment-methods.svg" alt="Métodos de pagamento" className="payment-methods" />
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
