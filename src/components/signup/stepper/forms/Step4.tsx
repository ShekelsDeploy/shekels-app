import { FC, useMemo } from "react";
import defaultImg from '../../../../assets/images/defaultImg.jpg';
import { TextInput } from "../../../utils/Input";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { onlyLetters, exactNumber, allCaracters } from "../../../../services/validation/validation";
import { SelectInput } from "../../../utils/Select";
import { StepFooter } from "./StepFooter";
import { Combobox } from "../../../utils/Combobox";
const schema = yup.object({
    country: onlyLetters({ required: true }),
    state: onlyLetters({ required: true, minSize: 2 }),
    city: onlyLetters({ required: true, minSize: 2 }),
    street: allCaracters({ required: true, maxSize: 100 }),
    postalCode: exactNumber({ required: true, size: 5 })
});
interface Props {
    cancelar: Function,
    nextStep: Function,
    handler: Function,
    data: any,
    previousStep: Function
}
export const Step4: FC<Props> = ({ data, handler, cancelar, nextStep, previousStep }) => {
    const { handleSubmit, control, getValues, register, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema), // Resolver especial para useForm recibe el esquema de yup
        mode: "all", // Cuando se hacen las validaciones
    });
    // Funcion que controla el submit
    const formSubmitStep2 = (data: any) => {
        handler(data);
        nextStep();
    };
    useMemo(() => {
        reset(data)
    }, [data]);
    const countries = [
        { value: 'mx', label: 'Mexico' },
        { value: 'us', label: 'Estados Unidos' },
        { value: 'ca', label: 'Canada' },
    ];
    const cities = [
        { value: 'obson', label: 'Obregon' },
    ];
    const states = [
        { value: 'son', label: 'Sonora' },
    ];
    function onChangeHandler() {
        const data = {
            country: getValues("country"),
            street: getValues("street"),
            postalCode: getValues("postalCode"),
            city: getValues("city"),
            state: getValues("state")
        }
        handler(data)
    }
    return (
        <>
            <form>
                <div className="grid pb-5 grid-cols-6 gap-3" onChange={onChangeHandler}>
                    <div className="col-span-8 md:col-span-3">
                        <Combobox id="pais-combo" defaultValue={data.country} label={"Pais"} control={control} name={'comboPais'} options={countries}></Combobox>
                    </div>
                    <div className="col-span-8 md:col-span-5">
                        <Combobox id="state-combo" defaultValue={data.state} label={"Estado"} control={control} name={'comboState'} options={states}></Combobox>
                    </div>
                    <div className="col-span-8 md:col-span-6">
                        <Combobox id="city-combo" defaultValue={data.city} label={"Ciudad"} control={control} name={'comboCiudad'} options={cities}></Combobox>
                    </div>
                    <div className="col-span-8 md:col-span-2">
                        <TextInput
                            id="postal-code"
                            label="Codigo Postal"
                            type="text"
                            placeholder="Escribe tu codigo postal"
                            register={{ ...register('postalCode') }}
                            errorMessage={errors.postalCode?.message}
                        />
                    </div>
                    <div className="col-span-8">
                        <TextInput
                            id="street-address"
                            label="Calle"
                            type="text"
                            placeholder="Escribe tu calle"
                            register={{ ...register('street') }}
                            errorMessage={errors.street?.message}
                        />
                    </div>
                </div>
                <StepFooter cancelar={() => cancelar()} handdler={formSubmitStep2} nextStep={handleSubmit} previousStep={() => previousStep()}></StepFooter>
            </form>
        </>
    )

}