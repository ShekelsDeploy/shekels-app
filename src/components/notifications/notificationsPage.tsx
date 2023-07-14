import { useEffect, useState } from "react";
import { getNotifications } from "services/notification/notification";

export default function NotificationsPage() {
    
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        const data = {
            id: localStorage.getItem('storage_id')
        }
        getNotifications(data).then((res) => {
            console.log(res);
            setNotifications(res.items)
        });
    }, []);
    function renderNotifications() {
        return notifications?.map((i: any) => {
            return (
                <div key={i.id} className="border-b-2 py-2">
                    <div>
                        <h1 className="font-bold">{i.from} <span className="font-normal">{i.notificationText}</span></h1>
                        <h4 className="font-bold text-blue-500 text-xs text-right">{i.createdAt}</h4>
                    </div>
                </div>

            );
        });
    }
    return (
        <>
            <div className="mt-28 mx-10">
                <h1 className="font-bold pb-5 border-b-2 text-xl">Notificaciones</h1>
                {renderNotifications()}
            </div>
        </>
    );
}