import { FC, useMemo } from "react";
import { TextInput } from "../../../utils/Input";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { exactNumber, email } from "../../../../services/validation/validation";
import { StepFooter } from "./StepFooter";
const schema = yup.object({
    email: email({ required: true, maxSize: 100 }),
    phone: exactNumber({ required: true }),
});
interface Props {
    cancelar: Function,
    nextStep: Function,
    handler: Function,
    data: any,
    previousStep: Function
}
export const Step5: FC<Props> = ({ data, handler, cancelar, nextStep, previousStep }) => {
    const { handleSubmit, getValues, register, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema), // Resolver especial para useForm recibe el esquema de yup
        mode: "all", // Cuando se hacen las validaciones
    });
    useMemo(() => {
        reset(data)
    }, [data]);
    // Funcion que controla el submit
    const formSubmitStep2 = (data: any) => {
        handler(data);
        nextStep();
    };
    function onChangeHandler() {
        const data = {
            email: getValues("email"),
            phone: getValues("phone")
        }
        handler(data)
    }
    return (
        <>
            <form>
                <div className="grid pb-5 grid-cols-6 gap-5" onChange={onChangeHandler}>
                    <div className="col-span-6 sm:col-span-6">
                        <TextInput
                            id="email"
                            label="Correo electronico"
                            type="text"
                            placeholder="Escribe tu Email"
                            register={{ ...register('email') }}
                            errorMessage={errors.email?.message}
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                        <TextInput
                            id="phone"
                            label="Telefono"
                            type="text"
                            placeholder="Escribe tu Telefono"
                            register={{ ...register('phone') }}
                            errorMessage={errors.phone?.message}
                        />
                    </div>
                </div>
                <StepFooter cancelar={() => cancelar()} handdler={formSubmitStep2} nextStep={handleSubmit} previousStep={() => previousStep()}></StepFooter>
            </form>
        </>
    )

}