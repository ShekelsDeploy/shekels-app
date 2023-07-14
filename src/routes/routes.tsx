import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SandBox from '../components/sandbox';
import Customer from '../pages/customer';
import Dashboard from '../pages/dashboard';
import EditProfile from '../pages/edit-profile';
import Home from '../pages/home';
import Login from '../pages/login';
import { PreRegister } from '../pages/pre-register';
import Registration from '../pages/registration/registration';
import Signup from '../pages/signup';
import { UserAlbum } from '../pages/user-album';
import { RequireAuth } from './requireAuth';
import ListUsersAdmin from '../pages/list-users';
import UserDetail from 'pages/user-detail';
import SignupWithUs from 'pages/signup/signupWithUs';
import AboutPage from 'pages/about';
import ValidateAccount from 'pages/validateAccount';
import PartnerPage from 'pages/partner';
import PrivacyPolity from 'pages/privacy';
import TermsConditions from 'pages/terms';
import NotificationsPage from 'components/notifications/notificationsPage';
import SystemConfigsPage from 'pages/system-configs';

export default function RoutesComponent() {
    return (
        <>
            <Routes>
                {/* public routes */}
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/sigWithUs' element={<SignupWithUs />}></Route>
                <Route path="/sandbox" element={<SandBox />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/confirm-account" element={<ValidateAccount />} />
                <Route path="/partner" element={<PartnerPage />} />
                <Route path="/terms" element={<TermsConditions />} />
                <Route path="/privacy" element={<PrivacyPolity />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/systemConfigs" element={<SystemConfigsPage />} />

                {/* Para el rol de admin */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/listusers" element={<ListUsersAdmin />} />

                <Route path='/customer' element={<Customer />} />
                <Route path='/preRegister' element={<PreRegister />} />
                <Route path='/userDetail' element={<UserDetail />} />
                <Route path='/editProfile' element={<EditProfile />} />
                {/* Roles de user */}
                <Route element={<RequireAuth allowedRoles={['CUSTOMER']} />}>

                </Route>

                <Route element={<RequireAuth allowedRoles={['PARTNER']} />}>
                    
                    <Route path='/userAlbum' element={<UserAlbum />} />
                </Route>


                <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
                    <Route path="admin" element={<Registration />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={['CUSTOMER', 'PARTNER']} />}>
                    
                </Route>

                {/* catch all */}
                <Route path="*" element={<Home />} />
            </Routes>
        </>
    );
}
