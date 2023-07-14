import { useNavigate } from "react-router-dom";
import DashboardCard from "./dashboardCard";
import DonnutGraf from "./DonnutGraf";
import BarGraf from "./BarGraf";

export default function DashboardContainer() {
    // useNavigate()
    const navigate = useNavigate();
    function validarUsuarios() {
        navigate('/listusers')
    }
    return (
        <>
            <div className="rounded-lg bg-gray-100 p-3 grid grid-cols-2 gap-3">
                <DashboardCard title='Grafico 1'>
                    <div>
                        <DonnutGraf></DonnutGraf>
                    </div>
                </DashboardCard>
                <DashboardCard title='Grafico 2'>
                    <div>
                        <BarGraf></BarGraf>
                    </div>
                </DashboardCard>
                <DashboardCard title='Validar usuarios'>
                    <div onClick={validarUsuarios} className='p-4 grid grid-cols-2 gap-3 place-content-center h-72'>
                        <div className="text-center rounded-lg bg-purple-500 py-10">
                            <span className="text-5xl text-white">CLIENTES</span>
                        </div>
                        <div className="text-center rounded-lg bg-purple-500 py-10">
                            <span className="text-5xl text-white">SOCIOS  </span>
                        </div>
                    </div>
                </DashboardCard>
                <DashboardCard title='Notificaciones'></DashboardCard>
            </div>
        </>
    )
}