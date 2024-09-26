import { TranslationMessages } from 'ra-core';

export const spanishMessages = {
    ra: {
        action: {
            add_filter: 'Agregar filtro',
            add: 'Agregar',
            back: 'Regresar',
            bulk_actions: '1 elemento seleccionado |||| %{smart_count} elementos seleccionados',
            cancel: 'Cancelar',
            clear_array_input: 'Borrar lista',
            clear_input_value: 'Borrar valor',
            clone: 'Clonar',
            confirm: 'Confirmar',
            create: 'Crear',
            create_item: 'Crear %{item}',
            delete: 'Borrar',
            edit: 'Editar',
            export: 'Exportar',
            list: 'Listar',
            refresh: 'Refrescar',
            remove_filter: 'Borrar filtro',
            remove_all_filters: 'Borrar todos los filtros',
            remove: 'Eliminar',
            save: 'Guardar',
            search: 'Buscar',
            select_all: 'Seleccionar todo',
            select_row: 'Seleccionar esta fila',
            show: 'Mostrar',
            sort: 'Ordenar',
            undo: 'Deshacer',
            unselect: 'Deseleccionar',
            expand: 'Expandir',
            close: 'Cerrar',
            open_menu: 'Abrir menú',
            close_menu: 'Cerrar menú',
            update: 'Actualizar',
            move_up: 'Subir',
            move_down: 'Bajar',
            open: 'Abrir',
            toggle_theme: 'Alternar modo claro/oscuro',
            select_columns: 'Columnas',
            update_application: 'Recargar applicación',
        },
        boolean: {
            true: 'Si',
            false: 'No',
            null: ' ',
        },
        page: {
            create: 'Crear %{name}',
            dashboard: 'Panel',
            edit: '%{name} %{recordRepresentation}',
            error: 'Algo salió mal',
            list: '%{name}',
            loading: 'Cargando',
            not_found: 'No existe',
            show: '%{name} %{recordRepresentation}',
            empty: 'No %{name} aún.',
            invite: '¿Quieres agregar uno?',
        },
        input: {
            file: {
                upload_several:
                    'Suelte algunos archivos para cargarlo o haga clic para seleccionar uno.',
                upload_single: 'Suelte un archivo para cargarlo o haga clic para seleccionarlo.',
            },
            image: {
                upload_several:
                    'Suelta algunas fotos para subirlas, o haz clic para seleccionar una.',
                upload_single:
                    'Suelte una imagen para cargarla o haga clic para seleccionarla.',
            },
            references: {
                all_missing: 'No se pueden encontrar datos de referencias.',
                many_missing:
                    'Al menos una de las referencias asociadas ya no está disponible.',
                single_missing:
                    'La referencia asociada ya no está disponible.',
            },
            password: {
                toggle_visible: 'Ocultar contraseña',
                toggle_hidden: 'Mostrar contraseña',
            },
        },
        message: {
            about: 'Acerca',
            are_you_sure: '¿Estás seguro?',
            auth_error:
                'Se ha producido un error al validar el token de autenticación.',
            bulk_delete_content:
                '¿Seguro que quieres borrar este %{name}? |||| ¿Seguro que quieres borrar estos %{smart_count} elementos?',
            bulk_delete_title:
                'Borrar %{name} |||| Borrar %{smart_count} %{name}',
            bulk_update_content:
                '¿Seguro que queieres actualizar este %{name}? |||| ¿Seguro que quieres borrar estos %{smart_count} elementos?',
            bulk_update_title:
                'Actualizar %{name} |||| Actualizar %{smart_count} %{name}',
            clear_array_input: '¿Seguro que quieres borrar toda la lista?',
            delete_content: '¿Seguro quieres borrar este elemento?',
            delete_title: 'Borrar %{name} #%{id}',
            details: 'Detalles',
            error: "Se ha producido un error del cliente y no se ha podido completar su solicitud.",

            invalid_form: 'El formato no es válido. Compruebe si hay errores.',
            loading: 'Por favor espere.',
            no: 'No',
            not_found:
                'O has escrito mal la URL o has seguido un enlace incorrecto.',
            yes: 'Si',
            unsaved_changes:
                "Algunos de tus cambios no se han guardado. ¿Estás seguro de que quieres ignorarlos?",
        },
        navigation: {
            clear_filters: 'Quitar filtros',
            no_filtered_results:
                'No se ha encontrado ningún %{resource} utilizando los filtros actuales.',
            no_results: 'No %{resource} encontrado.',
            no_more_results:
                'El número de página %{page} está fuera de los límites. Prueba con la página anterior.',
            page_out_of_boundaries: 'Número de página %{page} fuera de los límites.',
            page_out_from_end: 'No se puede pasar de la última página',
            page_out_from_begin: 'No se puede ir antes de la página 1',
            page_range_info: '%{offsetBegin}-%{offsetEnd} de %{total}',
            partial_page_range_info:
                '%{offsetBegin}-%{offsetEnd} de más de %{offsetEnd}',
            current_page: 'Página %{page}',
            page: 'Ir a la página %{page}',
            first: 'Ir a la primera página.',
            last: 'Ir a la última página.',
            next: 'Siguiente página.',
            previous: 'Página pasada',
            page_rows_per_page: 'Filas por página:',
            skip_nav: 'Saltar al conetenido',
        },
        sort: {
            sort_by: 'Ordenar por %{field} %{order}',
            ASC: 'ascendente',
            DESC: 'descendente',
        },
        auth: {
            auth_check_error: 'Inicie sesión para continuar',
            user_menu: 'Perfil',
            username: 'Usuario',
            password: 'Contraseña',
            sign_in: 'Iniciar sesión',
            sign_in_error: 'Autenticación fallida, por favor reintente',
            logout: 'Cerrar sesión',
        },
        notification: {
            updated: 'Elemento actualizado |||| %{smart_count} elementos actualizados',
            created: 'Elemento creado',
            deleted: 'Elemento borrado |||| %{smart_count} elementos borrados',
            bad_item: 'Elementos incorrecto',
            item_doesnt_exist: 'Elementos no existe',
            http_error: 'Error de comununicación con el servidor',
            data_provider_error:
                'error dataProvider. Comprueba los detalles en la consola.',
            i18n_error:
                'No se pueden cargar las traducciones para el idioma especificado',
            canceled: 'Acción cancelada',
            logged_out: 'Su sesión ha finalizado, vuelva a conectarse.',
            not_authorized: "No estás autorizado a acceder a este recurso.",
            application_update_available: 'Nueva versión disponible',
        },
        validation: {
            required: 'Requerido',
            minLength: 'Debe tener %{min} caracteres como mínimo',
            maxLength: 'Debe tener %{max} caracteres o menos',
            minValue: 'Debe ser al menos %{min}',
            maxValue: 'Debe ser %{max} o inferior',
            number: 'Debe ser un número',
            email: 'Debe ser un email válido',
            oneOf: 'Debe ser uno de los siguientes: %{options}',
            regex: 'Debe coincidir con un formato específico (regexp): %{pattern}',
            unique: 'Debe ser único',
        },
        saved_queries: {
            label: 'Consultas guardadas',
            query_name: 'Nombre de la consulta',
            new_label: 'Guaradar consulta actual...',
            new_dialog_title: 'Guadar consulta actual como',
            remove_label: 'Eliminar consulta guardada',
            remove_label_with_name: 'Eliminar consulta "%{name}"',
            remove_dialog_title: '¿Eliminar consulta guardada?',
            remove_message:
                '¿Estás seguro de que quieres eliminar ese elemento de la lista de consultas guardadas?',
            help: 'Filtra la lista y guarda esta consulta para más tarde.',
        },
        configurable: {
            customize: 'Personalizar',
            configureMode: 'Configurar esta página',
            inspector: {
                title: 'Inspector',
                content: 'Pase el ratón sobre los elementos de la interfaz de usuario de la aplicación para configurarlos',
                reset: 'Restablecer ajustes',
                hideAll: 'Ocultar todo',
                showAll: 'Mostrar todo',
            },
            Datagrid: {
                title: 'Cuadrícula de datos',
                unlabeled: 'Columna sin etiquetar #%{column}',
            },
            SimpleForm: {
                title: 'Forma',
                unlabeled: 'Entrada no etiquetada #%{input}',
            },
            SimpleList: {
                title: 'Lista',
                primaryText: 'Texto principal',
                secondaryText: 'Texto secundario',
                tertiaryText: 'Texto terciario',
            },
        },
    },
};
