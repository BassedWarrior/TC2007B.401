import {List, Datagrid, Edit, SimpleForm, TextField, TextInput, NumberField, NumberInput, DateField, DateInput, Create, EmailField, RadioButtonGroupInput, ReferenceField, ReferenceInput} from 'react-admin'

export const DonacionesList = () =>(
    <List>
        <Datagrid>
            <TextField source = "tipo"/>
            <NumberField source = "monto" options={{ style: 'currency', currency: 'MXN' }}/>
            <DateField source = "fecha"/>
            <ReferenceField source = "email" reference = "donadores"/>
        </Datagrid>
    </List>
);

export const DonacionesEdit = () =>(
    <Edit>
        <SimpleForm>
            <RadioButtonGroupInput source='tipo' choices={[
                {id: 'especie', name: 'Especie'},
                {id: 'monetaria', name: 'Monetaria'}
            ]}/>
            <NumberInput source ="monto" />
            <DateInput source ="fecha"/>
            <ReferenceInput source="email" reference="donadores"/>
        </SimpleForm>
    </Edit>
);

export const DonacionesCreate = () =>(
    <Create>
        <SimpleForm>
        <RadioButtonGroupInput source='Tipo' choices={[
                {id: 'especie', name: 'Especie'},
                {id: 'monetaria', name: 'Monetaria'}
            ]}/>
            <NumberInput source = "monto"/>
            <DateInput source ="fecha"/>
            <ReferenceInput source="email" reference="donadores"/>
        </SimpleForm>
    </Create>
);

export const DonacionesShow = () =>(
    <List>
        <Datagrid>
        <TextField source = "tipo"/>
            <NumberField source = "monto" options={{ style: 'currency', currency: 'MXN' }}/>
            <DateField source = "fecha"/>
            <ReferenceField source = "email" reference = "donadores"/>
        </Datagrid>
    </List>
)