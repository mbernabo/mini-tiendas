import './App.css';
import { Routes, Route } from 'react-router-dom';
import Inicio from './components/inicio';
import Tiendas from './components/tiendas';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="tiendas" element={<Tiendas />} />
            </Routes>
        </>
    );
}

export default App;
