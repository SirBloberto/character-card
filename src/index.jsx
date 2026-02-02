import { render } from 'solid-js/web';
import App from './app';
import { AppProvider } from './context/app';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

inject();
injectSpeedInsights();

render(() => (
    <AppProvider>
        <App/>
    </AppProvider>
), document.getElementById('root'));