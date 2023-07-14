import { useState } from "react";
import { ButtonStylePrimary, InputStyle, LabelStyle } from "../../../assets/class-styles";
import SpanValidator from "../../../components/signup/SpanValidator";
import { updateUserInfo } from "services/users/users";
import { passwordUpdate } from "services/auth/auth";

function PasswordEdit({ data }: any) {
    const [password, setPassword] = useState("");
    const [passwordLast, setPasswordLast] = useState("");
    // validators
    const [validPassword, setValidPassword] = useState({ lowerCases: false, upperCases: false, symbols: false, numbers: false, max: false });
    // Handlers inputs
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
    const hcPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        // let pattern = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
        setPasswordLast(event.target.value);
    };
    const hcPasswordLast = (event: React.ChangeEvent<HTMLInputElement>) => {
        // let pattern = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
        validatePassword(event.target.value)
        setPassword(event.target.value);
    };
    function updateData() {
        const data = {
            password: password,
            passwordLast: passwordLast
        }
        if (validPassword.max && validPassword.lowerCases && validPassword.numbers && validPassword.symbols && validPassword.upperCases) {
            passwordUpdate(data).then((res) => {
                console.log(res);
            });
        }
    }
    return (
        <>
            <h2 className="mb-4 text-lg">Editar Contraseña</h2>
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
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
                        <label htmlFor="password" className={LabelStyle}>
                            Contraseña anterior <span className='text-red-500'>{validPassword ? '' : 'x'}</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className={InputStyle}
                            value={passwordLast}
                            onChange={hcPasswordLast}
                        />
                    </div>
                </div>
            </div>
            <div className='step-footer md:block'>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button type="submit" onClick={updateData} className={ButtonStylePrimary}>
                        Guardar
                    </button>
                </div>
            </div>
        </>
    );
}

export default PasswordEdit;
