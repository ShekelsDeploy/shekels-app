import React, { FC, useState } from 'react';
import './stepper.css';
import { signup } from "../../../services/auth/auth";
import { NotificationManager } from 'react-notifications';
import { Step1 } from './forms/Step1';
import { Step2 } from './forms/Step2';
import { Step3 } from './forms/Step3';
import { Step4 } from './forms/Step4';
import { Step5 } from './forms/Step5';
import { Step6 } from './forms/Step6';
import { stringPury } from '../../../services/validation/validation';
import { useNavigate } from 'react-router-dom';

interface Props {
    open?: Function
}
export const SignupForm: FC<Props> = ({ open }) => {
    const navigate = useNavigate();
    const stepFinal = 6;
    const [step, setStep] = useState(2);
    const [formStep1, setFormStep1] = useState({ role: false });
    const [formStep2, setFormStep2] = useState({ name: '', lastName: '',sex:'male' });
    const [formStep3, setFormStep3] = useState({ username: '', password: '', password2: '' });
    const [formStep4, setFormStep4] = useState({ country: 'mx', state: 'son', city: 'obson', street: '', postalCode: '' });
    const [formStep5, setFormStep5] = useState({ email: '', phone: '' });
    const [formStep6, setFormStep6] = useState({ terms: false });
    const stepperTitles = ['Tipo de usuario', 'User Data', 'Account Data', 'Adress Data', 'Contact Data', 'Terminos y condiciones'];
    function nextStep() {
        if (stepFinal !== step) {
            setStep(step + 1);
        }
    }
    function previousStep() {
        if (step !== 1) {
            setStep(step - 1);
        }
    }
    function clearInputs() {
        setStep(1);
        setFormStep1({ role: true });
        setFormStep2({ name: '', lastName: '', sex:'male' });
        setFormStep3({ username: '', password: '', password2: '' });
        setFormStep4({ country: 'mx', state: 'son', city: 'obson', street: '', postalCode: '' });
        setFormStep5({ email: '', phone: '' });
        setFormStep6({ terms: false });
    }

    function renderSwitch(param: number) {
        switch (step) {
            case 1:
                return (
                    <>
                        <section className="animation-scale">
                            <Step1 handler={setFormStep1} cancelar={cancelarBtn} nextStep={nextStep}></Step1>
                        </section>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className='animation-scale'>
                            <Step2 data={formStep2} handler={setFormStep2} previousStep={previousStep} cancelar={cancelarBtn} nextStep={nextStep}></Step2>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <section className='animation-scale'>
                            <Step3 data={formStep3} handler={setFormStep3} previousStep={previousStep} cancelar={cancelarBtn} nextStep={nextStep}></Step3>
                        </section>
                    </>
                );
            case 4:
                return (
                    <>
                        <div className='animation-scale'>
                            <Step4 data={formStep4} handler={setFormStep4} previousStep={previousStep} cancelar={cancelarBtn} nextStep={nextStep}></Step4>
                        </div>
                    </>
                );
            case 5:
                return (
                    <>
                        <section className='animation-scale'>
                            <Step5 data={formStep5} handler={setFormStep5} previousStep={previousStep} cancelar={cancelarBtn} nextStep={nextStep}></Step5>
                        </section>
                    </>
                );
            case 6:
                return (
                    <>
                        <div className='animation-scale'>
                            <Step6 data={formStep6} handler={setFormStep6} previousStep={previousStep} cancelar={cancelarBtn} finalStep={finalStep}></Step6>
                        </div>
                    </>
                );
        }
    };
    function finalStep() {
        saveData();
    }
    // function renderBtnPrevious() {
    //     if (step !== 1) {
    //         return (
    //             <button onClick={previousStep} type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
    //                 Atras
    //             </button>
    //         );
    //     }
    // }
    // function renderBtnNext() {
    //     if (step !== stepFinal) {
    //         return (
    //             <button onClick={nextStep} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
    //                 Siguiente
    //             </button>
    //         );
    //     }
    // }
    // function renderBtnFinalizar() {
    //     if (step === stepFinal) {
    //         return (
    //             <button onClick={saveData} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
    //                 Finalizar
    //             </button>
    //         );
    //     }
    // }
    // function renderBtnCancelar() {
    //     return (
    //         <button onClick={cancelarBtn} type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
    //             Cancelar
    //         </button>
    //     );
    // }

    function saveData() {

        const dataSend = {
            username: stringPury(formStep3.username),
            password: stringPury(formStep3.password),
            email: formStep5.email,
            role: formStep1.role, // True customer, false parnership
            person: {
                name: stringPury(formStep2.name),
                lastName: stringPury(formStep2.lastName),
                gender:formStep2.sex,
                address: {
                    street: stringPury(formStep4.street),
                    city: stringPury(formStep4.city),
                    state: stringPury(formStep4.state),
                    postalCode: stringPury(formStep4.postalCode),
                    country: stringPury(formStep4.country),
                    outputAsLabel: ''
                },
                contactInfo: {
                    email: formStep5.email,
                    phone: formStep5.phone
                }
            }
        }
        signup(dataSend).then((e: any) => {
            if (e.success) {
                NotificationManager.success('Cuenta creada con exito', 'Success');
                clearInputs();
            } else {
                NotificationManager.error('Error al crear cuenta', 'Error');
            }
        });
        open?.();

    }
    function cancelarBtn() {
        clearInputs();
        open?.();
        navigate('/')
    }
    return (
        <>
            <div className="flex items-center justify-center md:pt-12 md:px-4 p-2 lg:px-8">
                <div className="w-full md:space-y-8">
                    <div className='step-header md:flex'>
                        <div className='md:basis-1/2 text-left'>
                            <div className='step-string'>Step: {step} of 6</div>
                            <div className='font-bold'>
                                {stepperTitles[step - 1]}
                            </div>
                        </div>

                        <div className='md:basis-1/2 text-right'>
                            <div className='invisible md:visible'>
                                Creacion de perfil {((step - 1) * 20) + '%'}
                            </div>
                            <div className="w-full bg-gray-200 h-1 mb-6">
                                <div className={'progress-animation' + step + ' bg-green-400 h-1'} style={{ width: ((step - 1) * 20) + '%' }} />
                            </div>
                        </div>
                    </div>
                    <div className='step-content'>
                        <div>
                            {renderSwitch(1)}
                        </div>
                    </div>
                    {/* <div className='step-footer'>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            {renderBtnCancelar()}
                            {renderBtnPrevious()}
                            {renderBtnNext()}
                            {renderBtnFinalizar()}
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )

}