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
import { dataProvider } from "./dataProvider";
import { DonadoresList, DonadoresEdit, DonadoresCreate, DonadoresShow } from "./donadores";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource
      name="Donations"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="Donadores"
      list={DonadoresList}
      edit={DonadoresEdit}
      create={DonadoresCreate}
      show={DonadoresShow}
    />
    <Resource
      name="Projects"
      list={ProyectosList}
      edit={ProyectosEdit}
      show={ProyectosShow}
      create={ProyectosCreate}
    />
  </Admin>
);
