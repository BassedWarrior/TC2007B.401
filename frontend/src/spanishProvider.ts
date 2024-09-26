import polyglotI18nProvider from 'ra-i18n-polyglot';
import {SpanishMessages} from './SpanishDictionary';

export const i18nProvider = polyglotI18nProvider (
    locale => SpanishMessages,'es' 
);