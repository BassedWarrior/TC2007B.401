import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser
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

const dataProvider = jsonServerProvider('http://localhost:5001/api');
export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource
      name="admins"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="donadores"
      list={DonadoresList}
      edit={DonadoresEdit}
      create={DonadoresCreate}
      show={DonadoresShow}
    />
    <Resource
      name="Proyectos"
      list={ProyectosList}
      edit={ProyectosEdit}
      show={ProyectosShow}
      create={ProyectosCreate}
    />
    <Resource
      name="donaciones"
      list={DonacionesList}
      edit={DonacionesEdit}
      create={DonacionesCreate}
      show={DonacionesShow}
    />
  </Admin>
);
