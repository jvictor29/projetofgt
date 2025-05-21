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
    // Usar uma referência para verificar se o componente ainda está montado
    let isMounted = true;
    
    // Função para carregar do localStorage de forma segura
    const loadFromLocalStorage = async () => {
      try {
        const storedCart = localStorage.getItem('cart');
        
        if (storedCart && isMounted) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Erro ao carregar o carrinho:', error);
        if (isMounted) {
          setCartItems([]);
        }
      }
    };
    
    loadFromLocalStorage();
    
    // Limpar na desmontagem do componente
    return () => {
      isMounted = false;
    };
  }, []);
    // Salvar itens no localStorage sempre que o carrinho for atualizado
  useEffect(() => {
    // Usar uma referência para verificar se o componente ainda está montado
    let isMounted = true;
    
    // Função para salvar no localStorage de forma segura
    const saveToLocalStorage = async () => {
      try {
        if (isMounted) {
          localStorage.setItem('cart', JSON.stringify(cartItems));
        }
      } catch (error) {
        console.error('Erro ao salvar o carrinho:', error);
      }
    };
    
    saveToLocalStorage();
    
    // Limpar na desmontagem do componente
    return () => {
      isMounted = false;
    };
  }, [cartItems]);  // Adicionar um item ao carrinho
  const addToCart = async (product, quantity = 1) => {
    if (!product) return; // Verificar se o produto é válido
    
    try {
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
      
      return true; // Indicar sucesso
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      return false; // Indicar falha
    }
  };
    // Remover um item do carrinho
  const removeFromCart = async (productId) => {
    try {
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
      return true;
    } catch (error) {
      console.error('Erro ao remover do carrinho:', error);
      return false;
    }
  };
  
  // Atualizar a quantidade de um item no carrinho
  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        return await removeFromCart(productId);
      }
      
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === productId ? { ...item, quantity } : item
        )
      );
      return true;
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
      return false;
    }
  };
  
  // Limpar o carrinho
  const clearCart = async () => {
    try {
      setCartItems([]);
      return true;
    } catch (error) {
      console.error('Erro ao limpar o carrinho:', error);
      return false;
    }
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
