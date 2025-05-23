# ProjetoFinalGT - E-commerce em React

Este projeto é uma aplicação de e-commerce desenvolvida com React

### Componentes

- `CabecalhoListaProdutos` - Exibe o cabeçalho da lista de produtos com opções de visualização
- `CardProduto` - Exibe um produto em formato de card na visualização de grade
- `ItemListaProduto` - Exibe um produto em formato de linha na visualização de lista
- `FiltroProduto` - Permite filtrar produtos por diversas propriedades
- `FiltroAvaliacao` - Componente específico para filtrar produtos por avaliação
- `OrdenacaoProdutos` - Permite ordenar a lista de produtos

### Páginas

- `PaginaProdutos` - Página principal que lista todos os produtos
- `PaginaDetalhesProduto` - Página de detalhes de um produto específico
- `PaginaCarrinho` - Página do carrinho de compras

### Contextos

- `ContextoCarrinho` - Gerencia o estado do carrinho de compras

### Funções de Dados

- `obterProdutosFiltrados` - Retorna produtos filtrados com base em critérios
- `obterProdutoPorId` - Busca um produto específico pelo ID
- `pesquisarProdutos` - Busca produtos por termo de pesquisa

### Classes CSS

As classes CSS seguem o padrão BEM (Block Element Modifier)
- `item-lista-produto` (bloco)
- `item-lista-produto__image` (elemento)
- `item-lista-produto__add-to-cart` (elemento)
- `item-lista-produto--selected` (modificador)

## Estrutura do Projeto

```
src/
  components/            # Componentes reutilizáveis
  context/               # Contextos React
  data/                  # Dados e funções relacionadas
  layouts/               # Layouts de página
  pages/                 # Páginas da aplicação
  routes/                # Configuração de rotas
```

## Iniciando o Projeto

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev
```
