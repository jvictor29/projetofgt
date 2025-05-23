import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCarrinho } from '../../context/ContextoCarrinho';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [searchTerm, setSearchTerm] = useState('');
  const { obterQuantidadeItensCarrinho } = useCarrinho();

  // Função para lidar com a pesquisa
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/produtos?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      {/* Cabeçalho principal com logo, barra de pesquisa e menu de navegação */}
      <header className="header">
        {/* Logo do site */}
        <Link to="/" className="header-logo" aria-label="Ir para a página inicial">
          <img src="/img/logo -HEADER.svg" alt="Digital Store" />
        </Link>        {/* Campo de busca com ícone */}
        <form className="header-search" onSubmit={handleSearch}>
          <input 
            type="text" 
            id="searchInput" 
            placeholder="Pesquisar produtos..." 
            aria-label="Pesquisar produto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="header-search-button" aria-label="Buscar">
            <i className="bi bi-search header-search-icon"></i>
          </button>
        </form>        {/* Botões de acesso: Cadastro, Login e Carrinho */}
        <div className="header-actions">          <Link to="/cadastro" className="header-register">Cadastre-se</Link>
          <button className="header-login">Entrar</button>
          <Link to="/carrinho" className="header-cart position-relative">
            <i className="bi bi-cart-fill"></i>
            {obterQuantidadeItensCarrinho() > 0 && (
              <span className="header-cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {obterQuantidadeItensCarrinho()}
              </span>
            )}
          </Link>
        </div>
      </header>      {/* Menu de navegação principal */}
      <nav className="nav-main">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${path === '/' ? 'active' : ''}`}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/produtos" className={`nav-link ${path === '/produtos' ? 'active' : ''}`}>Produtos</Link>
          </li>
          <li className="nav-item">
            <Link to="/categorias" className={`nav-link ${path === '/categorias' ? 'active' : ''}`}>Categorias</Link>
          </li>
          <li className="nav-item">
            <Link to="/meus-pedidos" className={`nav-link ${path === '/meus-pedidos' ? 'active' : ''}`}>Meus Pedidos</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
