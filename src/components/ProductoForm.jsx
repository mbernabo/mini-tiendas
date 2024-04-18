import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function ProductoForm() {
    const { register, handleSubmit } = useForm();
    const [respuesta, setRespuesta] = useState('');
    const onSubmit = (data) => {
        axios
            .post('http://127.0.0.1:5000/api/item', data)
            .then(function (response) {
                console.log(response.data);
                if (response.status === 201) {
                    setRespuesta('Producto creado exitosamente!');
                } else {
                    setRespuesta('Bad Request');
                }
            })
            .catch(function (error) {
                setRespuesta(`Ocurrió un error en el servicio. Intente nuevamente, error: ${error}`);
            });
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', maxWidth: '400px' }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                    <label style={{ marginBottom: '0.5rem' }}>ID de Tienda</label>
                    <input {...register('store_id', { required: true })} style={{ padding: '0.5rem' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                    <label style={{ marginBottom: '0.5rem' }}>Nombre del Producto</label>
                    <input {...register('name', { required: true, maxLength: 70 })} style={{ padding: '0.5rem' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                    <label style={{ marginBottom: '0.5rem' }}>Descripción</label>
                    <input {...register('description', { maxLength: 100 })} style={{ padding: '0.5rem' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                    <label style={{ marginBottom: '0.5rem' }}>Precio</label>
                    <input {...register('price', { required: true, maxLength: 10 })} style={{ padding: '0.5rem' }} />
                </div>
                <input
                    type="submit"
                    style={{
                        padding: '0.5rem',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                />
            </form>
            <p
                style={{
                    marginTop: '1rem',
                    padding: '0.5rem',
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    maxWidth: '400px',
                    textAlign: 'center',
                }}
            >
                {respuesta}
            </p>
        </div>
    );
}
