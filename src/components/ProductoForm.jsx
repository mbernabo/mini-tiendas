import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Flex } from '@radix-ui/themes';
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
        <Flex align="center" direction="column" gap="3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>ID de Tienda</label>
                <input {...register('store_id', { required: true })} />
                <label>Nombre del Producto</label>
                <input {...register('name', { required: true, maxLength: 70 })} />
                <label>Descripción</label>
                <input {...register('description', { maxLength: 100 })} />
                <label>Precio</label>
                <input {...register('price', { required: true, maxLength: 10 })} />
                <input type="submit" />
            </form>
            <p>{respuesta}</p>
        </Flex>
    );
}
