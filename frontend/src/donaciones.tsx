import {
    List,
    Datagrid,
    Edit,
    EditButton,
    SimpleForm,
    TextField,
    NumberField,
    NumberInput,
    DateField,
    DateInput,
    Create,
    RadioButtonGroupInput,
    ReferenceField,
    ReferenceInput,
    SelectInput
} from 'react-admin';

export const DonacionesList = () => (
    <List>
        <Datagrid>
            <TextField source="tipo" />
            <NumberField source="monto" options={{
                style: 'currency',
                currency: 'MXN'
            }} />
            <DateField source="fecha" />
            <ReferenceField source="donador" reference="donadores">
                <TextField source="correo" /> 
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);

export const DonacionesEdit = () => (
    <Edit>
        <SimpleForm>
            <RadioButtonGroupInput source='tipo' choices={[
                { id: 'especie', name: 'Especie' },
                { id: 'monetaria', name: 'Monetaria' }
            ]} />
            <NumberInput source="monto" />
            <DateInput source="fecha" />
            <ReferenceInput source="donador" reference="donadores">
                <SelectInput optionText="correo" /> 
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const DonacionesCreate = () => (
    <Create>
        <SimpleForm>
            <RadioButtonGroupInput source='tipo' choices={[
                { id: 'especie', name: 'Especie' },
                { id: 'monetaria', name: 'Monetaria' }
            ]} />
            <NumberInput source="monto" />
            <DateInput source="fecha" />
            <ReferenceInput source="donador" reference="donadores">
                <SelectInput optionText="correo" /> 
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export const DonacionesShow = () => (
    <List>
        <Datagrid>
            <TextField source="tipo" />
            <NumberField source="monto" options={{
                style: 'currency',
                currency: 'MXN'
            }} />
            <DateField source="fecha" />
            <ReferenceField source="donador" reference="donadores">
                <TextField source="correo" /> 
            </ReferenceField>
        </Datagrid>
    </List>
);

