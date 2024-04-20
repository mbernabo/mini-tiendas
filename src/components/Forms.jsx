import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Flex } from '@radix-ui/themes';
import { setHeaders } from '../../../utils';
import { obtenerTiendas } from '../../../api';
import { obtenerTiendasUser } from '../../../api';

function LoginForm({ userLoggedIn, setUserLoggedIn }) {
    const { register, handleSubmit } = useForm();
    const [respuesta, setRespuesta] = useState('');
    const onSubmit = (data) => {
        axios
            .post('http://127.0.0.1:5000/api/login', data)
            .then(function (response) {
                console.log(response.data);
                if (response.status === 200) {
                    const accessToken = response.data.access_token;
                    localStorage.setItem('accessToken', accessToken);
                    setUserLoggedIn(true);
                    setRespuesta('Usuario logueado exitosamente!');
                } else {
                    setRespuesta('Bad Request');
                }
            })
            .catch(function (error) {
                setRespuesta(`Ocurrió un error en el servicio. Intente nuevamente, error: ${error}`);
            });
    };
    return (
        <>
            {!userLoggedIn && (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', maxWidth: '400px' }}
                >
                    <Flex direction="column" gap="3">
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                            <label style={{ marginBottom: '0.5rem' }}>Email</label>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                style={{ padding: '0.5rem' }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                            <label style={{ marginBottom: '0.5rem' }}>Password</label>
                            <input
                                {...register('password', { required: true, maxLength: 70 })}
                                style={{ padding: '0.5rem' }}
                            />
                        </div>
                    </Flex>
                    <input
                        type="submit"
                        style={{
                            marginTop: '1rem',
                            padding: '0.5rem',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    />
                </form>
            )}
            {respuesta && (
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
            )}
        </>
    );
}

function RegisterForm() {
    const { register, handleSubmit } = useForm();
    const [respuesta, setRespuesta] = useState('');
    const onSubmit = (data) => {
        axios
            .post('http://127.0.0.1:5000/api/user', data)
            .then(function (response) {
                console.log(response.data);
                if (response.status === 201) {
                    setRespuesta('Usuario registrado exitosamente!');
                } else {
                    setRespuesta('Bad Request');
                }
            })
            .catch(function (error) {
                setRespuesta(`Ocurrió un error en el servicio. Intente nuevamente, error: ${error}`);
            });
    };
    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', maxWidth: '400px' }}
            >
                <Flex direction="column" gap="3">
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                        <label style={{ marginBottom: '0.5rem' }}>Email</label>
                        <input type="email" {...register('email', { required: true })} style={{ padding: '0.5rem' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                        <label style={{ marginBottom: '0.5rem' }}>Password</label>
                        <input
                            type="password"
                            {...register('password', { required: true, maxLength: 70 })}
                            style={{ padding: '0.5rem' }}
                        />
                    </div>
                </Flex>
                <input
                    type="submit"
                    style={{
                        marginTop: '1rem',
                        padding: '0.5rem',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                />
            </form>
            {respuesta && (
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
            )}
        </>
    );
}

function CrearTiendaForm({ setTiendas }) {
    const { register, handleSubmit } = useForm();
    const [respuesta, setRespuesta] = useState('');
    const onSubmit = (data) => {
        axios
            .post('http://127.0.0.1:5000/api/stores', data, setHeaders())
            .then(function (response) {
                console.log(response.data);
                if (response.status === 201) {
                    setRespuesta('Tienda creada exitosamente!');
                    obtenerTiendas() // Llama a obtenerTiendas y espera a que la promesa se resuelva
                        .then((data) => {
                            setTiendas(data); // Actualiza el estado con los datos obtenidos
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    setRespuesta('Bad Request');
                }
            })
            .catch(function (error) {
                console.log(error.response.data);
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
                    <label style={{ marginBottom: '0.5rem' }}>Nombre de la Tienda</label>
                    <input {...register('name', { required: true, maxLength: 70 })} style={{ padding: '0.5rem' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                    <label style={{ marginBottom: '0.5rem' }}>Descripción</label>
                    <input {...register('description', { maxLength: 100 })} style={{ padding: '0.5rem' }} />
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
function CrearProductoForm() {
    const { register, handleSubmit } = useForm();
    const [respuesta, setRespuesta] = useState('');
    const [tiendasUser, setTiendasUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await obtenerTiendasUser();
                setTiendasUser(data);
            } catch (error) {
                console.error('Error al obtener las tiendas:', error);
            }
        };

        fetchData();
    }, []);

    const onSubmit = (data) => {
        axios
            .post('http://127.0.0.1:5000/api/item', data, setHeaders())
            .then(function (response) {
                console.log(response.data);
                if (response.status === 201) {
                    setRespuesta('Producto creado exitosamente!');
                } else {
                    setRespuesta('Bad Request');
                }
            })
            .catch(function (error) {
                console.log(error.response.data);
                setRespuesta(`Ocurrió un error en el servicio. Intente nuevamente, error: ${error}`);
            });
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', maxWidth: '400px' }}
            >
                <select {...register('store_id', { required: true })}>
                    <option value="">Seleccione una Tienda</option>
                    {tiendasUser.map((tienda) => (
                        <option key={tienda.id} value={tienda.id}>
                            {tienda.name}
                        </option>
                    ))}
                </select>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                    <label style={{ marginBottom: '0.5rem' }}>Nombre del producto</label>
                    <input {...register('name', { required: true, maxLength: 70 })} style={{ padding: '0.5rem' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                    <label style={{ marginBottom: '0.5rem' }}>Descripción</label>
                    <input {...register('description', { maxLength: 100 })} style={{ padding: '0.5rem' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                    <label style={{ marginBottom: '0.5rem' }}>Precio</label>
                    <input {...register('price', { required: true, maxLength: 100 })} style={{ padding: '0.5rem' }} />
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

export { LoginForm, RegisterForm, CrearTiendaForm, CrearProductoForm };
