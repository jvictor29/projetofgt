import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import ProductSorting from '../ProductSorting/ProductSorting';
import './ProductListHeader.css';

let ProductListHeader = ({ 
  totalProducts, 
  currentPage, 
  productsPerPage, 
  onProductsPerPageChange, 
  viewMode,
  onViewModeChange,
  currentSort,
  onSortChange
}) => {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 bg-light p-3 rounded">
      <div className="d-flex align-items-center mb-2 mb-md-0">
        <span className="me-3 text-muted small">
          {currentPage * productsPerPage - productsPerPage + 1} a {Math.min(currentPage * productsPerPage, totalProducts)} de {totalProducts} produtos
        </span>
        <ButtonGroup size="sm" aria-label="Opções de visualização">
          <Button 
            variant="light" 
            className={viewMode === 'grid' ? 'active' : ''}
            aria-label="Visualização em grade"
            onClick={() => onViewModeChange('grid')}
            title="Visualização em grade"
          >
            <i className="bi bi-grid-3x3-gap-fill"></i>
          </Button>
          <Button 
            variant="light" 
            className={viewMode === 'list' ? 'active' : ''}
            aria-label="Visualização em lista"
            onClick={() => onViewModeChange('list')}
            title="Visualização em lista"
          >
            <i className="bi bi-list-ul"></i>
          </Button>
        </ButtonGroup>
      </div>
      
      <div className="d-flex align-items-center">
        {onSortChange && (
          <ProductSorting 
            currentSort={currentSort}
            onSortChange={onSortChange}
            className="me-3"
          />
        )}
        
        <Dropdown align="end" className="ms-2">
          <Dropdown.Toggle variant="light" size="sm" id="viewDropdown">
            {productsPerPage} por página
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item 
              onClick={() => onProductsPerPageChange(15)}
              active={productsPerPage === 15}
            >
              15 por página
            </Dropdown.Item>
            <Dropdown.Item 
              onClick={() => onProductsPerPageChange(30)}
              active={productsPerPage === 30}
            >
              30 por página
            </Dropdown.Item>
            <Dropdown.Item 
              onClick={() => onProductsPerPageChange(45)}
              active={productsPerPage === 45}
            >
              45 por página
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default ProductListHeader;