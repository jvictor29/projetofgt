// Dados de amostra para produtos
export const dadosProdutos = [
  {    id: 1,
    brand: "Nike",
    name: "Nike Air Max",
    image: "/tenis_produtos.png",
    oldPrice: 999.99,
    currentPrice: 499.99,
    discount: 50,
    rating: 4.5,
    reviewCount: 128,
    category: "sport",
    gender: "male",
    condition: "new"
  },{
    id: 2,
    brand: "Adidas",
    name: "Ultraboost 22 - Masculino",
    image: "/tenis_produtos.png",
    oldPrice: 999.99,
    currentPrice: 499.99,
    discount: 50,
    rating: 4.0,
    reviewCount: 98,
    category: "running",
    gender: "male",
    condition: "new"
  },
  {
    id: 3,
    brand: "K-Swiss",
    name: "K-Swiss V8 - Masculino",
    image: "/tenis_produtos.png",
    oldPrice: 799.99,
    currentPrice: 399.99,
    discount: 50,
    rating: 3.5,
    reviewCount: 42,
    category: "casual",
    gender: "male",
    condition: "new"
  },  {
    id: 4,
    brand: "Nike",
    name: "Revolution 5 - Masculino",
    image: "/tenis_produtos.png",
    oldPrice: 349.99,
    currentPrice: 199.99,
    discount: 43,
    rating: 3.0,
    reviewCount: 54,
    category: "running",
    gender: "male",
    condition: "new"
  },
  {
    id: 5,
    brand: "Adidas",
    name: "Duramo 10 - Masculino",
    image: "/tenis_produtos.png",
    oldPrice: 399.99,
    currentPrice: 249.99,
    discount: 38,
    rating: 3.5,
    reviewCount: 78,
    category: "sport",
    gender: "male",
    condition: "new"
  },
  {
    id: 6,
    brand: "Puma",
    name: "Anzarun Lite - Masculino",
    image: "/tenis_produtos.png",
    oldPrice: 299.99,
    currentPrice: 189.99,
    discount: 37,
    rating: 4.0,
    reviewCount: 65,
    category: "casual",
    gender: "male",
    condition: "new"
  },  {
    id: 7,
    brand: "Nike",
    name: "Downshifter 11 - Feminino",
    image: "/tenis_produtos.png",
    oldPrice: 379.99,
    currentPrice: 229.99,
    discount: 39,
    rating: 4.0,
    reviewCount: 92,
    category: "running",
    gender: "female",
    condition: "new"
  },
  {
    id: 8,
    brand: "Adidas",
    name: "Grand Court - Feminino",
    image: "/tenis_produtos.png",
    oldPrice: 349.99,
    currentPrice: 229.99,
    discount: 34,
    rating: 4.5,
    reviewCount: 112,
    category: "casual",
    gender: "female",
    condition: "new"
  },
  {
    id: 9,
    brand: "Puma",
    name: "Smash V2 - Unisex",
    image: "/tenis_produtos.png",
    oldPrice: 329.99,
    currentPrice: 219.99,
    discount: 33,
    rating: 4.0,
    reviewCount: 48,
    category: "casual",
    gender: "unisex",
    condition: "new"
  },  {
    id: 10,
    brand: "Balenciaga",
    name: "Triple S - Unisex",
    image: "/tenis_produtos.png",
    oldPrice: 1299.99,
    currentPrice: 899.99,
    discount: 31,
    rating: 4.5,
    reviewCount: 24,
    category: "casual",
    gender: "unisex",
    condition: "new"
  },
  {
    id: 11,
    brand: "Nike",
    name: "Metcon 7 - Masculino",
    image: "/tenis_produtos.png",
    oldPrice: 899.99,
    currentPrice: 599.99,
    discount: 33,
    rating: 5.0,
    reviewCount: 75,
    category: "sport",
    gender: "male",
    condition: "new"
  },
  {
    id: 12,
    brand: "Adidas",
    name: "Runfalcon 2.0 - Feminino",
    image: "/tenis_produtos.png",
    oldPrice: 299.99,
    currentPrice: 199.99,
    discount: 33,
    rating: 3.5,
    reviewCount: 62,
    category: "running",
    gender: "female",
    condition: "new"
  },  {
    id: 13,
    brand: "K-Swiss",
    name: "Court Cheswick - Masculino",
    image: "/tenis_produtos.png",
    oldPrice: 459.99,
    currentPrice: 299.99,
    discount: 35,
    rating: 4.0,
    reviewCount: 36,
    category: "casual",
    gender: "male",
    condition: "new"
  },
  {
    id: 14,
    brand: "Puma",
    name: "Flyer Runner - Unisex",
    image: "/tenis_produtos.png",
    oldPrice: 279.99,
    currentPrice: 189.99,
    discount: 32,
    rating: 3.5,
    reviewCount: 58,
    category: "running",
    gender: "unisex",
    condition: "new"
  },
  {
    id: 15,
    brand: "Balenciaga",
    name: "Speed Trainer - Unisex",
    image: "/tenis_produtos.png",
    oldPrice: 1199.99,
    currentPrice: 799.99,
    discount: 33,
    rating: 4.5,
    reviewCount: 32,
    category: "casual",
    gender: "unisex",
    condition: "new"
  },
  {
    id: 16,
    brand: "K-Swiss",
    name: "Court Pro II - Masculino",
    image: "/tenis_produtos.png",
    oldPrice: 399.99,
    currentPrice: 259.99,
    discount: 35,
    rating: 4.0,
    reviewCount: 45,
    category: "casual",
    gender: "male",
    condition: "new"
  }
];

