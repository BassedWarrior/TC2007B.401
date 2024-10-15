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
    EditButton,
    DeleteButton
} from 'react-admin';

export const DonadoresList = () =>(
    <List>
        <Datagrid>
            <TextField source = "nombre"/>
            <EmailField source = "correo"/>
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);

export const DonadoresEdit = () =>(
    <Edit>
        <SimpleForm>
            <TextInput source ="nombre" validate={[required()]} />
            <TextInput source="correo" validate={[required()]} />
        </SimpleForm>
    </Edit>
);

export const DonadoresCreate = () =>(
    <Create redirect='/donadores'>
        <SimpleForm>
            <TextInput source="nombre" validate={[required()]} />
            <TextInput source="correo" validate={[required()]} />
        </SimpleForm>
    </Create>
);

export const DonadoresShow = () =>(
    <List>
        <TextField source = "nombre"/>
        <EmailField source = "correo"/>
    </List>
)
