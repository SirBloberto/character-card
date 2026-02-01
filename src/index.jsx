import { render } from 'solid-js/web';
import App from './app';
import { AppProvider } from './context/app';

render(() => (
    <AppProvider>
        <App/>
    </AppProvider>
), document.getElementById('root'));