import { FC, useMemo, useState } from "react";
import { ButtonStylePrimary, ButtonStyleSecondary, InputStyle, LabelStyle } from "../../../../assets/class-styles";
import SpanValidator from "../../SpanValidator";

interface Props {
    cancelar: Function,
    nextStep: Function,
    handler: Function,
    previousStep: Function,
    data: any
}
export const Step3: FC<Props> = ({ data, handler, cancelar, nextStep, previousStep }) => {
    const [username, setUsername] = useState("");
    const [usernameMessageError, setUsernameMessageError] = useState('');
    const [pass2MessageError, setPass2MessageError] = useState('');
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    // validators
    const [validPassword, setValidPassword] = useState({ lowerCases: false, upperCases: false, symbols: false, numbers: false, max: false });
    // Handlers inputs
    const hcUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 0) {
            setUsernameMessageError('')
        } else {
            setUsernameMessageError('Campo requerido');
        }
        setUsername(event.target.value);
        const data = {
            username: event.target.value,
            password: password,
            password2: password2
        }
        handler(data)
    };
    const hcPassword2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === password) {
            setPass2MessageError('')
        } else {
            setPass2MessageError('Las contraseñas no coinciden');
        }
        setPassword2(event.target.value);
        const data = {
            password: password,
            username: username,
            password2: event.target.value
        }
        handler(data)
    };
    const hcPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        // let pattern = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
        validatePassword(event.target.value)
        setPassword(event.target.value);
        const data = {
            password: event.target.value,
            username: username,
            password2: password2
        }
        handler(data)
    };
    function validatePassword(value: any) {
        const lowerPattern = /(?=.*[a-z])/g;
        const upperPattern = /(?=.*[A-Z])/g;
        const symbolsPattern = /(?=.*\W)/g;
        const numberPattern = /(?=.*\d)/g;
        const maxPattern = /^[\s\S]{1,16}$/g;
        setValidPassword(
            {
                lowerCases: lowerPattern.test(value),
                upperCases: upperPattern.test(value),
                symbols: symbolsPattern.test(value),
                numbers: numberPattern.test(value),
                max: maxPattern.test(value)
            }
        );
    }
    useMemo(() => {
        validatePassword(data.password);
        setPassword(data.password);
        setPassword2(data.password2);
        setUsername(data.username);
    }, [data]);
    // Funcion que controla el submit
    const formSubmitStep3 = () => {
        let key1 = false;
        let key2 = false;
        if (username.length > 0) {
            key1 = true;
            setUsernameMessageError('')
        } else {
            setUsernameMessageError('Campo requerido');
        }
        if (password2 === password) {
            key2 = true;
            setPass2MessageError('')
        } else {
            setPass2MessageError('Las contraseñas no coinciden');
        }
        if (validPassword.max && validPassword.lowerCases && validPassword.numbers && validPassword.symbols && validPassword.upperCases && key1 && key2) {
            handler({ username: username, password: password, password2: password2 })
            nextStep();
        }
    };
    return (
        <>
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="username" className={LabelStyle}>
                            Nombre usuario
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-base lg:text-sm text-gray-500">
                                User:
                            </span>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-base lg:text-sm"
                                placeholder="Gabs106"
                                value={username}
                                onChange={hcUsername}
                            />
                        </div>
                        <span className="error-message-input ">{usernameMessageError}</span>
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="font-bold mb-1 text-base text-gray-700 block">Crea una contraseña</label>
                    <div className="text-gray-600 mt-2 mb-4">
                        Crea una contraseña segura que incluya los siguientes criterios.
                        <ul className="list-disc text-base lg:text-sm ml-4 mt-2">
                            <li>Letra en minuscula <SpanValidator valid={validPassword.lowerCases}></SpanValidator></li>
                            <li>Letra en mayuscula <SpanValidator valid={validPassword.upperCases}></SpanValidator></li>
                            <li>Numero <SpanValidator valid={validPassword.numbers}></SpanValidator></li>
                            <li>Caracter especial <SpanValidator valid={validPassword.symbols}></SpanValidator></li>
                            <li>Tamaño maximo 16 caracteres <SpanValidator valid={validPassword.max}></SpanValidator></li>
                        </ul>
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="password" className={LabelStyle}>
                            Contraseña <span className='text-red-500'>{validPassword ? '' : 'x'}</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className={InputStyle}
                            value={password}
                            onChange={hcPassword}
                        />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last-name" className={LabelStyle}>
                            Repetir Contraseña
                        </label>
                        <input
                            type="password"
                            name="password2"
                            id="password2"
                            className={InputStyle}
                            value={password2}
                            onChange={hcPassword2}
                        />
                        <span className="error-message-input ">{pass2MessageError}</span>
                    </div>
                </div>
            </div>
            <div className='step-footer md:block hidden'>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button onClick={() => cancelar()} type="button" className={ButtonStyleSecondary}>
                        Cancelar
                    </button>
                    <button onClick={() => previousStep()} type="button" className={ButtonStyleSecondary}>
                        Atras
                    </button>
                    <button onClick={formSubmitStep3} type="submit" className={ButtonStylePrimary}>
                        Siguiente
                    </button>
                </div>
            </div>
            <div className='md:hidden block'>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button onClick={formSubmitStep3} type="submit" className={ButtonStylePrimary}>
                        Siguiente
                    </button>
                    <button onClick={() => previousStep()} type="button" className={ButtonStyleSecondary}>
                        Atras
                    </button>
                    <button onClick={() => cancelar()} type="button" className={ButtonStyleSecondary}>
                        Cancelar
                    </button>
                </div>
            </div>
        </>
    )

}