import './App.css';
import { Routes, Route } from 'react-router-dom';
import Inicio from './components/inicio';
import Tiendas from './components/tiendas';
import Auditoria from './components/Auditoria';
import PistaAuditoria from './components/PistaAuditoria';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="tiendas" index element={<Tiendas />} />
                <Route path="auditoria" element={<Auditoria />} />
                <Route path="/auditoria/pista/:idPista" element={<PistaAuditoria />} />
            </Routes>
        </>
    );
}

export default App;
