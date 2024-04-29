import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Theme>
            <Provider store={store}>
                <App />
            </Provider>
        </Theme>
    </BrowserRouter>
);
