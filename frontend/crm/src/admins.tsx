import {
    List,
    Datagrid,
    Edit,
    SimpleForm,
    TextField,
    SelectField,
    RadioButtonGroupInput,
    TextInput,
    Create,
    required,
    EmailField,
    EditButton,
    DeleteButton,
    Show,
    SimpleShowLayout,
} from 'react-admin';

export const AdminsList = () =>(
    <List>
        <Datagrid>
            <TextField source = "usuario"/>
            <EmailField source = "correo"/>
            <TextField source = "nombre"/>
            <SelectField source = "rol" choices = {[
                { id: "administrador", name: "Admnistrador" },
                { id: "empleado", name: "Empleado" },
            ]} />
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);

export const AdminsEdit = () =>(
    <Edit>
        <SimpleForm>
            <TextInput source = "usuario" validate = {[required()]} />
            <TextInput source = "contrasena" validate = {[required()]} />
            <TextInput source = "correo" validate = {[required()]} />
            <TextInput source = "nombre" validate = {[required()]} />
            <RadioButtonGroupInput source = "rol" choices = {[
                { id: "administrador", name: "Administrador" },
                { id: "empleado", name: "Empleado" },
            ]} validate = {[required()]} />
        </SimpleForm>
    </Edit>
);

export const AdminsCreate = () =>(
    <Create>
        <SimpleForm>
            <TextInput source = "usuario" validate = {[required()]} />
            <TextInput source = "contrasena" validate = {[required()]} />
            <TextInput source = "correo" validate = {[required()]} />
            <TextInput source = "nombre" validate = {[required()]} />
            <RadioButtonGroupInput source = "rol" choices = {[
                { id: "administrador", name: "Administrador" },
                { id: "empleado", name: "Empleado" },
            ]} validate = {[required()]} />
        </SimpleForm>
    </Create>
);

export const AdminsShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source = "usuario" />
            <EmailField source = "correo" />
            <TextField source = "nombre" />
            <SelectField source = "rol" choices = {[
                { id: "administrador", name: "Administrador" },
                { id: "empleado", name: "Empleado" },
            ]} />
        </SimpleShowLayout>
    </Show>
);
