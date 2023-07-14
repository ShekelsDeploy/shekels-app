import { useEffect, useState } from 'react';
import imageHair2 from 'assets/icons/hair2.svg';
import imageBeard from 'assets/icons/beard.svg';
import imageEye from 'assets/icons/eye.svg';
import imageHairCutMen from 'assets/icons/haircutmen.svg';
import imageHairCut from 'assets/icons/haircut.svg';
import imageNails from 'assets/icons/nails.svg';
import imageLipstick from 'assets/icons/lipstick.svg';
import AddressIcon from "./addressIcon";
import CardService from "./cardService";
import { ModalCustom } from 'components/signup/ModalCustom';
import { LoginForm } from 'components/signup/LoginForm';
import { io } from 'socket.io-client';
import { BASE_URL } from 'services/utils/config';
import { ButtonStylePrimary, ButtonStyleSecondary } from 'assets/class-styles';
import { cancelRequested, getOsByUser, getOsRequested, paidRequested } from 'services/orders/orders';
import PaidForm from './paidForm';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'assets/css/mapRequired.css'
import L from 'leaflet';
import marker from 'assets/images/conejo_burla.png';
import MapBackground from 'components/map/MapBackground';
const socket = io(BASE_URL);
const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [50, 50],
});
export default function CustomerForm() {
    const tabSelectec = 'my-2 block border-t-0 border-b-4 border-black px-7 pt-4 pb-3.5 text-base font-bold uppercase hover:text-gray-500 hover:border-gray-500'
    const tabNoSelectec = 'my-2 block border-x-0 border-t-0 border-b-4 border-transparent px-7 pt-4 pb-3.5 text-base font-bold uppercase hover:text-gray-500';
    const [tab, setTab] = useState(1);
    function tabHandler(tab: number) {
        setTab(tab)
    }
    // Paso donde se encuentra la orden de servicio
    const [orderStep, setOrderStep] = useState(2);
    // Tipo de orden
    const [typeOrder, setTypeOrder] = useState('');
    // Modales
    const [showModalLogin, setshowModalLogin] = useState(false);
    const [showModalAccept, setshowModalAccept] = useState(false);
    function openLogin() {
        setshowModalLogin(!showModalLogin);
    }
    function openAccept() {
        setshowModalAccept(!showModalAccept);
    }
    // Esta es la orden de servicio importante
    const [osData, setOsData] = useState() as any;
    // Funcion para checar en que status se encuentra la orden
    function statusOrder(status: string) {
        switch (status) {
            case 'REQUESTED':
                setOrderStep(2)
                break;
            case 'ACCEPTED':
                setOrderStep(3)
                break;
            case 'PAID':
                setOrderStep(4)
                break;
            default:
                setOrderStep(1);
                break;
        }
    }

    useEffect(() => {
        if (localStorage.getItem('storage_id') !== null) {
            // Trae la orden de servicio en el usuario logueado es una lista de ordenes
            getOsByUser(localStorage.getItem('storage_id')).then((res) => {
                if (res.length > 0) {
                    // Trae la orden completa es solo una orden
                    getOsRequested({ userId: localStorage.getItem('storage_id'), osId: res[0].id }).then((res) => {
                        setOsData(res);
                        console.log(res);

                    })
                    statusOrder(res[0].status);
                } else {
                    setOrderStep(1);
                }
            })
        }
        // Cuando el usuario partner acepta entra a este socket
        socket.on('receive_message', (data) => {
            console.log(data);
            if (data?.status === 'ACCEPTED') {
                console.log('ya se acepto la orden', data);
                setOsData(data.partnerInfo);
                setOrderStep(3);
            }
        });
        return () => {
            socket.off('receive_message');
        }
    }, []);
    // Funcion que se ejecuta cuando seleccionamos un servicio
    function handlerService(type: string) {
        console.log(localStorage.getItem('storage_id'))
        if (localStorage.getItem('storage_id') === null) {
            setshowModalLogin(true);
            return;
        }
        setTypeOrder(type)
        openAccept();
    }
    // Funcion cuando aceptamos el modal del servicio seleccionado
    function createOrder() {
        socket.emit('client_os_request', {
            serviceType: 'HAIRCUT',
            user: {
                id: localStorage.getItem('storage_id'),
            },
        });
        setOrderStep(2);
        openAccept();
    }
    // Cancelar solicitud
    function cancelPaid() {
        cancelRequested({id:osData?.id})
        .then((response)=> {
            console.log(response);
            setOrderStep(1);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    // Funcion que se ejecuta cuando pagamos
    function paidHandler() {
        console.log(osData)
        // socket.emit('client_payment', {
        //     message: 'Orden de servicio pagada',
        //     roomid: osData?.id,
        // });

        paidRequested({id:osData?.id})
        .then((response)=>{
            console.log(response);
            setOrderStep(4);
        })
        .catch((error)=>{
            console.log(error);
        })

    }
    // Renderizado de la pantalla
    function renderObj() {
        switch (orderStep) {
            case 1:
                return <div className='px-10 py-10 pt-20'>
                    <ul className="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0">
                        <li role="presentation" className="flex-auto text-center" onClick={() => tabHandler(1)}>
                            <a href="#tabs-home01" className={tab === 1 ? tabSelectec : tabNoSelectec}>Belleza</a>
                        </li>
                        <li role="presentation" className="flex-auto text-center" onClick={() => tabHandler(2)}>
                            <a href="#tabs-profile01" className={tab === 2 ? tabSelectec : tabNoSelectec}>Cortes</a>
                        </li>
                    </ul>
                    <div className="mb-6 mt-10">
                        <div className={"transition-opacity duration-150 ease-linear " + (tab === 1 ? '' : 'hidden opacity-0')}>
                            <AddressIcon></AddressIcon>
                            <div className="pt-10">
                                <h2 className="font-bold">Servicios</h2>
                                <div className="auto-fit-grid">
                                    <CardService logo={imageHair2} handlerService={handlerService} text={'Peinados'}></CardService>
                                    <CardService logo={imageNails} handlerService={handlerService} text={'Uñas'}></CardService>
                                    <CardService logo={imageLipstick} handlerService={handlerService} text={'Maquillaje'}></CardService>
                                    <CardService logo={imageHairCut} handlerService={handlerService} text={'Estilista'}></CardService>
                                    <CardService logo={imageEye} handlerService={handlerService} text={'Pestañas'}></CardService>
                                </div>
                            </div>
                        </div>
                        <div className={"transition-opacity duration-150 ease-linear " + (tab === 2 ? '' : 'hidden opacity-0')}>
                            <AddressIcon></AddressIcon>
                            <div className="pt-10">
                                <h2 className="font-bold">Servicios</h2>
                                <div className="auto-fit-grid">
                                    <CardService logo={imageHairCutMen} handlerService={handlerService} text={'Corte'}></CardService>
                                    <CardService logo={imageBeard} handlerService={handlerService} text={'Corte y barba'}></CardService>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                break;
            case 2:
                return <MapBackground>
                    <div className="text-center w-80 p-10 rounded-lg h-40 mt-20 bg-white">
                        <div role="status">
                            <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                            <h1 className='text-xl font-bold color-black mt-10'>Buscando {tab === 1 ? 'Estilista' : 'Barbero'}...</h1>
                        </div>
                    </div>
                </MapBackground>
                break;
            case 3:
                return <PaidForm cancelPaid={cancelPaid} data={osData} paidHandler={paidHandler}></PaidForm>
                break;
            case 4:
                // Aqui va el mapa
                return <div className='mt-30 text-center px-10 py-10 pt-20'>
                    Ya ha sido pagado espere a que lleguen a su casa
                    <div className="h-screen w-full p-10">
                        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[51.505, -0.09]} icon={myIcon}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>

                </div>
            default:
                break;
        }
    }
    return (
        <>
            {renderObj()}
            <ModalCustom showModal={showModalLogin} open={openLogin}>
                <LoginForm open={openLogin} refresh={showModalLogin} isCustomerPage={true}></LoginForm>
            </ModalCustom>
            <ModalCustom showModal={showModalAccept} open={openAccept}>
                <div className='p-10'>
                    <h2 className='text-center font-bold mb-10'>¿Desea solicitar la orden de servicio?</h2>
                    <div className='text-right'>
                        <button onClick={() => openAccept()} type="button" className={ButtonStyleSecondary}>
                            Cancelar
                        </button>
                        <button onClick={() => createOrder()} type="submit" className={ButtonStylePrimary}>
                            Aceptar
                        </button>
                    </div>

                </div>
            </ModalCustom>

        </>
    );
}