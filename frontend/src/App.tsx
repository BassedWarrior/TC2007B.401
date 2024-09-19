import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { DonadoresList, DonadoresEdit, DonadoresCreate, DonadoresShow } from "./donadores";
import { authProvider } from "./Login";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider} authProvider={authProvider}>
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
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
  </Admin>
);
