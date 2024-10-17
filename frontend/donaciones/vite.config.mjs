import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': process.env,
    },
    server: {
        host: true,
        https: {
            key: fs.readFileSync('./certs/server.key'),
            cert: fs.readFileSync('./certs/server.crt'),
        },
        port: 5137,
        open: true,
    },
    base: '/',
    build: {
        outDir: 'dist', // Especifica que la salida se generará en la carpeta 'dist'
    },
});
