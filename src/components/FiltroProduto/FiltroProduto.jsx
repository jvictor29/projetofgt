/**
 * Componente FiltroProduto
 * 
 * Este componente fornece uma barra lateral de filtros para refinamento da busca de produtos.
 * 
 * Funcionalidades:
 * - Filtro por marcas
 * - Filtro por categorias
 * - Filtro por gênero
 * - Filtro por condição (novo/usado)
 * - Filtro por faixa de preço
 * - Filtro por avaliação (estrelas)
 */

import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import FiltroAvaliacao from '../FiltroAvaliacao/FiltroAvaliacao';
import './FiltroProduto.css';

const FiltroProduto = ({ onFilterChange }) => {
  // Refs para controle
  const previousFilters = useRef(null);
  const isFirstRender = useRef(true);
  
  // Estados para armazenar os valores dos filtros
  const [faixaPreco, setFaixaPreco] = useState(1000);
  const [precoMinimo, setPrecoMinimo] = useState(0);
  const [precoMaximo, setPrecoMaximo] = useState(1000);
  const [avaliacaoMinima, setAvaliacaoMinima] = useState(0);
  const [marcas, setMarcas] = useState({
    adidas: false,
    balenciaga: false,
    kswiss: true,
    nike: false,
    puma: false
  });
  const [categorias, setCategorias] = useState({
    sport: true,
    casual: false,
    utility: false,
    running: false
  });
  const [generos, setGeneros] = useState({
    male: true,
    female: true,
    unisex: false
  });
  const [condicao, setCondicao] = useState('new');
  
  /**
   * Manipula a mudança no controle deslizante da faixa de preço
   * @param {Event} e - Evento de mudança
   */
  const manipularMudancaFaixaPreco = (e) => {
    const valor = parseInt(e.target.value);
    setFaixaPreco(valor);
    setPrecoMaximo(valor);
  };
  
  /**
   * Manipula a mudança nos checkboxes de marca
   * @param {Event} e - Evento de mudança
   */
  const manipularMudancaMarca = (e) => {
    // Extrair o nome da marca do ID removendo a palavra "Filter"
    const nomeMarca = e.target.id.replace('Filter', '').toLowerCase();
    
    setMarcas({
      ...marcas,
      [nomeMarca]: e.target.checked
    });
  };
  
  /**
   * Manipula a mudança nos checkboxes de categoria
   * @param {Event} e - Evento de mudança
   */
  const manipularMudancaCategoria = (e) => {
    // Extrair o nome da categoria do ID removendo a palavra "Category"
    const nomeCategoria = e.target.id.replace('Category', '').toLowerCase();
    
    setCategorias({
      ...categorias,
      [nomeCategoria]: e.target.checked
    });
  };

  /**
   * Manipula a mudança nos checkboxes de gênero
   * @param {Event} e - Evento de mudança
   */
  const manipularMudancaGenero = (e) => {
    setGeneros({
      ...generos,
      [e.target.id]: e.target.checked
    });
  };
  
  /**
   * Manipula a mudança no estado (novo/usado)
   * @param {Event} e - Evento de mudança
   */
  const manipularMudancaCondicao = (e) => {
    setCondicao(e.target.id);
  };

  /**
   * Manipula a mudança no campo de preço mínimo
   * @param {Event} e - Evento de mudança
   */
  const manipularMudancaPrecoMinimo = (e) => {
    const valor = parseInt(e.target.value) || 0;
    setPrecoMinimo(valor);
  };

  /**
   * Manipula a mudança no campo de preço máximo
   * @param {Event} e - Evento de mudança
   */
  const manipularMudancaPrecoMaximo = (e) => {
    const valor = parseInt(e.target.value) || 0;
    setPrecoMaximo(valor);
    if (valor > faixaPreco) {
      setFaixaPreco(valor);
    }
  };
    /**
   * Manipula a mudança na classificação mínima (estrelas)
   * @param {Event} e - Evento de mudança
   */
  // Comentado para evitar erro de linting, mas mantido para referência futura
  // const manipularMudancaAvaliacaoMinima = (e) => {
  //   const valor = parseFloat(e.target.value);
  //   setAvaliacaoMinima(valor);
  // };
  
  /**
   * Seleciona ou desseleciona todas as marcas
   */
  const manipularSelecionarTodasMarcas = () => {
    // Verificar se todas as marcas estão selecionadas
    const todasSelecionadas = Object.values(marcas).every(valor => valor);
    // Inverter o valor
    const novoValor = !todasSelecionadas;
    
    // Criar um novo objeto com todas as marcas marcadas/desmarcadas
    setMarcas({
      adidas: novoValor,
      balenciaga: novoValor,
      kswiss: novoValor,
      nike: novoValor,
      puma: novoValor
    });
  };

  /**
   * Seleciona ou desseleciona todas as categorias
   */
  const manipularSelecionarTodasCategorias = () => {
    // Verificar se todas as categorias estão selecionadas
    const todasSelecionadas = Object.values(categorias).every(valor => valor);
    // Inverter o valor
    const novoValor = !todasSelecionadas;
    
    // Criar um novo objeto com todas as categorias marcadas/desmarcadas
    setCategorias({
      sport: novoValor,
      casual: novoValor,
      utility: novoValor,
      running: novoValor
    });
  };

  /**
   * Seleciona ou desseleciona todos os gêneros
   */
  const manipularSelecionarTodosGeneros = () => {
    // Verificar se todos os gêneros estão selecionados
    const todosSelecionados = Object.values(generos).every(valor => valor);
    // Inverter o valor
    const novoValor = !todosSelecionados;
    
    // Criar um novo objeto com todos os gêneros marcados/desmarcados
    setGeneros({
      male: novoValor,
      female: novoValor,
      unisex: novoValor
    });
  };
  /**
   * Aplica os filtros selecionados
   */
  const aplicarFiltros = () => {
    // Aqui montamos o objeto de filtros completo
    const filtros = {
      marcas: Object.entries(marcas)
        .filter(([, selecionado]) => selecionado)
        .map(([marca]) => marca),
      categorias: Object.entries(categorias)
        .filter(([, selecionado]) => selecionado)
        .map(([categoria]) => categoria),
      generos: Object.entries(generos)
        .filter(([, selecionado]) => selecionado)
        .map(([genero]) => genero),
      precoMinimo,
      precoMaximo,
      avaliacaoMinima,
      condicao
    };
    
    // Verificar se os filtros são iguais aos anteriores
    const filtersString = JSON.stringify(filtros);
    if (previousFilters.current === filtersString) return;
    
    // Atualizar a referência
    previousFilters.current = filtersString;
    
    // Chamar a função de callback com os filtros selecionados
    onFilterChange(filtros);
  };/**
   * Efeito para aplicar filtros quando os valores mudarem
   */  useEffect(() => {
    // Usar a ref já declarada fora do useEffect
    
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    // Para evitar loops, só aplica os filtros se não for primeira montagem
    aplicarFiltros();
  }, [marcas, categorias, generos, precoMinimo, precoMaximo, avaliacaoMinima, condicao]);
  return (
    <aside className="barra-lateral-filtro-produto">
      <section className="p-3 bg-white rounded shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fs-5 fw-bold m-0">Filtros</h2>
          <Button 
            variant="link" 
            className="text-decoration-none text-muted p-0"
            onClick={() => {
              setMarcas({
                adidas: false,
                balenciaga: false,
                kswiss: false,
                nike: false,
                puma: false
              });
              setCategorias({
                sport: false,
                casual: false,
                utility: false,
                running: false
              });
              setGeneros({
                male: false,
                female: false,
                unisex: false
              });
              setPrecoMinimo(0);
              setPrecoMaximo(1000);
              setFaixaPreco(1000);
              setAvaliacaoMinima(0);
              setCondicao('new');
            }}
          >
            Limpar
          </Button>
        </div>

        {/* Filtro de marca */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3 className="fs-6 fw-medium m-0">Marca</h3>
            <Button 
              variant="link" 
              className="text-decoration-none text-muted p-0 small"
              onClick={manipularSelecionarTodasMarcas}
            >
              {Object.values(marcas).every(v => v) ? 'Desmarcar todos' : 'Selecionar todos'}
            </Button>
          </div>
          <Form>
            <Form.Check 
              type="checkbox"
              id="nikeFilter"
              label="Nike"
              checked={marcas.nike}
              onChange={manipularMudancaMarca}
              className="mb-2"
            />
            <Form.Check 
              type="checkbox"
              id="adidasFilter"
              label="Adidas"
              checked={marcas.adidas}
              onChange={manipularMudancaMarca}
              className="mb-2"
            />
            <Form.Check 
              type="checkbox"
              id="pumaFilter"
              label="Puma"
              checked={marcas.puma}
              onChange={manipularMudancaMarca}
              className="mb-2"
            />
            <Form.Check 
              type="checkbox"
              id="kswissFilter"
              label="K-Swiss"
              checked={marcas.kswiss}
              onChange={manipularMudancaMarca}
              className="mb-2"
            />
            <Form.Check 
              type="checkbox"
              id="balenciagaFilter"
              label="Balenciaga"
              checked={marcas.balenciaga}
              onChange={manipularMudancaMarca}
            />
          </Form>
        </div>

        {/* Filtro de categoria */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3 className="fs-6 fw-medium m-0">Categoria</h3>
            <Button 
              variant="link" 
              className="text-decoration-none text-muted p-0 small"
              onClick={manipularSelecionarTodasCategorias}
            >
              {Object.values(categorias).every(v => v) ? 'Desmarcar todos' : 'Selecionar todos'}
            </Button>
          </div>
          <Form>
            <Form.Check 
              type="checkbox"
              id="sportCategory"
              label="Esportivo"
              checked={categorias.sport}
              onChange={manipularMudancaCategoria}
              className="mb-2"
            />
            <Form.Check 
              type="checkbox"
              id="casualCategory"
              label="Casual"
              checked={categorias.casual}
              onChange={manipularMudancaCategoria}
              className="mb-2"
            />
            <Form.Check 
              type="checkbox"
              id="utilityCategory"
              label="Utilitário"
              checked={categorias.utility}
              onChange={manipularMudancaCategoria}
              className="mb-2"
            />
            <Form.Check 
              type="checkbox"
              id="runningCategory"
              label="Corrida"
              checked={categorias.running}
              onChange={manipularMudancaCategoria}
            />
          </Form>
        </div>

        {/* Filtro de gênero */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3 className="fs-6 fw-medium m-0">Gênero</h3>
            <Button 
              variant="link" 
              className="text-decoration-none text-muted p-0 small"
              onClick={manipularSelecionarTodosGeneros}
            >
              {Object.values(generos).every(v => v) ? 'Desmarcar todos' : 'Selecionar todos'}
            </Button>
          </div>
          <Form>
            <Form.Check 
              type="checkbox"
              id="male"
              label="Masculino"
              checked={generos.male}
              onChange={manipularMudancaGenero}
              className="mb-2"
            />
            <Form.Check 
              type="checkbox"
              id="female"
              label="Feminino"
              checked={generos.female}
              onChange={manipularMudancaGenero}
              className="mb-2"
            />
            <Form.Check 
              type="checkbox"
              id="unisex"
              label="Unissex"
              checked={generos.unisex}
              onChange={manipularMudancaGenero}
            />
          </Form>
        </div>

        {/* Filtro de condição (novo/usado) */}
        <div className="mb-4">
          <h3 className="fs-6 fw-medium mb-2">Condição</h3>
          <div>
            <Form>
              <Form.Check 
                type="radio"
                id="new"
                name="condition"
                label="Novo"
                checked={condicao === 'new'}
                onChange={manipularMudancaCondicao}
                className="mb-2"
              />
              <Form.Check 
                type="radio"
                id="used"
                name="condition"
                label="Usado"
                checked={condicao === 'used'}
                onChange={manipularMudancaCondicao}
              />
            </Form>
          </div>
        </div>

        {/* Filtro de preço */}
        <div className="mb-4">
          <h3 className="fs-6 fw-medium mb-2">Faixa de preço</h3>
          <div className="mb-3">
            <div className="d-flex justify-content-between small text-muted mb-2">
              <span>R$ 0</span>
              <span>R$ {faixaPreco}</span>
            </div>
            <Form.Range 
              min="0" 
              max="1000" 
              step="50" 
              value={faixaPreco}
              onChange={manipularMudancaFaixaPreco}
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
                  value={precoMinimo}
                  onChange={manipularMudancaPrecoMinimo}
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
                  value={precoMaximo}
                  onChange={manipularMudancaPrecoMaximo}
                  aria-label="Preço máximo"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Filtro por estrelas */}
        <FiltroAvaliacao 
          valor={avaliacaoMinima} 
          aoMudar={(valor) => setAvaliacaoMinima(valor)} 
        />

        {/* Botão de aplicar filtros */}
        <Button 
          variant="danger" 
          className="w-100 rounded-pill d-flex justify-content-center align-items-center gap-2"
          onClick={aplicarFiltros}
        >
          <i className="bi bi-funnel-fill"></i>
          <span>Aplicar filtros</span>
        </Button>
      </section>
    </aside>
  );
};

export default FiltroProduto;
