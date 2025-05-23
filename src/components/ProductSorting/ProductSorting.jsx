import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './ProductSorting.css';

let ProductSorting = ({ currentSort, onSortChange }) => {
  // Opções de ordenação disponíveis
  let sortOptions = [
    { id: 'featured', name: 'Destaques', icon: 'bi-star-fill' },
    { id: 'price-asc', name: 'Menor preço', icon: 'bi-sort-numeric-down' },
    { id: 'price-desc', name: 'Maior preço', icon: 'bi-sort-numeric-up' },
    { id: 'rating', name: 'Melhor avaliação', icon: 'bi-star-half' },
    { id: 'newest', name: 'Mais recentes', icon: 'bi-calendar-check' }
  ];

  // Encontrar a opção de ordenação atual
  let currentSortOption = sortOptions.find(option => option.id === currentSort) || sortOptions[0];

  return (
    <Dropdown className="product-sorting">
      <Dropdown.Toggle variant="light" id="dropdown-sorting" className="d-flex align-items-center">
        <i className={`bi ${currentSortOption.icon} me-2`}></i>
        <span>Ordenar por: </span>
        <span className="fw-medium ms-1">{currentSortOption.name}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {sortOptions.map(option => (
          <Dropdown.Item 
            key={option.id}
            active={currentSort === option.id}
            onClick={() => onSortChange(option.id)}
            className="d-flex align-items-center"
          >
            <i className={`bi ${option.icon} me-2`}></i>
            {option.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProductSorting;