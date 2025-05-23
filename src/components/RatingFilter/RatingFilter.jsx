import React from 'react';
import { Form } from 'react-bootstrap';

let RatingFilter = ({ value, onChange }) => {
  // Função para renderizar estrelas com base no valor atual
  let renderStars = (rating) => {
    let stars = [];
    let fullStars = Math.floor(rating);
    let hasHalfStar = rating % 1 >= 0.5;
    
    // Adiciona estrelas cheias
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`star-${i}`} className="bi bi-star-fill"></i>);
    }
    
    // Adiciona meia estrela, se necessário
    if (hasHalfStar) {
      stars.push(<i key="half-star" className="bi bi-star-half"></i>);
    }
    
    // Completa com estrelas vazias
    let emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star"></i>);
    }
    
    return stars;
  };
  
  return (
    <div className="rating-filter mb-4">
      <h3 className="fs-6 fw-medium mb-2">Avaliação mínima</h3>
      
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span className="rating-value text-warning">
            {value > 0 ? renderStars(value) : <span className="text-muted">Sem filtro</span>}
          </span>
          <span className="small text-muted">{value} estrelas</span>
        </div>
        
        <Form.Range 
          min="0" 
          max="5" 
          step="0.5" 
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          aria-label="Filtrar por avaliação mínima"
          className="rating-slider"
        />
        
        <div className="d-flex justify-content-between small text-muted">
          <span>0 ★</span>
          <span>5 ★</span>
        </div>
      </div>
    </div>
  );
};

export default RatingFilter;
