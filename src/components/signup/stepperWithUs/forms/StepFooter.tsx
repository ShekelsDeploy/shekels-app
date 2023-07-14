import { FC, useMemo } from "react";
import defaultImg from '../../../../assets/images/defaultImg.jpg';
import { TextInput } from "../../../utils/Input";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { onlyLetters } from "../../../../services/validation/validation";
import { ButtonStylePrimary, ButtonStyleSecondary } from "../../../../assets/class-styles";
const schema = yup.object({
    name: onlyLetters({ required: true, minSize: 3 }),
    lastName: onlyLetters({ required: true, minSize: 3 })
});
interface Props {
    cancelar: Function,
    nextStep: any,
    previousStep: Function,
    handdler: any,
}
export const StepFooter: FC<Props> = ({ cancelar, nextStep, previousStep, handdler }) => {
    return (
        <>
            <div className='step-footer md:block hidden'>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button onClick={() => cancelar()} type="button" className={ButtonStyleSecondary}>
                        Cancelar
                    </button>
                    <button onClick={() => previousStep()} type="button" className={ButtonStyleSecondary}>
                        Atras
                    </button>
                    <button onClick={nextStep(handdler)} type="submit" className={ButtonStylePrimary}>
                        Siguiente
                    </button>
                </div>
            </div>
            <div className='md:hidden block'>
                <div className="bg-gray-50 text-right">
                    <button onClick={nextStep(handdler)} type="submit" className={ButtonStylePrimary}>
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