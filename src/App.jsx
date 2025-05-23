import { BrowserRouter } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import AppRoutes from './routes/AppRoutes'
import MainLayout from './layouts/MainLayout'
import { ProvedorCarrinho } from './context/ContextoCarrinho'

function App() {
  return (
    <ProvedorCarrinho>
      <BrowserRouter>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </BrowserRouter>
    </ProvedorCarrinho>
  )
}

export default App
