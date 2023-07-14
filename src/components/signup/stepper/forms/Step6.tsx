import { FC, useMemo, useState } from "react";
import { ButtonStylePrimary, ButtonStyleSecondary } from "assets/class-styles";
import logo1 from 'assets/images/logo2.png';
interface Props {
    cancelar: Function,
    finalStep: Function,
    handler: Function,
    previousStep: Function,
    data: any
}
export const Step6: FC<Props> = ({ data, handler, cancelar, finalStep, previousStep }) => {
    // Funcion para resetear el formulario en reset le debemos pasar todos los inputs a resetear con el valor

    const [checked, setChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const formSubmitStep2 = () => {
        if (checked) {
            setErrorMessage('')
            handler({ terms: checked })
            finalStep();
        } else {
            setErrorMessage('Necesita aceptar los terminos y condiciones')
        }
    };

    useMemo(() => {
        setChecked(data);
    }, [data]);

    function onChangeHandler(e: any) {
        handler(!checked);
        setChecked(!checked);
    }
    return (
        <>
            <form className="flex flex-row">
                <fieldset className='w-full md:basis-5/6'>
                    <legend className="contents text-base font-medium text-gray-900">Terminos y condiciones</legend>
                    <p className="text-sm text-gray-500">Antes de aceptar lea los terminos y condiciones del contrato. <a className="text-sm text-blue-500" href="">Terminos y condiciones</a></p>
                    <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                            <div className="flex h-5 items-center">
                                <input
                                    id="terminos"
                                    name="terminos"
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(e) => onChangeHandler(e)}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terminos" className="font-medium text-gray-700">
                                    Acepto
                                </label>
                                <p className="text-gray-500">Elige esta opcion si aceptas los terminos y condiciones.</p>
                            </div>

                        </div>
                        <span className="text-sm text-red-500">{errorMessage}</span>
                    </div>
                </fieldset>
                <div className="hidden md:block md:basis-1/6">
                    <img src={logo1} className="full-w" alt="Flowbite Logo" />
                </div>
            </form>
            <div className='step-footer pt-4 md:block hidden'>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button onClick={() => cancelar()} type="button" className={ButtonStyleSecondary}>
                        Cancelar
                    </button>
                    <button onClick={() => previousStep()} type="button" className={ButtonStyleSecondary}>
                        Atras
                    </button>
                    <button onClick={formSubmitStep2} type="submit" className={ButtonStylePrimary + (!checked ? ' bg-gray-300 hover:bg-gray-300 cursor-not-allowed':'')}>
                        Finalizar
                    </button>
                </div>
            </div>
            <div className='step-footer pt-4 md:hidden block'>
                <div className="bg-gray-50 py-3 text-right">
                    <button onClick={formSubmitStep2} type="submit" className={ButtonStylePrimary + (!checked ? ' bg-gray-300 hover:bg-gray-300 cursor-not-allowed':'')}>
                        Finalizar
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