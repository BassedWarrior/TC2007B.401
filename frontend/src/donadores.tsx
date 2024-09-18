import {List, Datagrid, Edit, SimpleForm, TextField, TextInput, Create, required, EmailField} from 'react-admin'

export const DonadoresList = () =>(
    <List>
        <Datagrid>
            <TextField source = "nombre"/>
            <EmailField source = "email"/>
        </Datagrid>
    </List>
);

export const DonadoresEdit = () =>(
    <Edit>
        <SimpleForm>
            <TextInput source ="nombre"/>
            <TextInput source="email"/>
        </SimpleForm>
    </Edit>
);

export const DonadoresCreate = () =>(
    <Create>
        <SimpleForm>
            <TextInput source = "nombre"/>
            <TextInput source = "email"/>
        </SimpleForm>
    </Create>
);

export const DonadoresShow = () =>(
    <List>
        <TextField source = "nombre"/>
        <EmailField source = "email"/>
    </List>
)