import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotifications, seeNotification } from "services/notification/notification";
import SocketNotification from "./socketNotification";

export default function NotificationButton() {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    function openDrawer() {
        setOpen(true);
        const data = {
            id: localStorage.getItem('storage_id')
        }
        getNotifications(data).then((res) => {
            console.log(res);
            setNotifications(res.items)
        });
    }
    function closeDrawer() {
        setOpen(false)

    }
    function deleteNotification(id: any) {
        setOpen(false);
        seeNotification({ id, userId: localStorage.getItem('storage_id') })
    }
    function renderNotifications() {
        return notifications?.map((i: any) => {
            return (
                <div key={i.id} onClick={() => deleteNotification(i.id)} className="border-b-2 py-2">
                    <div>
                        <h1 className="font-bold">{i.from} <span className="font-normal">{i.notificationText}</span></h1>
                        <h4 className="font-bold text-blue-500 text-xs text-right">{i.createdAt}</h4>
                    </div>
                </div>

            );
        });
    }
    const navigate = useNavigate();
    function navigatePage() {
        navigate('/notifications')
        setOpen(false)
    }
    return (
        <>

            <SocketNotification openDrawer={openDrawer}></SocketNotification>
            <div className={"fixed border-l-4 top-0 z-40 transition-transform translate-x-full duration-2000 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800 " + (open ? 'right-80' : 'right-0')} tabIndex={-1} aria-labelledby="drawer-right-label">
                <div>
                    <div className="text-right">
                        <button className="font-bold" onClick={closeDrawer}>X</button>
                    </div>
                    <h4 onClick={navigatePage} className="font-semibold text-sm text-right pt-3 text-blue-700 underline hover:cursor-pointer">Ver todos</h4>
                    <h1 className="font-bold pb-5 border-b-2 text-xl">Notifications</h1>

                    {renderNotifications()}
                </div>

            </div>
        </>
    );
}