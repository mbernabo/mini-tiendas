import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Theme>
            <CookiesProvider defaultSetOptions={{ path: '/' }}>
                <App />
            </CookiesProvider>
        </Theme>
    </BrowserRouter>
);
