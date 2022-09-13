const messages = {
    required: ':name é requerido',
    minlength: ':name precisa ter o minímo de :min caracteres',
    maxlength: ':name precisa ter o máximo de :max caracteres',
    email: ':name não é um e-mail válido'
}

export class ValidationMessage {
    //primeiro parametro error, segundo parametro label
    //exemplo [:name, :min]
    static getMessage(error: string, replaceTokens: Array<any>) {
        //pega a mansagem de validação do erro
        //@ts-ignore
        let message = messages[error];
        //expressão regular
        //pega os dois pontos e letras de a - z
        const tokens = message.match(/:\[a-z]+/g)
        //para cada token, recebe o indice do token
        //@ts-ignore
        tokens.forEach((token, index) => message = message.replace(token, replaceToken[index]))
        return message
    }
}