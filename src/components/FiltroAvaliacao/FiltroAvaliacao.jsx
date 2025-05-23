import React from 'react';
import { Form } from 'react-bootstrap';
import './FiltroAvaliacao.css';

const FiltroAvaliacao = ({ valor, aoMudar }) => {
  // Função para renderizar estrelas com base no valor atual
  const renderizarEstrelas = (avaliacao) => {
    const estrelas = [];
    const estrelasCompletas = Math.floor(avaliacao);
    const temMeiaEstrela = avaliacao % 1 >= 0.5;
    
    // Adiciona estrelas cheias
    for (let i = 0; i < estrelasCompletas; i++) {
      estrelas.push(<i key={`estrela-${i}`} className="bi bi-star-fill"></i>);
    }
    
    // Adiciona meia estrela, se necessário
    if (temMeiaEstrela) {
      estrelas.push(<i key="meia-estrela" className="bi bi-star-half"></i>);
    }
    
    // Completa com estrelas vazias
    const estrelasVazias = 5 - estrelas.length;
    for (let i = 0; i < estrelasVazias; i++) {
      estrelas.push(<i key={`vazia-${i}`} className="bi bi-star"></i>);
    }
    
    return estrelas;
  };
  
  return (
    <div className="filtro-avaliacao mb-4">
      <h3 className="fs-6 fw-medium mb-2">Avaliação mínima</h3>
        <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span className="valor-avaliacao text-warning">
            {valor > 0 ? renderizarEstrelas(valor) : <span className="text-muted">Sem filtro</span>}
          </span>
          <span className="small text-muted">{valor} estrelas</span>
        </div>
        
        <Form.Range 
          min="0" 
          max="5" 
          step="0.5" 
          value={valor}
          onChange={(e) => aoMudar(parseFloat(e.target.value))}
          aria-label="Filtrar por avaliação mínima"
          className="controle-avaliacao"
        />
        
        <div className="d-flex justify-content-between small text-muted">
          <span>0 ★</span>
          <span>5 ★</span>
        </div>
      </div>
    </div>
  );
};

export default FiltroAvaliacao;
