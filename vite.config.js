import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [solidPlugin()],

    server: {
        proxy: {
            '/api': 'http://localhost:3000',
        },
    },
    
    optimizeDeps: {
        include: [
            'solid-js', 
            'solid-js/web', 
            'solid-transition-group'
        ],
    },

    build: {
        target: 'esnext',
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules/solid-js')) {
                        return 'solid-core';
                    }
                    if (id.includes('solid-transition-group')) {
                        return 'ui-animations';
                    }
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                }
            }
        }
    },
});