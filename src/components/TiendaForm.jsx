import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Flex } from '@radix-ui/themes';
import { useState } from 'react';

export default function TiendaForm() {
    const { register, handleSubmit } = useForm();
    const [respuesta, setRespuesta] = useState('');
    const onSubmit = (data) => {
        axios
            .post('http://127.0.0.1:5000/api/store', data)
            .then(function (response) {
                console.log(response.data);
                if (response.status === 201) {
                    setRespuesta('Tienda creada exitosamente!');
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
                <label>ID de Usuario</label>
                <input {...register('user_id', { required: true })} />
                <label>Nombre de la Tienda</label>
                <input {...register('name', { required: true, maxLength: 70 })} />
                <label>Descripción</label>
                <input {...register('description', { maxLength: 100 })} />
                <input type="submit" />
            </form>
            <p>{respuesta}</p>
        </Flex>
    );
}
