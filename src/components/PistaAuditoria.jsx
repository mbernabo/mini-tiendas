import { useParams } from 'react-router-dom';
export default function PistaAuditoria() {
    const { idPista } = useParams();
    return (
        <div>
            <h1>Pista de Auditoría #{idPista}</h1>
            {/* Aquí puedes mostrar información relacionada con la pista de auditoría */}
        </div>
    );
}
