import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { email, exactNumber } from '../../../services/validation/validation';
import { TextInput } from '../../../components/utils/Input';
import { ButtonStylePrimary } from '../../../assets/class-styles';
import { useMemo } from 'react';
import { updateUserInfo } from 'services/users/users';
import { contactUpdate } from 'services/person/person';
const schema = yup.object({
    email: email({ required: true, maxSize: 100 }),
    phone: exactNumber({ required: true }),
});
function ContactEdit({ data }: any) {
    const { handleSubmit, getValues, register, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema), // Resolver especial para useForm recibe el esquema de yup
        mode: "all", // Cuando se hacen las validaciones
    });
    useMemo(() => {
        reset(data)
    }, [data]);
    function updateData() {
        const data = {
            email: getValues("email"),
            phone: getValues("phone"),
            id: localStorage.getItem('storage_id')
        }
        contactUpdate(data).then((res) => {
            console.log(res);
        });
    }
    return (
        <>
            <h2 className="mb-4 text-lg">Editar Datos de Contacto</h2>
            <form>
                <div className="grid pb-5 grid-cols-6 gap-5">
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
                <button type="submit" onClick={updateData} className={ButtonStylePrimary}>
                    Guardar
                </button>
            </form>
        </>
    );
}

export default ContactEdit;
