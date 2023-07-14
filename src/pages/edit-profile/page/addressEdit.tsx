import { Combobox } from "../../../components/utils/Combobox";
import { TextInput } from "../../../components/utils/Input";
import { allCaracters, exactNumber, onlyLetters } from "../../../services/validation/validation";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { ButtonStylePrimary } from "../../../assets/class-styles";
import { useMemo } from "react";
import { updateUserInfo } from "services/users/users";
import { addressUpdate } from "services/person/person";
const schema = yup.object({
    country: onlyLetters({ required: true }),
    state: onlyLetters({ required: true, minSize: 2 }),
    city: onlyLetters({ required: true, minSize: 2 }),
    street: allCaracters({ required: true, maxSize: 100 }),
    postalCode: exactNumber({ required: true, size: 5 })
});
function AddressEdit({ data }: any) {
    const { handleSubmit, control, getValues, register, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema), // Resolver especial para useForm recibe el esquema de yup
        mode: "all", // Cuando se hacen las validaciones
    });
    useMemo(() => {
        console.log(data);
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
    function updateData() {
        const data = {
            country: getValues("country"),
            street: getValues("street"),
            postalCode: getValues("postalCode"),
            city: getValues("city"),
            state: getValues("state"),
            id: localStorage.getItem('storage_id')
        }
        addressUpdate(data).then((res) => {
            console.log(res);
        });
    }
    return (
        <>
            <h2 className="mb-4 text-lg">Editar Direccion</h2>
            <form>
                <div className="grid pb-5 grid-cols-6 gap-3">
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
                <div className='step-footer md:block'>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button type="submit" onClick={updateData} className={ButtonStylePrimary}>
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default AddressEdit;
