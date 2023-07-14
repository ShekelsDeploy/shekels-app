import { ButtonStylePrimary, ButtonStyleSecondary } from "assets/class-styles";
import { ModalCustom } from "components/signup/ModalCustom";
import { Carousel } from "flowbite-react";
import { useState } from "react";
import { BASE_URL } from "services/utils/config";
export default function PaidForm({ cancelPaid, data, paidHandler }: any) {
    const [showModalAccept, setshowModalAccept] = useState(false);
    function acceptPaid() {
        paidHandler();
        openAccept();
    }
    function openAccept() {
        setshowModalAccept(!showModalAccept);
    }
    return (
        <div className='flex justify-center pt-20'>
            <div className="w-full max-w-sm bg-white border border-gray-500 pt-10 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center pb-10">
                    <img className="w-24 h-24 mb-3 rounded-full border border-gray-500 shadow-lg" src={BASE_URL + data?.partnerUser.avatar} alt="Bonnie image" />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data?.partnerUser.person.fullName}</h5>
                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{data?.partnerUser.person.address.street}</span>
                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400">$149.89</span>
                    <div className="mt-10 h-60">
                        <Carousel className="w-80 h-56">
                            {
                                data?.documents?.map((i: string, index: number) => {
                                    console.log(i);
                                    return (
                                        <img
                                            className="object-contain h-48 w-96 bg-black"
                                            key={index}
                                            src={BASE_URL + i}
                                            alt={i}
                                        />
                                    );
                                })
                            }
                        </Carousel>
                    </div>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                        <a href="#" onClick={() => openAccept()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pagar</a>
                        <a href="#" onClick={() => cancelPaid()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Cancelar</a>
                    </div>
                </div>
            </div>
            <ModalCustom showModal={showModalAccept} open={openAccept}>
                <div className='p-10'>
                    <h2 className='text-center font-bold mb-10'>¿Desea pagar en efectivo?</h2>
                    <div className='text-right'>
                        <button onClick={() => openAccept()} type="button" className={ButtonStyleSecondary}>
                            Cancelar
                        </button>
                        <button onClick={() => acceptPaid()} type="submit" className={ButtonStylePrimary}>
                            Aceptar
                        </button>
                    </div>

                </div>
            </ModalCustom>
        </div>
    );
}