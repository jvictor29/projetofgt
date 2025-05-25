import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import FiltroAvaliacao from '../FiltroAvaliacao/FiltroAvaliacao';
import './FiltroProduto.css';

const FiltroProduto = ({ onFilterChange }) => {
  const [marcas, setMarcas] = useState({
    nike: false,
    adidas: false,
    puma: false,
    kswiss: false,
    balenciaga: false,
  });

  const [categorias, setCategorias] = useState({
    sport: false,
    casual: false,
    utility: false,
    running: false,
    training: false,
  });

  const [generos, setGeneros] = useState({
    male: false,
    female: false,
    unisex: false,
  });

  const [condicao, setCondicao] = useState('new');
  const [precoMinimo, setPrecoMinimo] = useState(0);
  const [precoMaximo, setPrecoMaximo] = useState(1000);
  const [avaliacaoMinima, setAvaliacaoMinima] = useState(0);

  const previousFilters = useRef(null);

  const aplicarFiltros = () => {
    const filtros = {
      brands: Object.entries(marcas).filter(([_, v]) => v).map(([k]) => k.toLowerCase()),
      categories: Object.entries(categorias).filter(([_, v]) => v).map(([k]) => k),
      genders: Object.entries(generos).filter(([_, v]) => v).map(([k]) => k),
      condition: condicao,
      priceRange: { min: precoMinimo, max: precoMaximo },
      minRating: avaliacaoMinima,
    };

    const stringFiltros = JSON.stringify(filtros);
    if (previousFilters.current !== stringFiltros) {
      previousFilters.current = stringFiltros;
      onFilterChange(filtros);
    }
  };

  useEffect(() => {
    aplicarFiltros();
  }, [marcas, categorias, generos, condicao, precoMinimo, precoMaximo, avaliacaoMinima]);

  const limparFiltros = () => {
    setMarcas({
      nike: false,
      adidas: false,
      puma: false,
      kswiss: false,
      balenciaga: false,
    });
    setCategorias({
      sport: false,
      casual: false,
      utility: false,
      running: false,
      training: false,
    });
    setGeneros({
      male: false,
      female: false,
      unisex: false,
    });
    setCondicao('new');
    setPrecoMinimo(0);
    setPrecoMaximo(1000);
    setAvaliacaoMinima(0);
  };

  const alterarCheckbox = (estado, setEstado, id) => {
    setEstado({ ...estado, [id]: !estado[id] });
  };

  return (
    <aside className="barra-lateral-filtro-produto p-3 bg-white shadow-sm rounded">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fs-5 fw-bold">Filtros</h2>
        <Button variant="link" className="text-muted p-0" onClick={limparFiltros}>Limpar</Button>
      </div>

      <h5>Marca</h5>
      {Object.keys(marcas).map(marca => (
        <Form.Check
          key={marca}
          type="checkbox"
          label={marca.charAt(0).toUpperCase() + marca.slice(1)}
          checked={marcas[marca]}
          onChange={() => alterarCheckbox(marcas, setMarcas, marca)}
        />
      ))}

      <h5 className="mt-4">Categoria</h5>
      {Object.keys(categorias).map(cat => (
        <Form.Check
          key={cat}
          type="checkbox"
          label={cat.charAt(0).toUpperCase() + cat.slice(1)}
          checked={categorias[cat]}
          onChange={() => alterarCheckbox(categorias, setCategorias, cat)}
        />
      ))}

      <h5 className="mt-4">Gênero</h5>
      {Object.keys(generos).map(gen => (
        <Form.Check
          key={gen}
          type="checkbox"
          label={gen.charAt(0).toUpperCase() + gen.slice(1)}
          checked={generos[gen]}
          onChange={() => alterarCheckbox(generos, setGeneros, gen)}
        />
      ))}

      <h5 className="mt-4">Condição</h5>
      <Form.Check
        type="radio"
        id="new"
        name="condicao"
        label="Novo"
        checked={condicao === 'new'}
        onChange={() => setCondicao('new')}
      />
      <Form.Check
        type="radio"
        id="used"
        name="condicao"
        label="Usado"
        checked={condicao === 'used'}
        onChange={() => setCondicao('used')}
      />

      <h5 className="mt-4">Preço</h5>
      <Form.Group className="mb-2">
        <Form.Label>Mínimo</Form.Label>
        <Form.Control type="number" value={precoMinimo} onChange={e => setPrecoMinimo(Number(e.target.value))} />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Máximo</Form.Label>
        <Form.Control type="number" value={precoMaximo} onChange={e => setPrecoMaximo(Number(e.target.value))} />
      </Form.Group>

      <FiltroAvaliacao valor={avaliacaoMinima} aoMudar={setAvaliacaoMinima} />
    </aside>
  );
};

export default FiltroProduto;
