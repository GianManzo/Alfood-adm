import { Routes, Route } from 'react-router-dom';
import { PaginaBaseAdmin } from './paginas/Administracao/PaginaBaseAdmin';
import { AdministracaoPratos } from './paginas/Administracao/Pratos/AdministracaoPratos';
import { FormPrato } from './paginas/Administracao/Pratos/FormPrato';
import { AdministracaoRestaurantes } from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes';
import { FormRestaurante } from './paginas/Administracao/Restaurantes/FormRestaurante'
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin" element={<PaginaBaseAdmin />}>

        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={< FormRestaurante />} />
        <Route path="restaurantes/:id" element={< FormRestaurante />} />

        <Route path="pratos" element={< AdministracaoPratos />} />
        <Route path="pratos/novo" element={< FormPrato />} />
        <Route path="pratos/:id" element={< FormPrato />} />
      </Route>

    </Routes>
  )
}

export default App
