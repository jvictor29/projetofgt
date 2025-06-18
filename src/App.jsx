import { BrowserRouter } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AppRoutes from './routes/AppRoutes'
import MainLayout from './layouts/MainLayout'
import { ProvedorCarrinho } from './context/ContextoCarrinho'
import { Descricao } from './components/Descricao/descricao';
import 'Descricao/descricao.jsx'
import 'descricao/descricao.css'
import 'DescricaoPage/Descricaopage.jsx'
import 'DescricaoPage/Descricaopage.css'

function App() {
  return (    <ProvedorCarrinho>
      <BrowserRouter>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </BrowserRouter>
    </ProvedorCarrinho>
  )
}

export default App
