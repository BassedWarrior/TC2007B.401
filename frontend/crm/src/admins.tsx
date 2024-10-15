import {
    List,
    Datagrid,
    Edit,
    SimpleForm,
    TextField,
    TextInput,
    Create,
    required,
    EmailField,
    EditButton
} from 'react-admin';

export const AdminsList = () =>(
    <List>
        <Datagrid>
            <TextField source = "usuario"/>
            <EmailField source = "correo"/>
            <TextField source = "nombre"/>
            <TextField source = "rol"/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const AdminsEdit = () =>(
    <Edit>
        <SimpleForm>
            <TextInput source = "usuario"/>
            <TextInput source = "correo"/>
            <TextInput source = "nombre"/>
            <TextInput source = "contrasena"/>
            <TextInput source = "rol"/>
        </SimpleForm>
    </Edit>
);

export const AdminsCreate = () =>(
    <Create>
        <SimpleForm>
            <TextInput source = "usuario"/>
            <TextInput source = "correo"/>
            <TextInput source = "nombre"/>
            <TextInput source = "rol"/>
        </SimpleForm>
    </Create>
);
