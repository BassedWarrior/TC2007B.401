import {
    SimpleList,
    List,
    Datagrid,
    TextField,
    DateField,
    NumberField,
    SelectField,
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
