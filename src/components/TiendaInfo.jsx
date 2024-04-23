import { Badge } from '@radix-ui/themes';
import instance from '../../authAxios';

export default function TiendaInfo({ tiendaInfo, misTiendas, setMisTiendas, setTiendas, setItems }) {
    async function handleDeleteStore(tiendaId) {
        await instance.delete(`/api/store/${tiendaId}`);
        const tiendasActuales = misTiendas.filter((tienda) => tienda.id !== tiendaId);
        setMisTiendas(tiendasActuales);
        setTiendas(tiendasActuales);
        setItems(null);
    }
    return (
        <div>
            <h2>Productos de {tiendaInfo.name}</h2>
            {misTiendas.some((tienda) => tienda.id === tiendaInfo.id) && (
                <>
                    <Badge color="blue" style={{ cursor: 'pointer' }}>
                        Editar Tienda
                    </Badge>
                    <Badge
                        color="orange"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteStore(tiendaInfo.id)}
                    >
                        Borrar Tienda
                    </Badge>
                </>
            )}
        </div>
    );
}
