import React, { useState } from 'react';
import "./menu.css";
import { Link } from 'react-router-dom';

export default function Menu() {
  const [expandMenu, setExpandMenu] = useState(false);
  return (
    <>
      <nav className="main-menu" onMouseLeave={() => setExpandMenu(false)}>
        <div>
          <a className="logo" href="#">
          </a>
        </div>
        <div className="settings" />
        <div className="scrollbar" id="style-1">
          <ul>
            <li>
              <Link to='/'>
                <i className="fa fa-home fa-lg" />
                <span className="nav-text">Home</span>
              </Link>
            </li>
            <li onClick={() => setExpandMenu(!expandMenu)} onMouseEnter={() => setExpandMenu(true)} className='expand-li'>
              <i className="fa fa-solid fa-gears"></i>
              <span className="nav-text">Configs ▼</span>
            </li>
            {!expandMenu ? '' : <li><div className='ml-5'>
              <ul>
                <li>
                  <Link to='/systemConfigs'>
                    <i className="fa fa-solid fa-wallet"></i>
                    <span className="nav-text">Configuración de pago</span>
                  </Link>
                </li>
              </ul>
            </div></li>}
            <li className="darkerlishadow">
              <Link to='/editProfile'>
                <i className="fa fa-user fa-lg" />
                <span className="nav-text">Profile</span>
              </Link>
            </li>
            <li>
              <Link to='/customer'>
                <i className="fa fa-male fa-lg" />
                <span className="nav-text">Customer</span>
              </Link>
            </li>
            <li>
              <Link to='/partner'>
                <i className="fa fa-vcard fa-lg" />
                <span className="nav-text">Partnership</span>
              </Link>
            </li>
            <li className="darkerli">
              <Link to='/preRegister'>
                <i className="fa fa-regular fa-folder-open"></i>
                <span className="nav-text">Registration</span>
              </Link>
            </li>
            <li className="darkerli">
              <Link to='/dashboard'>
                <i className="fa fa-regular fa-sliders"></i>
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li className="darkerli">
              <Link to='/notifications'>
                <i className="fa fa-envelope-o fa-lg"></i>
                <span className="nav-text">Notificaciones</span>
              </Link>
            </li>
          </ul>
          <li>
            <a href="#">
              <i className="fa fa-envelope-o fa-lg" />
              <span className="nav-text">Conctact us</span>
            </a>
          </li>
          <ul className="logout">
            <li>
              <a href="#">
                <i className="fa fa-brands fa-facebook-f fa-lg"></i>
                <span className="nav-text">
                  Facebook
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
