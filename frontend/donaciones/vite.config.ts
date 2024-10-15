import fs from "fs";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': process.env,
    },
    server: {
        host: true,
        https: {
            key: fs.readFileSync("certs/server.key"),
            cert: fs.readFileSync("certs/server.crt")
        },
    },
    base: './',
});
