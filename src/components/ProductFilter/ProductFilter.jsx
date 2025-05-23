import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import RatingFilter from '../RatingFilter/RatingFilter';
import './ProductFilter.css';

let ProductFilter = ({ onFilterChange }) => {
  // Estados para armazenar os valores dos filtros
  let [priceRange, setPriceRange] = useState(1000);
  let [minPrice, setMinPrice] = useState(0);
  let [maxPrice, setMaxPrice] = useState(1000);
  let [minRating, setMinRating] = useState(0);
  let [brands, setBrands] = useState({
    adidas: false,
    balenciaga: false,
    kswiss: true,
    nike: false,
    puma: false
  });
  let [categories, setCategories] = useState({
    sport: true,
    casual: false,
    utility: false,
    running: false  });
  let [genders, setGenders] = useState({
    male: true,
    female: true,
    unisex: false
  });
  let [condition, setCondition] = useState('new');
    // Função para lidar com a mudança no filtro de preço
  let handlePriceRangeChange = (e) => {
    let value = parseInt(e.target.value);
    setPriceRange(value);
    setMaxPrice(value);
  };  // Lidar com mudanças nos checkboxes de marca
  let handleBrandChange = (e) => {
    // Extrair o nome da marca do ID removendo a palavra "Filter"
    let brandName = e.target.id.replace('Filter', '').toLowerCase();
    
    setBrands({
      ...brands,
      [brandName]: e.target.checked
    });
  };
  // Lidar com mudanças nos checkboxes de categoria
  let handleCategoryChange = (e) => {
    // Extrair o nome da categoria do ID removendo a palavra "Category" (com C maiúsculo)
    let categoryName = e.target.id.replace('Category', '').toLowerCase();
    
    setCategories({
      ...categories,
      [categoryName]: e.target.checked
    });
  };

  // Lidar com mudanças nos checkboxes de gênero
  let handleGenderChange = (e) => {
    setGenders({
      ...genders,
      [e.target.id]: e.target.checked
    });
  };
  // Lidar com mudanças no estado (novo/usado)
  let handleConditionChange = (e) => {
    setCondition(e.target.id);
  };

  // Lidar com mudanças no preço mínimo
  let handleMinPriceChange = (e) => {
    let value = parseInt(e.target.value) || 0;
    setMinPrice(value);
  };

  // Lidar com mudanças no preço máximo
  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setMaxPrice(value);
    if (value > priceRange) {
      setPriceRange(value);
    }
  };
  
  // Lidar com mudanças na classificação mínima
  const handleMinRatingChange = (e) => {
    const value = parseFloat(e.target.value);
    setMinRating(value);
  };
  // Função para selecionar/desselecionar todas as marcas
  const handleSelectAllBrands = () => {
    // Verificar se todas as marcas estão selecionadas
    const allSelected = Object.values(brands).every(value => value);
    // Inverter o valor (se todas estiverem selecionadas, desmarcar todas; caso contrário, selecionar todas)
    const newValue = !allSelected;
    
    // Criar um novo objeto com todas as marcas marcadas/desmarcadas
    setBrands({
      adidas: newValue,
      balenciaga: newValue,
      kswiss: newValue,
      nike: newValue,
      puma: newValue
    });
  };
  // Função para selecionar/desselecionar todas as categorias
  const handleSelectAllCategories = () => {
    // Verificar se todas as categorias estão selecionadas
    const allSelected = Object.values(categories).every(value => value);
    // Inverter o valor (se todas estiverem selecionadas, desmarcar todas; caso contrário, selecionar todas)
    const newValue = !allSelected;
    
    // Criar um novo objeto com todas as categorias marcadas/desmarcadas
    setCategories({
      sport: newValue,
      casual: newValue,
      utility: newValue,
      running: newValue
    });
  };
  // Função para selecionar/desselecionar todos os gêneros
  const handleSelectAllGenders = () => {
    // Verificar se todos os gêneros estão selecionados
    const allSelected = Object.values(genders).every(value => value);
    // Inverter o valor (se todos estiverem selecionados, desmarcar todos; caso contrário, selecionar todos)
    const newValue = !allSelected;
    
    // Criar um novo objeto com todos os gêneros marcados/desmarcados
    setGenders({
      male: newValue,
      female: newValue,
      unisex: newValue
    });
  };
  // Efeito para aplicar filtros automaticamente quando os valores mudarem
  useEffect(() => {
    const activeFilters = {};
    
    // Adicionar filtros de marca
    const selectedBrands = Object.entries(brands)
      .filter(([_, isSelected]) => isSelected)
      .map(([brand]) => brand);
    
    if (selectedBrands.length > 0) {
      activeFilters.brands = selectedBrands;
    }
    
    // Adicionar filtros de preço
    activeFilters.priceRange = {
      min: minPrice,
      max: maxPrice
    };
    
    // Adicionar filtros de categoria
    const selectedCategories = Object.entries(categories)
      .filter(([_, isSelected]) => isSelected)
      .map(([category]) => category);
    
    if (selectedCategories.length > 0) {
      activeFilters.categories = selectedCategories;
    }
    
    // Adicionar filtros de gênero
    const selectedGenders = Object.entries(genders)
      .filter(([_, isSelected]) => isSelected)
      .map(([gender]) => gender);
    
    if (selectedGenders.length > 0) {
      activeFilters.genders = selectedGenders;
    }
    
    // Adicionar filtro de estado
    activeFilters.condition = condition;
    
    // Adicionar filtro de classificação mínima
    if (minRating > 0) {
      activeFilters.minRating = minRating;
    }
    
    // Passar os filtros para o componente pai
    return () => {};
  }, [brands, categories, genders, condition, minPrice, maxPrice, minRating]);
    // Função para aplicar os filtros
  const applyFilters = () => {
    // Coletar todos os valores de filtro
    const filters = {
      priceRange: {
        min: minPrice,
        max: maxPrice
      }
    };
    
    // Adicionar filtros de marca
    const selectedBrands = Object.entries(brands)
      .filter(([_, isSelected]) => isSelected)
      .map(([brand]) => brand);
    
    if (selectedBrands.length > 0) {
      filters.brands = selectedBrands;
    }
    
    // Adicionar filtros de categoria
    const selectedCategories = Object.entries(categories)
      .filter(([_, isSelected]) => isSelected)
      .map(([category]) => category);
    
    if (selectedCategories.length > 0) {
      filters.categories = selectedCategories;
    }
    
    // Adicionar filtros de gênero
    const selectedGenders = Object.entries(genders)
      .filter(([_, isSelected]) => isSelected)
      .map(([gender]) => gender);
    
    if (selectedGenders.length > 0) {
      filters.genders = selectedGenders;
    }
    
    // Adicionar filtro de estado
    filters.condition = condition;
    
    // Adicionar filtro de classificação mínima (estrelas)
    if (minRating > 0) {
      filters.minRating = minRating;
    }
    
    // Passar os filtros para o componente pai
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  return (
    <aside className="col-md-3 mb-4">
      <section className="secao_filtro p-4 rounded shadow-sm" aria-labelledby="filtrosTitulo">
        <h2 id="filtrosTitulo" className="fs-6 fw-bold mb-3">Filtrar por</h2>        {/* Grupo de filtro: Marca */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3 className="fs-6 fw-medium mb-0">Marca</h3>
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 text-decoration-none" 
              onClick={handleSelectAllBrands}
            >
              {Object.values(brands).every(value => value) ? 'Desmarcar todos' : 'Selecionar todos'}
            </Button>
          </div>
          <div className="opcao_filtro mb-2">
            <Form.Check 
              type="checkbox" 
              id="adidasFilter" 
              label="Adidas"
              checked={brands.adidas}
              onChange={handleBrandChange}
            />
          </div>
          <div className="opcao_filtro mb-2">
            <Form.Check 
              type="checkbox" 
              id="balenciagaFilter" 
              label="Balenciaga"
              checked={brands.balenciaga}
              onChange={handleBrandChange}
            />
          </div>          <div className="opcao_filtro mb-2">
            <Form.Check 
              type="checkbox" 
              id="kswissFilter" 
              label="K-Swiss"
              checked={brands.kswiss}
              onChange={handleBrandChange}
            />
          </div><div className="opcao_filtro mb-2">
            <Form.Check 
              type="checkbox" 
              id="nikeFilter" 
              label="Nike"
              checked={brands.nike}
              onChange={handleBrandChange}
            />
          </div>
          <div className="opcao_filtro mb-2">
            <Form.Check 
              type="checkbox" 
              id="pumaFilter" 
              label="Puma"
              checked={brands.puma}
              onChange={handleBrandChange}
            />
          </div>
        </div>        {/* Grupo de filtro: Categoria */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3 className="fs-6 fw-medium mb-0">Categoria</h3>
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 text-decoration-none" 
              onClick={handleSelectAllCategories}
            >
              {Object.values(categories).every(value => value) ? 'Desmarcar todos' : 'Selecionar todos'}
            </Button>
          </div>          <div className="opcao_filtro mb-2">
            <Form.Check 
              type="checkbox" 
              id="sportCategory" 
              label="Esporte e lazer"
              checked={categories.sport}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="opcao_filtro mb-2">
            <Form.Check 
              type="checkbox" 
              id="casualCategory" 
              label="Casual"
              checked={categories.casual}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="opcao_filtro mb-2">
            <Form.Check 
              type="checkbox" 
              id="utilityCategory" 
              label="Utilitário"
              checked={categories.utility}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="opcao_filtro mb-2">
            <Form.Check 
              type="checkbox" 
              id="runningCategory" 
              label="Corrida"
              checked={categories.running}
              onChange={handleCategoryChange}
            />
          </div>
        </div>        {/* Grupo de filtro: Gênero */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3 className="fs-6 fw-medium mb-0">Gênero</h3>
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 text-decoration-none" 
              onClick={handleSelectAllGenders}
            >
              {Object.values(genders).every(value => value) ? 'Desmarcar todos' : 'Selecionar todos'}
            </Button>
          </div>
          <div className="opcao_filtro mb-2">
            <Form.Check 
              type="checkbox" 
              id="male" 
              label="Masculino"
              checked={genders.male}
              onChange={handleGenderChange}
            />
          </div><div className="opcao_filtro mb-2">
            <Form.Check 
              type="checkbox" 
              id="female" 
              label="Feminino"
              checked={genders.female}
              onChange={handleGenderChange}
            />
          </div>
          <div className="opcao_filtro mb-2">
            <Form.Check 
              type="checkbox" 
              id="unisex" 
              label="Unisex"
              checked={genders.unisex}
              onChange={handleGenderChange}
            />
          </div>
        </div>

        {/* Grupo de filtro: Estado */}
        <div className="mb-4">
          <h3 className="fs-6 fw-medium mb-2">Estado</h3>          <div className="opcao_filtro mb-2">
            <Form.Check 
              type="radio" 
              name="estado" 
              id="new" 
              label="Novo"
              onChange={handleConditionChange}
              checked={condition === 'new'}
            />
          </div>
          <div className="opcao_filtro mb-2">
            <Form.Check 
              type="radio" 
              name="estado" 
              id="used" 
              label="Usado"
              onChange={handleConditionChange}
              checked={condition === 'used'}
            />
          </div>
        </div>

        {/* Filtro de preço */}
        <div className="mb-4">
          <h3 className="fs-6 fw-medium mb-2">Faixa de preço</h3>
          <div className="mb-3">
            <div className="d-flex justify-content-between small text-muted mb-2">
              <span>R$ 0</span>
              <span>R$ {priceRange}</span>
            </div>                <Form.Range 
                  min="0" 
                  max="1000" 
                  step="50" 
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  aria-label="Ajustar faixa de preço"
                />
              </div>
              <div className="row g-2">
                <div className="col-6">
                  <div className="input-group input-group-sm">
                    <span className="input-group-text">R$</span>
                    <Form.Control 
                      type="number" 
                      placeholder="Mín." 
                      value={minPrice}
                      onChange={handleMinPriceChange}
                      aria-label="Preço mínimo"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group input-group-sm">
                    <span className="input-group-text">R$</span>
                    <Form.Control 
                      type="number" 
                      placeholder="Máx." 
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                      aria-label="Preço máximo"
                    />
              </div>
            </div>
          </div>
        </div>        {/* Filtro por estrelas */}
        <RatingFilter 
          value={minRating} 
          onChange={(value) => setMinRating(value)} 
        />

        {/* Botão de aplicar filtros */}
        <Button 
          variant="danger" 
          className="w-100 rounded-pill d-flex justify-content-center align-items-center gap-2"
          onClick={applyFilters}
        >
          <i className="bi bi-funnel-fill"></i>
          <span>Aplicar filtros</span>
        </Button>
      </section>
    </aside>
  );
};

export default ProductFilter;
