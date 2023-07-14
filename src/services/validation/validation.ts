import * as yup from "yup";
interface validators {
    maxSize?: number,
    required?: boolean,
    minSize?: number,
    size?: number
}

const defaultValidation = yup.string().matches(/^(?!\s)/, 'No se permiten espacios al inicio');

const allCaracters = ({ maxSize = 20, required = false, minSize = 0 }: validators) => {
    let validation = defaultValidation;
    const ExpReg = new RegExp("^(|.{" + minSize + ",})$");
    validation = required ? validation.required('Campo requerido') : validation;
    validation = validation.matches(ExpReg, 'Numero minimo de caracteres ' + minSize);
    validation = validation.max(maxSize, 'Numero maximo de caracteres ' + maxSize);
    return validation;
}
const email = ({ maxSize = 20, required = false, minSize = 0 }: validators) => {
    let validation = defaultValidation;
    validation = required ? validation.required('Campo requerido') : validation;
    return validation
        .email('Correo electronico incorrecto "Ejemplo gabs@mail.com"')
        .max(maxSize, 'Numero maximo de caracteres ' + maxSize)
        .min(minSize, 'Numero minimo de caracteres ' + minSize);
}
const onlyLetters = ({ maxSize = 20, required = false, minSize = 0 }: validators) => {
    let validation = defaultValidation;
    const ExpReg = new RegExp("^(|.{" + minSize + ",})$");
    validation = required ? validation.required('Campo requerido') : validation;
    validation = validation.matches(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/, {
        excludeEmptyString: true,
        message: 'No se aceptan numeros ni caracteres especiales'
    });
    validation = validation.matches(ExpReg, 'Numero minimo de caracteres ' + minSize);
    validation = validation.max(maxSize, 'Numero maximo de caracteres ' + maxSize);
    return validation;
}
const onlyNumbers = ({ maxSize = 20, required = false, minSize = 0 }: validators) => {
    let validation = defaultValidation;
    const ExpReg = new RegExp("^(|.{" + minSize + ",})$");
    validation = required ? validation.required('Campo requerido') : validation;
    validation = validation.matches(/^[0-9]+$/, {
        excludeEmptyString: true,
        message: 'Solo se aceptan numeros'
    });
    validation = validation.matches(ExpReg, 'Numero minimo de caracteres ' + minSize);
    validation = validation.max(maxSize, 'Numero maximo de caracteres ' + maxSize);
    return validation;
};
const exactNumber = ({ size = 10, required = false }: validators) => {
    let validation = defaultValidation;
    validation = required ? validation.required('Campo requerido') : validation;
    return validation
        .matches(/^[0-9]+$/, 'Solo se aceptan numeros')
        .length(size, 'El campo debe de contener ' + size + ' caracteres');
};

const stringPury = (value: any) => {
    value.toString();
    return value.trim().replace(/\s\s+/g, ' ');
}
export {
    onlyLetters,
    onlyNumbers,
    stringPury,
    allCaracters,
    email,
    exactNumber
}