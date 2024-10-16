// Este archivo ayuda a obtener datos del backend a través de ra-data-json-server (proveedor de datos de React-Admin)

import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const auth = JSON.parse(localStorage.getItem('auth'));
    options.headers.set('Authorization', `Bearer ${auth.token}`);
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = jsonServerProvider(import.meta.env.VITE_API_URL, httpClient);

export default dataProvider;
