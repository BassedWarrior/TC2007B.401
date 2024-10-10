import {
    SimpleList,
    List,
    Datagrid,
    TextField,
    DateField,
    NumberField,
    SelectField,
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    DateInput,
    RadioButtonGroupInput,
    Show,
    SimpleShowLayout,
    EditButton,
    Create,
    required,
} from "react-admin";

export const ProyectosList = () => (
    <List>
        <Datagrid>
            <TextField source="nombre" />
            <TextField source="descripcion" />
            <DateField source="inicio" />
            <DateField source="fin" />
            <SelectField source="estado" choices={[
                { id: "planeado", name: "Planeado" },
                { id: "en progreso", name: "En Progreso" },
                { id: "completado", name: "Completado" },
                { id: "cancelado", name: "Cancelado" },
            ]} />
            <NumberField source="presupuesto" options={{
                style: "currency",
                currency: "MXN",
            }} />
            <NumberField source="objetivo" options={{
                style: "currency",
                currency: "MXN",
            }} />
            <EditButton/>
        </Datagrid>
    </List>
);

export const ProyectosEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="nombre" />
            <TextInput source="descripcion" />
            <DateInput source="inicio" />
            <DateInput source="fin" />
            <RadioButtonGroupInput source="estado" choices={[
                { id: "planeado", name: "Planeado" },
                { id: "en progreso", name: "En Progreso" },
                { id: "completado", name: "Completado" },
                { id: "cancelado", name: "Cancelado" },
            ]} />
            <NumberInput source="presupuesto" />
            <NumberInput source="objetivo" />
        </SimpleForm>
    </Edit>
);

export const ProyectosShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="nombre" />
            <TextField source="descrpcion" />
            <DateField source="inicio" />
            <DateField source="fin" />
            <SelectField source="estado" choices={[
                { id: "planeado", name: "Planeado" },
                { id: "en progreso", name: "En Progreso" },
                { id: "completado", name: "Completado" },
                { id: "cancelado", name: "Cancelado" },
            ]} />
            <NumberField source="presupuesto" options={{
                style: "currency",
                currency: "MXN",
            }} />
            <NumberField source="objetivo" options={{
                style: "currency",
                currency: "MXN",
            }} />
        </SimpleShowLayout>
    </Show>
);

export const ProyectosCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="nombre" validate={[required()]} />
            <TextInput source="descripcion" validate={[required()]} />
            <DateInput source="inicio" />
            <DateInput source="fin" />
            <RadioButtonGroupInput source="estado" choices={[
                { id: "planeado", name: "Planeado" },
                { id: "en progreso", name: "En Progreso" },
                { id: "completado", name: "Completado" },
                { id: "cancelado", name: "Cancelado" },
            ]} validate={[required()]} />
            <NumberInput source="presupuesto" />
            <NumberInput source="objetivo" />
        </SimpleForm>
    </Create>
);
