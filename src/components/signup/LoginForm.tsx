import { FC, useEffect } from "react";
import { NotificationManager } from "react-notifications";
import { login } from "services/auth/auth";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { allCaracters } from "services/validation/validation";
import { useForm } from "react-hook-form";
import { TextInput } from "components/utils/Input";
import { setAccountData } from "store/accountSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ButtonStylePrimary } from "assets/class-styles";
import logo from 'assets/images/logo2.png';
const schema = yup.object({
    username: allCaracters({ required: true, maxSize: 40 }),
    password: allCaracters({ required: true })
});
interface Props {
    open?: Function,
    refresh?: any,
    isCustomerPage?: boolean
}
export const LoginForm: FC<Props> = ({ open, refresh, isCustomerPage = false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleSubmit, register, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema), // Resolver especial para useForm recibe el esquema de yup
        mode: "all", // Cuando se hacen las validaciones
    });
    const formSubmit = (data: any) => {
        loginUse(data);
    };
    function clearInputs() {
        reset({ username: '', password: '' });
    }
    useEffect(() => {
        clearInputs();
    }, [refresh]);

    async function loginUse(data: any) {
        let response: any = '';
        response = await login(data);
        if (response.success) {
            dispatch(setAccountData({
                roles: [response?.response.user.roles[0]?.roleName],
                logged: 1,
                username: response?.response.user.username,
                id: response?.response.user.id,
            }));
            console.log(response);
            localStorage.setItem("storage_role", response?.response.user.roles[0]?.roleName);
            localStorage.setItem("storage_logged", '1');
            localStorage.setItem("storage_username", response?.response.user.username);
            localStorage.setItem("storage_id", response?.response.user.id);
            localStorage.setItem("storage_avatar", response?.response.user.avatar);
            isCustomerPage ?  window.location.replace('/customer') :  window.location.replace('/');
            NotificationManager.success('Ha iniciado sesion con exito', 'Success');
            clearInputs();
        } else {
            NotificationManager.error('Error al iniciar sesion', 'Error');
        }
        console.log(response);
        open?.();
    }
    return (
        <div className="Login">
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">

                    <div>
                        <img
                            className="mx-auto h-48 w-auto"
                            src={logo}
                            alt="Your Company"
                        />
                        <h2 className="mt-1 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Inicia sesion en tu cuenta
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            <Link to='/signup'>
                                <span className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Registrate aqui
                                </span>
                            </Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6">
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <TextInput
                                    id={"username-email"+isCustomerPage}
                                    type="text"
                                    placeholder="Username o Email"
                                    register={{ ...register('username') }}
                                    errorMessage={errors.username?.message}
                                />
                            </div>
                            <div>
                                <TextInput
                                    id={"password"+isCustomerPage}
                                    type="password"
                                    placeholder="Password"
                                    register={{ ...register('password') }}
                                    errorMessage={errors.password?.message}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id={"remember-me"+isCustomerPage}
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Recordarme
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    ¿Olvide mi Contraseña?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                onClick={handleSubmit(formSubmit)}
                                className={ButtonStylePrimary + ' md:w-full'}
                            >
                                Iniciar sesion
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}