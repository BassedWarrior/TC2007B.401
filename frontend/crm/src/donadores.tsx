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

export const DonadoresList = () =>(
    <List>
        <Datagrid>
            <TextField source = "nombre"/>
            <EmailField source = "correo"/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const DonadoresEdit = () =>(
    <Edit>
        <SimpleForm>
            <TextInput source ="nombre"/>
            <TextInput source="correo"/>
        </SimpleForm>
    </Edit>
);

export const DonadoresCreate = () =>(
    <Create redirect='/donadores'>
        <SimpleForm>
            <TextInput source = "nombre"/>
            <TextInput source = "correo"/>
        </SimpleForm>
    </Create>
);

export const DonadoresShow = () =>(
    <List>
        <TextField source = "nombre"/>
        <EmailField source = "correo"/>
    </List>
)
