import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import {
    ProyectosList,
    ProyectosEdit,
    ProyectosShow,
    ProyectosCreate,
} from "./proyectos";
import { Layout } from "./Layout";
import { DonadoresList, DonadoresEdit, DonadoresCreate, DonadoresShow } from "./donadores";
import {
  DonacionesCreate,
  DonacionesEdit,
  DonacionesList,
  DonacionesShow
} from "./donaciones";
import jsonServerProvider from 'ra-data-json-server';
import {authProvider} from "./Login";

// Spanish Translation provider.
import { i18nProvider } from "./spanishProvider";
import { Dashboard } from "./dashboard";

const dataProvider = jsonServerProvider('https://localhost:5001/api');
export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
    dashboard={Dashboard}
  >
    <Resource
      name="admins"
      list={ListGuesser}
      edit={EditGuesser}
    />
    <Resource
      name="donadores"
      list={DonadoresList}
      edit={DonadoresEdit}
      create={DonadoresCreate}
    />
    <Resource
      name="Proyectos"
      list={ProyectosList}
      edit={ProyectosEdit}
      create={ProyectosCreate}
    />
    <Resource
      name="donaciones"
      list={DonacionesList}
      edit={DonacionesEdit}
      create={DonacionesCreate}
    />
  </Admin>
);
