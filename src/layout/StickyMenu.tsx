import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginRegister from "../pages/home/page/float-buttons";
import logo1 from './../assets/images/logo1.png';
import { logout } from 'services/auth/auth'
import NotificationButton from "components/notifications";
import AvatarNotification from "components/notifications/avatar";
export default function StickyMenu() {
    const navigate = useNavigate();
    const accountData: any = useSelector((state: any) => state.accountData.value);
    function logoutFunction() {
        navigate('/');
        logout();
        window.location.replace('');
    }
    return (
        <nav className="bg-primary px-2 fixed w-full z-20 top-0 left-0">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <Link to='/'>
                    <img src={logo1} className="h-16 mr-3" alt="Flowbite Logo" />
                </Link>
                <div className="flex md:order-2">
                    <div className={accountData?.logged === 0 ? '' : 'hidden'}>
                        <div className="hidden lg:block">
                            <LoginRegister></LoginRegister>
                        </div>
                    </div>
                    <div className={accountData?.logged === 1 ? '' : 'hidden'}>
                        <div className="flex items-center">
                            <NotificationButton></NotificationButton>
                            <AvatarNotification></AvatarNotification>
                            <h1 className='text-white pl-4'>
                                <span className='text-white'>
                                    {accountData?.username}
                                </span>
                                <span className="px-6 text-white hover:text-gray-200 hover:cursor-pointer" onClick={logoutFunction}>
                                    <i className="text-white fa-solid fa-right-from-bracket"></i>
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                </div>
            </div>
        </nav>
    );
}