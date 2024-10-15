import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  houseLightTheme,
  houseDarkTheme
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

//Icons for resources
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PeopleIcon from '@mui/icons-material/People';
import WaterDamageIcon from '@mui/icons-material/WaterDamage';
import AddCardIcon from '@mui/icons-material/AddCard';

const dataProvider = jsonServerProvider('https://localhost:5001/api');
export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
    dashboard={Dashboard}
    lightTheme={houseLightTheme}
    darkTheme={houseDarkTheme}
  >
    <Resource
      name="admins"
      list={ListGuesser}
      edit={EditGuesser}
      icon={ManageAccountsIcon}
    />
    <Resource
      name="donadores"
      list={DonadoresList}
      edit={DonadoresEdit}
      create={DonadoresCreate}
      icon={PeopleIcon}
    />
    <Resource
      name="Proyectos"
      list={ProyectosList}
      edit={ProyectosEdit}
      create={ProyectosCreate}
      icon={WaterDamageIcon}
    />
    <Resource
      name="donaciones"
      list={DonacionesList}
      edit={DonacionesEdit}
      create={DonacionesCreate}
      icon={AddCardIcon}
    />
  </Admin>
);
