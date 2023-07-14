import { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import { BASE_URL } from "services/utils/config";
import { getCountNotifications } from "services/notification/notification";
const socket = io(BASE_URL);
export default function SocketNotification({ openDrawer }: any) {
    const [isConnected, setIsConnected] = useState(false);
    const [message, setMessage] = useState('');
    function countMessage(count: any) {
        if (count > 0) {
            setMessage(count);
        } else {
            setMessage('');
        }
    }
    useEffect(() => {
        // socket.on('connect', () => setIsConnected(true));
        getCountNotifications(localStorage.getItem('storage_id')).then((data) => {
            countMessage(data);
        });
        socket.on(localStorage.getItem('storage_id') + '', (data) => {
            console.log(data);
            countMessage(data?.count)

        });
        return () => {
            // socket.off('connect');
            socket.off(localStorage.getItem('storage_id') + '');
        }

    }, []);
    return (
        <button id='boxita' onClick={openDrawer} type="button" className="mr-4 relative inline-flex text-white items-center p-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <i className="fa-solid fa-envelope text-white"></i>
            <div className={"absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2 dark:border-gray-900 " + (message === '' ? 'hidden' : '')}>{message}</div>
        </button>
    )
}