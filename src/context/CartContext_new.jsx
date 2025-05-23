import React, { createContext, useState, useContext, useEffect } from 'react';

// Criando o contexto do carrinho
const CartContext = createContext();

// Hook personalizado para usar o contexto do carrinho
export const useCart = () => useContext(CartContext);

// Provedor do contexto do carrinho
export const CartProvider = ({ children }) => {
  // Estado para armazenar os itens do carrinho
  const [cartItems, setCartItems] = useState([]);
  
  // Carregar itens do localStorage quando o componente é montado
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Erro ao carregar o carrinho:', error);
        setCartItems([]);
      }
    }
  }, []);
  
  // Salvar itens no localStorage sempre que o carrinho for atualizado
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Adicionar um item ao carrinho
  const addToCart = (product, quantity = 1) => {
    if (!product) return; // Verificar se o produto é válido
    
    setCartItems(prevItems => {
      // Verificar se o produto já está no carrinho
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Se o produto já estiver no carrinho, incrementar a quantidade
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity
        };
        return newItems;
      } else {
        // Se o produto não estiver no carrinho, adicioná-lo
        return [...prevItems, { ...product, quantity }];
      }
    });
  };
  
  // Remover um item do carrinho
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  // Atualizar a quantidade de um item no carrinho
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  // Limpar o carrinho
  const clearCart = () => {
    setCartItems([]);
  };
  
  // Calcular o total de itens no carrinho
  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  // Calcular o valor total do carrinho
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.currentPrice * item.quantity), 0);
  };
  
  // Obter todos os itens do carrinho
  const getCart = () => {
    return cartItems;
  };
  
  // Valores e funções que serão expostos pelo contexto
  const value = {
    cart: cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
    getCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
