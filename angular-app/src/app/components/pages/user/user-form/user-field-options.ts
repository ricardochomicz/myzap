import { FieldsOptions } from './../../../../common/fields-options';

const fieldsOptions: FieldsOptions = {
    name: {
        id: 'name',
        label: 'Nome',
        validationMessage: {
            maxlength: 100
        }
    },
    email: {
        id: 'email',
        label: 'E-mail',
        validationMessage: {
            maxlength: 255
        }
    },
    password: {
        id: 'password',
        label: 'Senha',
        validationMessage: {
            maxlength: 255
        }
    }
}
export default fieldsOptions