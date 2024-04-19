import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Flex } from '@radix-ui/themes';

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

export { LoginForm, RegisterForm };
