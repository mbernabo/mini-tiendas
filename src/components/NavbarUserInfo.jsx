import { Button } from '@radix-ui/themes';
import { useSelector, useDispatch } from 'react-redux';
import { logOutUser } from '../../api';
import { logout, removeAdmin } from '../redux/userSlice';

export default function NavbarUserInfo() {
    const userName = useSelector((state) => state.user.userName);
    const dispatch = useDispatch();

    async function handleLogOut() {
        try {
            await logOutUser();
            dispatch(logout());
            dispatch(removeAdmin());
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        } catch (error) {
            console.log('Error al desloguear', error);
        }
    }

    return (
        <>
            <Button variant="ghost" style={{ cursor: 'pointer', marginLeft: '0.5rem', marginRight: '0.5rem' }}>
                {userName}
            </Button>
            <Button variant="ghost" style={{ cursor: 'pointer' }} onClick={handleLogOut}>
                Log Out
            </Button>
        </>
    );
}
