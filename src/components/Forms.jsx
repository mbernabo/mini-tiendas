// import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Flex } from '@radix-ui/themes';
import { getFetch } from '../../api';
import { obtenerTiendasUser } from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import { login, makeAdmin, setUserId } from '../redux/userSlice';
import { actualizarTienda } from '../redux/tiendasSlice';
import axios from 'axios';
import instance from '../../authAxios';
import { fetchTiendas } from '../redux/tiendasSlice';

const BASE_URL = 'http://127.0.0.1:5000';
// const BASE_URL = 'https://mini-tiendas-api-qq9a.onrender.com';

function LoginForm() {
    const isAuthenticated = useSelector((state) => state.user.loggedIn);
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [respuesta, setRespuesta] = useState('');

    const setAdminStatus = async () => {
        try {
            const response = await instance.get('/api/user/check-admin');
            console.log(response.data.is_admin);
            if (response.data.is_admin) {
                dispatch(makeAdmin());
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (data) => {
        const url = `${BASE_URL}/api/login`;
        const options = {
            method: 'POST',
            data: data,
            // withCredentials: true,
        };

        axios(url, options)
            .then((response) => {
                // Verificar si la solicitud fue exitosa
                if (response.status === 200) {
                    // Guardar tokens en localStorage
                    localStorage.setItem('access_token', response.data.access_token);
                    localStorage.setItem('refresh_token', response.data.refresh_token);
                    console.log(response.data);
                    const userId = response.data.user_id;
                    dispatch(setUserId(userId));
                    setAdminStatus();

                    // Actualizar estado de la aplicación
                    setRespuesta('Login Exitoso!');
                    dispatch(login());
                } else {
                    // Mostrar mensaje de error si la solicitud no fue exitosa
                    console.error('Error en la solicitud:', response.statusText);
                }
            })
            .catch((error) => {
                console.error('Error de red:', error);
            });
    };
    return (
        <>
            {!isAuthenticated && (
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
    const onSubmit = async (data) => {
        const url = `${BASE_URL}/api/user`;

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(url, options);
        try {
            if (response.status === 201) {
                setRespuesta('Usuario registrado exitosamente!');
            } else {
                setRespuesta('Bad Request');
            }
        } catch (error) {
            setRespuesta(`Ocurrió un error en el servicio. Intente nuevamente, error: ${error}`);
        }
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

function CrearTiendaForm() {
    const { register, handleSubmit } = useForm();
    const [respuesta, setRespuesta] = useState('');
    const dispatch = useDispatch()
    const onSubmit = async (data) => {
        try {
            const response = await instance.post('/api/stores', data);
            if (response.status === 201) {
                setRespuesta('Tienda creada exitosamente!');
                dispatch(fetchTiendas());
            } else {
                setRespuesta('Bad Request');
            }
        } catch (error) {
            console.log(error);
            setRespuesta(`Ocurrió un error en el servicio. Intente nuevamente, error: ${error}`);
        }
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
function CrearProductoForm({ setTiendaInfo }) {
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

    const onSubmit = async (data) => {
        try {
            const response = await instance.post('/api/item', data);
            if (response.status === 201) {
                const newItem = response.data;
                setRespuesta('Producto creado exitosamente!');
                setTiendaInfo((prevTiendaInfo) => ({ ...prevTiendaInfo, items: [...prevTiendaInfo.items, newItem] }));
            } else {
                setRespuesta('Bad Request');
            }
        } catch (error) {
            setRespuesta(`Ocurrió un error en el servicio. Intente nuevamente, error: ${error}`);
        }
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

function EditarTiendaForm({ tiendaId }) {
    const { register, handleSubmit, setValue } = useForm();
    const [respuesta, setRespuesta] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getFetch(`store/${tiendaId}`);
                const { name, description } = result;
                setValue('name', name);
                setValue('description', description);
            } catch (error) {
                console.error('Error al obtener la tienda:', error);
            }
        };

        fetchData();
    }, [tiendaId, setValue]);

    const onSubmit = async (data) => {
        try {
            const response = await instance.put(`/api/store/${tiendaId}`, data);
            if (response.status === 200) {
                setRespuesta('Tienda modificada exitosamente!');
                const nuevaTienda = await response.data;
                dispatch(actualizarTienda({ id: tiendaId, nuevosDatos: nuevaTienda }));
            } else {
                setRespuesta('Bad Request');
            }
        } catch (error) {
            console.log(error);
            setRespuesta(`Ocurrió un error en el servicio. Intente nuevamente, error: ${error}`);
        }
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

export { LoginForm, RegisterForm, CrearTiendaForm, CrearProductoForm, EditarTiendaForm };
