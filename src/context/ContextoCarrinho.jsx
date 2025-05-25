import React, { createContext, useState, useContext, useEffect } from 'react';

// Criando o contexto do carrinho
const ContextoCarrinho = createContext();

// Hook personalizado para usar o contexto do carrinho
export const useCarrinho = () => useContext(ContextoCarrinho);

// Provedor do contexto do carrinho
export const ProvedorCarrinho = ({ children }) => {
  // Estado para armazenar os itens do carrinho
  const [itensCarrinho, setItensCarrinho] = useState([]);

  // Carregar itens do localStorage quando o componente é montado
  useEffect(() => {
    // Usar uma referência para verificar se o componente ainda está montado
    let estaMontado = true;

    // Função para carregar do localStorage de forma segura
    const carregarDoLocalStorage = async () => {
      try {
        const carrinhoArmazenado = localStorage.getItem('carrinho');

        if (carrinhoArmazenado && estaMontado) {
          setItensCarrinho(JSON.parse(carrinhoArmazenado));
        }
      } catch (erro) {
        console.error('Erro ao carregar o carrinho:', erro);
        if (estaMontado) {
          setItensCarrinho([]);
        }
      }
    };

    carregarDoLocalStorage();

    // Limpar na desmontagem do componente
    return () => {
      estaMontado = false;
    };
  }, []);

  // Salvar itens no localStorage sempre que o carrinho for atualizado
  useEffect(() => {
    // Usar uma referência para verificar se o componente ainda está montado
    let estaMontado = true;

    // Função para salvar no localStorage de forma segura
    const salvarNoLocalStorage = async () => {
      try {
        if (estaMontado) {
          localStorage.setItem('carrinho', JSON.stringify(itensCarrinho));
        }
      } catch (erro) {
        console.error('Erro ao salvar o carrinho:', erro);
      }
    };

    salvarNoLocalStorage();

    // Limpar na desmontagem do componente
    return () => {
      estaMontado = false;
    };
  }, [itensCarrinho]);
  // Adicionar um item ao carrinho
  const adicionarAoCarrinho = async (produto, quantidade = 1) => {
    if (!produto) return false; // Verificar se o produto é válido

    try {
      setItensCarrinho(itensPrevios => {
        // Verificar se o produto já está no carrinho
        const indiceItemExistente = itensPrevios.findIndex(item => item.id === produto.id);
        if (indiceItemExistente >= 0) {
          // Se o produto já estiver no carrinho, incrementar a quantidade
          const novosItens = [...itensPrevios];
          novosItens[indiceItemExistente] = {
            ...novosItens[indiceItemExistente],
            quantidade: quantidade
          };
          return novosItens;
        } else {
          // Se o produto não estiver no carrinho, adicioná-lo
          return [...itensPrevios, { ...produto, quantidade: quantidade }];
        }
      });

      return true; // Indicar sucesso
    } catch (erro) {
      console.error('Erro ao adicionar ao carrinho:', erro);
      return false; // Indicar falha
    }
  };

  // Remover um item do carrinho
  const removerDoCarrinho = async (idProduto) => {
    try {
      setItensCarrinho(itensPrevios => itensPrevios.filter(item => item.id !== idProduto));
      return true;
    } catch (erro) {
      console.error('Erro ao remover do carrinho:', erro);
      return false;
    }
  };

  // Atualizar a quantidade de um item no carrinho
  const atualizarQuantidade = async (idProduto, quantidade) => {
    try {
      if (quantidade <= 0) {
        return await removerDoCarrinho(idProduto);
      }
      setItensCarrinho(itensPrevios =>
        itensPrevios.map(item =>
          item.id === idProduto ? { ...item, quantidade: quantidade } : item
        )
      );
      return true;
    } catch (erro) {
      console.error('Erro ao atualizar quantidade:', erro);
      return false;
    }
  };

  // Limpar o carrinho
  const limparCarrinho = async () => {
    try {
      setItensCarrinho([]);
      return true;
    } catch (erro) {
      console.error('Erro ao limpar o carrinho:', erro);
      return false;
    }
  };

  // Calcular o total de itens no carrinho
  const obterQuantidadeItensCarrinho = () => {
    return itensCarrinho.reduce((total, item) => total + item.quantidade, 0);
  };

  // Calcular o valor total do carrinho
  const obterTotalCarrinho = () => {
    return itensCarrinho.reduce((total, item) => total + (item.currentPrice * item.quantidade), 0);
  };

  // Obter todos os itens do carrinho
  const obterCarrinho = () => {
    return itensCarrinho;
  };
  // Valores e funções que serão expostos pelo contexto
  const valor = {
    carrinho: itensCarrinho,
    adicionarAoCarrinho,
    removerDoCarrinho,
    atualizarQuantidade,
    limparCarrinho,
    obterQuantidadeItensCarrinho,
    obterTotalCarrinho,
    obterCarrinho
  };

  return (
    <ContextoCarrinho.Provider value={valor}>
      {children}
    </ContextoCarrinho.Provider>
  );
};

export default ContextoCarrinho;
