import {
    List,
    Datagrid,
    Edit,
    EditButton,
    SimpleForm,
    TextField,
    SelectField,
    NumberField,
    NumberInput,
    DateField,
    DateInput,
    Create,
    RadioButtonGroupInput,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    required,
    DeleteButton,
} from 'react-admin';

import React from 'react';

export const DonacionesList = () => (
    <List>
        <Datagrid>
            <SelectField source="tipo" choices={[
                { id: "efectivo", name: "Efectivo" },
                { id: "digital", name: "Digital" },
            ]} />
            <NumberField source="monto" options={{
                style: 'currency',
                currency: 'MXN'
            }} />
            <DateField source="fecha" />
            <ReferenceField source="donador" reference="donadores">
                <TextField source="correo" /> 
            </ReferenceField>
            <EditButton />
            <DeleteButton/>
        </Datagrid>
    </List>
);

export const DonacionesEdit = () => (
    <Edit>
        <SimpleForm>
            <RadioButtonGroupInput source='tipo' choices={[
                { id: "efectivo", name: "Efectivo" },
                { id: "digital", name: "Digital" }
            ]} validate={[required()]} />
            <NumberInput source="monto" validate={[required()]} />
            <DateInput source="fecha" validate={[required()]} />
            <ReferenceInput source="donador" reference="donadores">
                <SelectInput optionText="correo" /> 
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const DonacionesCreate = () => (
    <Create redirect='/donaciones'>
        <SimpleForm>
            <RadioButtonGroupInput source='tipo' choices={[
                { id: "efectivo" , name: "Efectivo" },
                { id: "digital", name: "Digital" }
            ]} validate={[required()]} />
            <NumberInput source="monto" validate={[required()]} />
            <DateInput source="fecha" validate={[required()]} />
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
