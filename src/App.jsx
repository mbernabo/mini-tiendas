import './App.css';
import { Routes, Route } from 'react-router-dom';
import Inicio from './components/inicio';
import Tiendas from './components/tiendas';
import Auditoria from './components/Auditoria';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="tiendas">
                    <Route index element={<Tiendas />} />
                    <Route path="auditoria" element={<Auditoria />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
