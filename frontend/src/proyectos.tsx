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
} from "react-admin";

export const ProyectosList = () => (
    <List>
        <Datagrid>
            <TextField source="nombre" />
            <TextField source="descripción" />
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
        </Datagrid>
    </List>
);

export const ProyectosEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="nombre" />
            <TextInput source="description" />
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
            <TextField source="descrpción" />
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
