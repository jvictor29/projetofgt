import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination, Button, Spinner, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductFilter from '../../components/ProductFilter/ProductFilter';
import CardProduto from '../../components/ProductCard/ProductCard';
import ItemListaProduto from '../../components/ProductListItem/ProductListItem';
import ProductListHeader from '../../components/ProductListHeader/ProductListHeader';
import ProductSorting from '../../components/ProductSorting/ProductSorting';
import { productsData, getFilteredProducts } from '../../data/products';
import './ProductsPage.css';

let ProductsPage = () => {
  let location = useLocation();
  let navigate = useNavigate();
  
  // Obter o termo de pesquisa da URL
  let searchParams = new URLSearchParams(location.search);
  let searchTerm = searchParams.get('search') || '';
  
  // Estados para gerenciar os produtos e a paginação
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(15);
  const [filters, setFilters] = useState({ searchTerm });
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentSort, setCurrentSort] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [loading, setLoading] = useState(false); // Estado para indicador de carregamento
  const [selectedProducts, setSelectedProducts] = useState([]); // Estado para produtos selecionados para comparação
  const [showCompareModal, setShowCompareModal] = useState(false); // Estado para controlar a exibição do modal de comparação

  // Efeito para atualizar os filtros quando o termo de pesquisa mudar
  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      searchTerm
    }));
  }, [searchTerm]);

  // Efeito para filtrar produtos quando os filtros mudam
  useEffect(() => {
    setLoading(true);
    // Simulação de carregamento (em produção, isso seria uma chamada de API real)
    setTimeout(() => {
      const filteredProducts = getFilteredProducts({
        ...filters,
        sort: currentSort
      });
      setProducts(filteredProducts);
      setTotalProducts(filteredProducts.length);
      setCurrentPage(1); // Resetar para a primeira página ao aplicar filtros
      setLoading(false);
    }, 500);
  }, [filters, currentSort]);
  // Carregar filtros da URL quando a página é carregada
  useEffect(() => {
    // Obter parâmetros da URL
    let urlSort = searchParams.get('sort');
    let urlView = searchParams.get('view');
    let urlBrands = searchParams.get('brands');
    let urlCategories = searchParams.get('categories');
    let urlMinPrice = searchParams.get('min_price');
    let urlMaxPrice = searchParams.get('max_price');
    let urlRating = searchParams.get('rating');
    
    // Configurar visualização
    if (urlView && (urlView === 'grid' || urlView === 'list')) {
      setViewMode(urlView);
      localStorage.setItem('viewMode', urlView);
    }
    
    // Configurar ordenação
    if (urlSort) {
      setCurrentSort(urlSort);
    }
    
    // Preparar objeto de filtros
    let urlFilters = { searchTerm };
    
    // Adicionar marcas
    if (urlBrands) {
      urlFilters.brands = urlBrands.split(',');
    }
    
    // Adicionar categorias
    if (urlCategories) {
      urlFilters.categories = urlCategories.split(',');
    }
    
    // Adicionar preço
    if (urlMinPrice || urlMaxPrice) {
      urlFilters.price = {
        min: urlMinPrice ? parseInt(urlMinPrice) : 0,
        max: urlMaxPrice ? parseInt(urlMaxPrice) : 1000
      };
    }
    
    // Adicionar classificação mínima
    if (urlRating) {
      urlFilters.minRating = parseFloat(urlRating);
    }
    
    // Aplicar filtros apenas se houver parâmetros adicionais além do termo de pesquisa
    if (Object.keys(urlFilters).length > 1 || 
        (Object.keys(urlFilters).length === 1 && !urlFilters.searchTerm)) {
      setFilters(urlFilters);
    }
  }, []);
  // Função para adicionar/remover produto da lista de comparação
  let toggleProductComparison = (product) => {
    setSelectedProducts(prevSelected => {
      if (prevSelected.some(p => p.id === product.id)) {
        // Se o produto já está na lista, removê-lo
        return prevSelected.filter(p => p.id !== product.id);
      } else {
        // Se não está na lista e há menos de 4 produtos, adicioná-lo
        if (prevSelected.length < 4) {
          return [...prevSelected, product];
        } else {
          alert('Você só pode comparar até 4 produtos simultaneamente.');
          return prevSelected;
        }
      }
    });
  };

  // Função para limpar a lista de produtos selecionados
  let clearSelectedProducts = () => {
    setSelectedProducts([]);
  };

  // Carregar preferências do usuário para o modo de visualização
  useEffect(() => {
    const savedViewMode = localStorage.getItem('viewMode');
    if (savedViewMode) {
      setViewMode(savedViewMode);
    }
  }, []);  // Salvar preferências do usuário para o modo de visualização
  let handleViewModeChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem('viewMode', mode);
    
    // Atualizar URL para refletir o modo de visualização
    let params = new URLSearchParams(location.search);
    if (mode === 'grid') {
      params.delete('view');
    } else {
      params.set('view', mode);
    }
    navigate({
      pathname: location.pathname,
      search: params.toString()
    }, { replace: true });
  };
  // Calcular índices para a página atual
  let indexOfLastProduct = currentPage * productsPerPage;
  let indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Número total de páginas
  let totalPages = Math.ceil(products.length / productsPerPage);

  // Função para mudar a página
  let handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll para o topo ao mudar de página
  };

  // Função para mudar o número de produtos por página
  let handleProductsPerPageChange = (number) => {
    setProductsPerPage(number);
    setCurrentPage(1); // Resetar para a primeira página
  };  // Função para aplicar filtros
  let handleFilterChange = (newFilters) => {
    // Preservar o termo de pesquisa ao aplicar outros filtros
    let updatedFilters = { ...newFilters, searchTerm };
    setFilters(updatedFilters);
    
    // Atualizar a URL com os filtros aplicados
    updateUrlWithFilters(updatedFilters);
  };
  // Função para ordenar produtos
  let handleSortChange = (sortOption) => {
    setCurrentSort(sortOption);
    
    // Atualizar a URL com a nova ordenação
    let updatedFilters = { ...filters, sort: sortOption };
    updateUrlWithFilters(updatedFilters);
  };

  // Função para atualizar a URL com os filtros aplicados
  let updateUrlWithFilters = (appliedFilters) => {
    let params = new URLSearchParams();
    
    // Adicionar termo de pesquisa se existir
    if (appliedFilters.searchTerm) {
      params.set('search', appliedFilters.searchTerm);
    }
    
    // Adicionar ordenação se não for a padrão
    if (currentSort !== 'featured') {
      params.set('sort', currentSort);
    }
    
    // Adicionar visualização se não for a padrão
    if (viewMode !== 'grid') {
      params.set('view', viewMode);
    }
    
    // Adicionar marcas selecionadas
    if (appliedFilters.brands && appliedFilters.brands.length > 0) {
      params.set('brands', appliedFilters.brands.join(','));
    }
    
    // Adicionar categorias selecionadas
    if (appliedFilters.categories && appliedFilters.categories.length > 0) {
      params.set('categories', appliedFilters.categories.join(','));
    }
    
    // Adicionar filtro de preço
    if (appliedFilters.price) {
      if (appliedFilters.price.min > 0) {
        params.set('min_price', appliedFilters.price.min.toString());
      }
      if (appliedFilters.price.max < 1000) {
        params.set('max_price', appliedFilters.price.max.toString());
      }
    }
    
    // Adicionar filtro de classificação mínima
    if (appliedFilters.minRating > 0) {
      params.set('rating', appliedFilters.minRating.toString());
    }
    
    // Atualizar a URL sem recarregar a página
    navigate({
      pathname: location.pathname,
      search: params.toString()
    }, { replace: true });
  };

  // Renderizar itens de paginação
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    // Sempre mostrar a primeira página
    items.push(
      <Pagination.Item
        key={1}
        active={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        1
      </Pagination.Item>
    );
    
    // Adicionar ellipsis se necessário
    if (currentPage > 3) {
      items.push(<Pagination.Ellipsis key="ellipsis-1" disabled />);
    }
    
    // Adicionar páginas próximas à página atual
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i <= maxVisiblePages) {
        items.push(
          <Pagination.Item
            key={i}
            active={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    }
    
    // Adicionar ellipsis se necessário
    if (currentPage < totalPages - 2 && totalPages > maxVisiblePages) {
      items.push(<Pagination.Ellipsis key="ellipsis-2" disabled />);
    }
    
    // Sempre mostrar a última página, se houver mais de uma página
    if (totalPages > 1) {
      items.push(
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }
    
    return items;
  };

  // Renderizar produtos com base no modo de visualização
  const renderProducts = () => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
          <p className="mt-2 text-muted">Carregando produtos...</p>
        </div>
      );
    }
      if (currentProducts.length === 0) {
      return (
        <div className="text-center py-5 no-products-found">
          <i className="bi bi-search icon-no-results mb-3"></i>
          <h3>Nenhum produto encontrado</h3>
          <p className="text-muted mb-4">Tente ajustar os filtros para encontrar o que procura.</p>
          <Button 
            variant="outline-primary" 
            onClick={() => {
              setFilters({ searchTerm });
              navigate('/produtos', { replace: true });
            }}
          >
            <i className="bi bi-arrow-counterclockwise me-2"></i>
            Limpar todos os filtros
          </Button>
        </div>
      );
    }

    if (viewMode === 'grid') {
      return (
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-5">
          {currentProducts.map(product => (
            <CardProduto 
              key={product.id} 
              produto={product} 
              estaSelecionado={selectedProducts.some(p => p.id === product.id)}
              aoAlternarComparacao={() => toggleProductComparison(product)}
            />
          ))}
        </Row>
      );
    } else {
      return (        <div className="products-list mb-5">
          {currentProducts.map(product => (
            <ItemListaProduto 
              key={product.id} 
              produto={product} 
              estaSelecionado={selectedProducts.some(p => p.id === product.id)}
              aoAlternarComparacao={() => toggleProductComparison(product)}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <main className="container mt-5">
      {/* Cabeçalho de resultados da busca */}
      <div className="bg-light py-4 px-3 mb-4 rounded">
        <h1 className="cabecalho_resultados fs-2 fw-semibold text-dark mb-1">
          {searchTerm 
            ? `Resultados para "${searchTerm}" - ${totalProducts} produtos` 
            : `Todos os produtos - ${totalProducts} produtos`}
        </h1>
      </div>

      {/* Banner para lembrar o usuário de produtos selecionados para comparação */}
      {selectedProducts.length > 0 && (
        <div className="alert alert-info d-flex justify-content-between align-items-center mb-4">
          <div>
            <i className="bi bi-info-circle-fill me-2"></i>
            Você tem {selectedProducts.length} {selectedProducts.length > 1 ? 'produtos selecionados' : 'produto selecionado'} para comparação.
          </div>
          <div>
            <Button 
              variant="outline-primary" 
              size="sm" 
              className="me-2"
              onClick={() => setShowCompareModal(true)}
            >
              <i className="bi bi-bar-chart-fill me-1"></i>
              Comparar
            </Button>
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={clearSelectedProducts}
            >
              <i className="bi bi-x-circle me-1"></i>
              Limpar
            </Button>
          </div>
        </div>
      )}

      {/* Botão flutuante para comparar produtos (visível apenas quando há produtos selecionados) */}
      {selectedProducts.length > 0 && (
        <div className="products-compare-button">
          <Button 
            variant="primary" 
            className="position-fixed bottom-0 end-0 mb-4 me-4 shadow"
            onClick={() => setShowCompareModal(true)}
          >
            <i className="bi bi-bar-chart-fill me-2"></i>
            Comparar {selectedProducts.length} {selectedProducts.length > 1 ? 'produtos' : 'produto'}
          </Button>
        </div>
      )}

      <Row>
        {/* Componente de filtro lateral */}
        <ProductFilter onFilterChange={handleFilterChange} />

        {/* Seção de produtos */}
        <section className="col-md-9" aria-labelledby="produtosTitulo">
          <h2 id="produtosTitulo" className="visually-hidden">Catálogo de produtos</h2>          {/* Componente de cabeçalho da lista de produtos */}
          <ProductListHeader 
            totalProducts={totalProducts}
            currentPage={currentPage}
            productsPerPage={productsPerPage}
            onProductsPerPageChange={handleProductsPerPageChange}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            currentSort={currentSort}
            onSortChange={handleSortChange}
          />

          {/* Opções de ordenação para dispositivos móveis */}
          <div className="d-block d-md-none mb-3">
            <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded">
              <span className="text-muted small">Ordenar produtos:</span>
              <ProductSorting 
                currentSort={currentSort}
                onSortChange={handleSortChange}
                className="mobile-sort"
              />
            </div>
          </div>

          {/* Galeria de produtos */}
          <Container fluid className="px-0">
            {renderProducts()}

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4 mb-5">
                <Pagination>
                  <Pagination.Prev 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  
                  {renderPaginationItems()}
                  
                  <Pagination.Next 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </Container>
        </section>
      </Row>
      
      {/* Modal para comparação de produtos */}
      <Modal 
        show={showCompareModal} 
        onHide={() => setShowCompareModal(false)}
        dialogClassName="modal-xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Comparação de Produtos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProducts.length === 0 ? (
            <div className="text-center py-4">
              <p>Nenhum produto selecionado para comparação.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered comparison-table">
                <thead>
                  <tr>
                    <th>Característica</th>
                    {selectedProducts.map(product => (
                      <th key={product.id} className="text-center">
                        {product.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Imagem</td>
                    {selectedProducts.map(product => (
                      <td key={`img-${product.id}`} className="text-center">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          style={{ maxHeight: '100px', objectFit: 'contain' }}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Marca</td>
                    {selectedProducts.map(product => (
                      <td key={`brand-${product.id}`} className="text-center">{product.brand}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Preço</td>
                    {selectedProducts.map(product => (
                      <td key={`price-${product.id}`} className="text-center">
                        <strong className="text-primary">
                          R${product.currentPrice.toFixed(2).replace('.', ',')}
                        </strong>
                        {product.oldPrice && (
                          <div>
                            <del className="text-muted small">
                              R${product.oldPrice.toFixed(2).replace('.', ',')}
                            </del>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Desconto</td>
                    {selectedProducts.map(product => (
                      <td key={`discount-${product.id}`} className="text-center">
                        {product.discount ? 
                          <span className="badge bg-danger">{product.discount}% OFF</span> : 
                          <span className="text-muted">Sem desconto</span>
                        }
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Avaliação</td>
                    {selectedProducts.map(product => (
                      <td key={`rating-${product.id}`} className="text-center">
                        <div className="text-warning">
                          {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                            <i key={i} className="bi bi-star-fill"></i>
                          ))}
                          {product.rating % 1 >= 0.5 && <i className="bi bi-star-half"></i>}
                          {Array.from({ length: 5 - Math.ceil(product.rating) }).map((_, i) => (
                            <i key={i} className="bi bi-star"></i>
                          ))}
                        </div>
                        <div className="small text-muted">({product.reviewCount} avaliações)</div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Ações</td>
                    {selectedProducts.map(product => (
                      <td key={`action-${product.id}`} className="text-center">
                        <Button 
                          variant="primary" 
                          size="sm" 
                          className="me-2" 
                          onClick={() => navigate(`/produtos/${product.id}`)}
                        >
                          <i className="bi bi-eye me-1"></i> Detalhes
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm" 
                          onClick={() => toggleProductComparison(product)}
                        >
                          <i className="bi bi-x"></i> Remover
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCompareModal(false)}>
            Fechar
          </Button>
          <Button variant="danger" onClick={clearSelectedProducts}>
            Limpar Seleção
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default ProductsPage;
