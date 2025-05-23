// Dados de amostra para produtos
export const productsData = [
  {
    id: 1,
    brand: "Nike",
    name: "Nike Air Max",
    image: "/img/tenis_produtos.png",
    oldPrice: 999.99,
    currentPrice: 499.99,
    discount: 50,
    rating: 4.5,
    reviewCount: 128,
    category: "sport",
    gender: "male",
    condition: "new"
  },  {
    id: 2,
    brand: "Adidas",
    name: "Ultraboost 22 - Masculino",
    image: "/img/tenis_produtos.png",
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
    image: "/img/tenis_produtos.png",
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
    image: "/img/tenis_produtos.png",
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
    image: "/img/tenis_produtos.png",
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
    image: "/img/tenis_produtos.png",
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
    image: "/img/tenis_produtos.png",
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
    image: "/img/tenis_produtos.png",
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
    image: "/img/tenis_produtos.png",
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
    image: "/img/tenis_produtos.png",
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
    image: "/img/tenis_produtos.png",
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
    image: "/img/tenis_produtos.png",
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
    image: "/img/tenis_produtos.png",
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
    image: "/img/tenis_produtos.png",
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
    image: "/img/tenis_produtos.png",
    oldPrice: 1199.99,
    currentPrice: 799.99,
    discount: 33,
    rating: 4.5,
    reviewCount: 18,
    category: "sport",
    gender: "unisex",
    condition: "new"
  },
  {
    id: 16,
    brand: "Nike",
    name: "Air Force 1 - Feminino",
    image: "/img/tenis_produtos.png",
    oldPrice: 799.99,
    currentPrice: 499.99,
    discount: 38,
    rating: 4.8,
    reviewCount: 145,
    category: "casual",
    gender: "female",
    condition: "new"
  },
  {
    id: 17,
    brand: "Adidas",
    name: "Superstar - Usado",
    image: "/img/tenis_produtos.png",
    oldPrice: 599.99,
    currentPrice: 249.99,
    discount: 58,
    rating: 4.0,
    reviewCount: 32,
    category: "casual",
    gender: "unisex",
    condition: "used"
  }
];

// Função para buscar produtos com base em critérios de filtro
export const getFilteredProducts = (filters = {}) => {
  let filtered = [...productsData];
  
  // Filtragem por termo de pesquisa (se existir)
  if (filters.searchTerm) {
    const searchTerm = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.brand.toLowerCase().includes(searchTerm)
    );
  }
  
  // Filtragem por marca
  if (filters.brands && filters.brands.length > 0) {
    filtered = filtered.filter(product => 
      filters.brands.includes(product.brand.toLowerCase())
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

// Função para buscar um produto por ID
export const getProductById = (id) => {
  return productsData.find(product => product.id === parseInt(id));
};

// Função para buscar produtos por termo de pesquisa
export const searchProducts = (term) => {
  const searchTerm = term.toLowerCase();
  return productsData.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.brand.toLowerCase().includes(searchTerm)
  );
};
