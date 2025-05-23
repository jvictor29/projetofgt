import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './HomePage.css';

const HomePage = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10} className="text-center">
          <h1 className="display-4">Bem-vindo à Digital Store</h1>
          <p className="lead">
            A página inicial está em desenvolvimento. Por favor, acesse a página de produtos para visualizar nosso catálogo.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;