// Funções para gerenciar produtos
export const obterTodosProdutos = () => {
  return dadosProdutos;
};

// Função para ordenar produtos
export const ordenarProdutos = (products, sortBy) => {
  const productsCopy = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return productsCopy.sort((a, b) => a.currentPrice - b.currentPrice);
    case 'price-desc':
      return productsCopy.sort((a, b) => b.currentPrice - a.currentPrice);
    case 'name-asc':
      return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return productsCopy.sort((a, b) => b.name.localeCompare(a.name));
    case 'rating-desc':
      return productsCopy.sort((a, b) => b.rating - a.rating);
    case 'newest':
      // Simulando ordenação por data (usando ID como substituto para data)
      return productsCopy.sort((a, b) => b.id - a.id);
    default:
      return productsCopy;
  }
};

// Função para filtrar produtos
export const filtrarProdutos = (products, filters) => {
  if (!filters) return products;
  
  let filtered = [...products];
  
  // Filtragem por termo de pesquisa
  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(term) || 
      product.brand.toLowerCase().includes(term)
    );
  }
  
  // Filtragem por marca
  if (filters.brands && filters.brands.length > 0) {
    filtered = filtered.filter(product => 
      filters.brands.includes(product.brand)
    );
  }
  
  // Filtragem por categoria
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(product => 
      filters.categories.includes(product.category)
    );
  }
  
  // Filtragem por gênero
  if (filters.genders && filters.genders.length > 0) {
    filtered = filtered.filter(product => 
      filters.genders.includes(product.gender)
    );
  }
  
  // Filtragem por condição (novo/usado)
  if (filters.condition) {
    filtered = filtered.filter(product => 
      product.condition === filters.condition
    );
  }
    // Filtragem por preço
  if (filters.priceRange) {
    const { min, max } = filters.priceRange;
    filtered = filtered.filter(product => 
      product.currentPrice >= min && product.currentPrice <= max
    );
  }
  
  // Filtragem por classificação (rating)
  if (filters.minRating && filters.minRating > 0) {
    filtered = filtered.filter(product => 
      product.rating >= filters.minRating
    );
  }
  
  return filtered;
};

// Função para buscar produtos com base em critérios de filtro
export const obterProdutosFiltrados = (filtros = {}) => {
  let filtrados = [...dadosProdutos];
  
  // Filtragem por termo de pesquisa (se existir)
  if (filtros.searchTerm) {
    const termoPesquisa = filtros.searchTerm.toLowerCase();
    filtrados = filtrados.filter(produto => 
      produto.name.toLowerCase().includes(termoPesquisa) || 
      produto.brand.toLowerCase().includes(termoPesquisa)
    );
  }
  
  // Filtragem por marca
  if (filtros.brands && filtros.brands.length > 0) {
    filtrados = filtrados.filter(produto => 
      filtros.brands.includes(produto.brand.toLowerCase())
    );
  }
  
  // Filtragem por categoria
  if (filtros.categories && filtros.categories.length > 0) {
    filtrados = filtrados.filter(produto => 
      filtros.categories.includes(produto.category)
    );
  }
  
  // Filtragem por gênero
  if (filtros.genders && filtros.genders.length > 0) {
    filtrados = filtrados.filter(produto => 
      filtros.genders.includes(produto.gender)
    );
  }
  
  // Filtragem por condição (novo/usado)
  if (filtros.condition) {
    filtrados = filtrados.filter(produto => 
      produto.condition === filtros.condition
    );
  }
  
  // Filtragem por preço
  if (filtros.priceRange) {
    const { min, max } = filtros.priceRange;
    filtrados = filtrados.filter(produto => 
      produto.currentPrice >= min && produto.currentPrice <= max
    );
  }
  
  // Filtragem por classificação (rating)
  if (filtros.minRating && filtros.minRating > 0) {
    filtrados = filtrados.filter(produto => 
      produto.rating >= filtros.minRating
    );
  }
  
  return filtrados;
};

// Função para buscar um produto por ID
export const obterProdutoPorId = (id) => {
  return dadosProdutos.find(produto => produto.id === parseInt(id));
};

// Função para buscar produtos por termo de pesquisa
export const pesquisarProdutos = (termo) => {
  const termoPesquisa = termo.toLowerCase();
  return dadosProdutos.filter(produto => 
    produto.name.toLowerCase().includes(termoPesquisa) || 
    produto.brand.toLowerCase().includes(termoPesquisa)
  );
};
