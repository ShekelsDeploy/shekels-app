import './assets/css/notification.css'
// import { LockClosedIcon } from '@heroicons/react/20/solid'
import './App.css';
import { IndexLayout } from './layout/Index';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAccountData } from 'store/accountSlice';

function App() {

  const dispatch = useDispatch();
  async function getData(){
    dispatch(setAccountData({
      roles: localStorage.getItem('storage_role'),
      logged: Number(localStorage.getItem('storage_logged')),
      username: localStorage.getItem('storage_username'),
      id: localStorage.getItem('storage_id'),
    }));
  }
  useEffect(() => {
    if (localStorage.getItem('storage_id') !== null) {
      getData();
    }
  }, [])
  return (
    <div className="App">
      <IndexLayout></IndexLayout>
    </div>
  );
}

export default App;
