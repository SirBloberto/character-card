import { render } from 'solid-js/web';
import App from './app';
import { AppProvider } from './context/app';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
}

render(() => (
    <AppProvider>
        <App/>
    </AppProvider>
), document.getElementById('root'));