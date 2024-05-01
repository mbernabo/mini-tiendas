import { useState } from 'react';
import { Button, Heading } from '@radix-ui/themes';

import { Link } from 'react-router-dom';
import AuditoriaDeTiendas from './AuditoriadeTiendas';
import AuditTrail from './AuditTrail';

export default function Auditoria() {
    const [accesoHabilitado, setAccesoHabilitado] = useState(true);
    const [todasLasPistas, setTodasLasPistas] = useState(false);

    return (
        <>
            {accesoHabilitado ? (
                <>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem',
                        }}
                    >
                        <Heading>Auditoría - Mini Tiendas</Heading>
                        <Button
                            variant="ghost"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setTodasLasPistas(!todasLasPistas)}
                        >
                            {todasLasPistas ? 'Auditoría de Tiendas' : 'Audit Trail'}
                        </Button>
                        <Link to="/tiendas">
                            <Button variant="ghost" style={{ cursor: 'pointer' }}>
                                Volver
                            </Button>
                        </Link>
                    </div>

                    {todasLasPistas ? (
                        <AuditTrail setAccesoHabilitado={setAccesoHabilitado} />
                    ) : (
                        <AuditoriaDeTiendas setAccesoHabilitado={setAccesoHabilitado} />
                    )}
                </>
            ) : (
                <Heading>Acceso Restringido</Heading>
            )}
        </>
    );
}
