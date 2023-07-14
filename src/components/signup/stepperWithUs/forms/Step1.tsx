import { FC } from "react";
import { ButtonStyleSecondary } from "../../../../assets/class-styles";
interface Props {
    handler: any,
    nextStep: Function,
    cancelar: Function
}
export const Step1: FC<Props> = ({ handler, nextStep, cancelar }) => {
    const selectRole = (role: any) => {
        handler({ role: role })
        nextStep();
    };
    return (
        <>
            <div className='md:flex pt-10 md:flex-row'>
                <div className="md:basis-1/2 mb-5 text-center md:text-right md:pr-4">
                    <button className='btn-role-service w-[300px]' onClick={() => selectRole(false)}>
                        <i className="fa-solid fa-motorcycle"></i>
                        <h4>Trabaja con nosotros</h4>
                    </button>
                </div>
                <div className="md:basis-1/2 mb-5 text-center md:text-left md:pl-4">
                    <button className='btn-role-service w-[300px]' onClick={() => selectRole(true)}>
                        <i className="fa-solid fa-bell-concierge"></i>
                        <h4>Contrata algun servicio</h4>
                    </button>
                </div>
            </div>
            <div className='step-footer pt-4 md:block hidden'>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button onClick={() => cancelar()} type="button" className={ButtonStyleSecondary}>
                        Cancelar
                    </button>
                </div>
            </div>
            <div className='step-footer pt-4 md:hidden block'>
                <div className="bg-gray-50 py-3 text-right">
                    <button onClick={() => cancelar()} type="button" className={ButtonStyleSecondary}>
                        Cancelar
                    </button>
                </div>
            </div>
        </>
    )

}