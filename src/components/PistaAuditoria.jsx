import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../authAxios';
export default function PistaAuditoria() {
    const { idPista } = useParams();
    
    useEffect(() => {
        
        async function fetchPistaAuditoria() {
            const response = instance.get()

        }
    })
    return (
        <div>
            <h1>Pista de Auditoría #{idPista}</h1>
            {/* Aquí puedes mostrar información relacionada con la pista de auditoría */}
        </div>
    );
}
