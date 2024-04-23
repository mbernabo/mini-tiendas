export default function TiendaInfo() {
    return (
        <div>
            <h2>Productos de {tiendaInfo.name}</h2>
            {misTiendas.some((tienda) => tienda.id === tiendaInfo.id) && (
                <>
                    <Badge color="blue">Editar Tienda</Badge>
                    <Badge color="orange">Borrar Tienda</Badge>
                </>
            )}
        </div>
    );
}
