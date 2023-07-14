import { useEffect, useState } from "react"
import defaultU from 'assets/images/defaultImg.jpg'
import { io } from 'socket.io-client';
import { availability, updateAvailability } from "services/users/users";
import { BASE_URL } from "services/utils/config";

export default function AvatarNotification() {
    const [colorState, setColorState] = useState('bg-gray-500');
    const [img, setImg] = useState(defaultU);
    const socket = io(BASE_URL);
    useEffect(() => {
        // updateAvailability({ id: localStorage.getItem('storage_id'), availability: 'AVAILABLE' })
        if (localStorage.getItem('storage_id') !== null) {
            setImg(BASE_URL + localStorage.getItem('storage_avatar'));
            availability(localStorage.getItem('storage_id')).then((res) => {
                changeColor(res.availability)
            });
            socket.on(localStorage.getItem('storage_id') + '_A', (data) => {
                changeColor(data.availability)
            });
            return () => {
                socket.off(localStorage.getItem('storage_id') + '_A');
            }
        }
    }, [])
    function changeColor(availability:string){
        switch (availability) {
            case 'AVAILABLE':
                setColorState('bg-green-500')
                break;
            case 'BUSY':
                setColorState('bg-red-500')
                break;
            case 'WAIT':
                setColorState('bg-yellow-500')
                break;
            case 'OFFLINE':
                setColorState('bg-gray-500')
                break;
            default:
                setColorState('bg-gray-500')
                break;
        }
    }
    function changeA() {
        
    }
    return (
        <div>
            <div className="relative">
                <img src={img} alt="" className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" />
                <div className={"absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-black " + colorState}></div>
            </div>
        </div>

    )
}