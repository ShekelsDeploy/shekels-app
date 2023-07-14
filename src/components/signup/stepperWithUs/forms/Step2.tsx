import { FC, useMemo, useState } from "react";
import defaultImg from '../../../../assets/images/defaultImg.jpg';
import { TextInput } from "../../../utils/Input";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { onlyLetters } from "../../../../services/validation/validation";
import { StepFooter } from "./StepFooter";
const schema = yup.object({
    name: onlyLetters({ required: true, minSize: 3 }),
    lastName: onlyLetters({ required: true, minSize: 3 })
});
interface Props {
    cancelar: Function,
    nextStep: Function,
    previousStep: Function,
    data: any,
    handler: Function
}
export const Step2: FC<Props> = ({ data, handler, cancelar, nextStep, previousStep }) => {
    const { handleSubmit, getValues, register, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema), // Resolver especial para useForm recibe el esquema de yup
        mode: "all",// Cuando se hacen las validaciones
    });
    useMemo(() => {
        reset(data)
    }, [data]);
    // Funcion que controla el submit
    const formSubmitStep2 = (data: any) => {
        handler(data);
        nextStep();
    };
    const [sex, setSex] = useState('MALE');
    const onOptionChange = (e: any) => {
        setSex(e.target.value)
    }
    function onChangeHandler() {
        const data = {
            name: getValues("name"),
            lastName: getValues("lastName"),
            sex: getValues("sex")
        }
        console.log(data)
        handler(data)
    }
    return (
        <>
            <form>
                <div className="md:mb-5 text-center">
                    <div className="mx-auto w-32 h-32 mb-2 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
                        <img id="image" className="object-cover w-full h-32 rounded-full" src={defaultImg} />
                    </div>

                    <label
                        htmlFor="fileInput"

                        className="cursor-pointer inine-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="inline-flex flex-shrink-0 w-6 h-6 -mt-1 mr-1" viewBox="0 0 24 24" stroke="gray" fill="none">
                            <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                            <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                            <circle cx="12" cy="13" r="3" />
                        </svg>
                        Buscar Imagen
                    </label>

                    <div className="mx-auto pt-2 w-48 text-gray-500 text-xs text-center mt-1">Click to add profile picture</div>

                    <input name="photo" id="fileInput" accept="image/*" className="hidden" type="file" ></input>

                    <div className="grid mt-10 mb-10 grid-cols-6 md:gap-6 gap-3" onChange={onChangeHandler}>
                        <div className="col-span-6 sm:col-span-3">
                            <TextInput
                                id="name"
                                label="Nombre"
                                type="text"
                                placeholder="Escribe tu nombre"
                                register={{ ...register('name') }}
                                errorMessage={errors.name?.message}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <TextInput
                                id="lastName"
                                label="Apellido"
                                type="text"
                                placeholder="Escribe tu apellido"
                                register={{ ...register('lastName') }}
                                errorMessage={errors.lastName?.message}
                            />
                        </div>
                        <div className="col-span-6">
                            <div>
                                <h3 className="mb-4 font-semibold text-gray-900 text-left">Sexo:</h3>
                                <div>
                                    <div className="flex justify-center gap-4">
                                        <div className="flex">
                                            <input
                                                id="remember-me"
                                                type="radio"
                                                value="male"
                                                {...register("sex")}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                                Hombre
                                            </label>
                                        </div>
                                        <div className="flex">
                                            <input
                                                id="remember-me"
                                                type="radio"
                                                value="female"
                                                {...register("sex")}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                                Mujer
                                            </label>
                                        </div>
                                        <div className="flex">
                                            <input
                                                id="remember-me"
                                                type="radio"
                                                value="unspecified"
                                                {...register("sex")}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                                Sin definir
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <StepFooter cancelar={() => cancelar()} handdler={formSubmitStep2} nextStep={handleSubmit} previousStep={() => previousStep()}></StepFooter>
            </form>
        </>
    )

}