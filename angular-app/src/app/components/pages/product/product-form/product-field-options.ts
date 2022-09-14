
import { FieldsOptions } from './../../../../common/fields-options';

const fieldsOptions: FieldsOptions = {
    name: {
        id: 'name',
        label: 'Nome',
        validationMessage: {
            maxlength: 100
        }
    },
    price: {
        id: 'price',
        label: 'Valor'
    },
    active: {
        id: 'active',
        label: 'Ativo'
    }
}
export default fieldsOptions