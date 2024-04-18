import reactLogo from '../assets/react.svg';
import { Link } from 'react-router-dom';
import { Button } from '@radix-ui/themes';

export default function Inicio() {
    return (
        <>
            <div>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Mini Tiendas</h1>
            <div className="card">
                <Link to="tiendas">
                    <Button>Ingresar</Button>
                </Link>
                <p>
                    Las <strong>mejores</strong> tiendas de Once
                </p>
            </div>
            <p className="read-the-docs">Compremos digital y transformemos el barrio</p>
        </>
    );
}
