import { useEffect, useState } from "react";
import AddressEdit from "./addressEdit";
import ContactEdit from "./contactEdit";
import PasswordEdit from "./passwordEdit";
import UserEdit from "./userEdit";
import { profileData } from "services/users/users";

function EditContainer() {
    const [menu, setMenu] = useState(1);
    const [personData, setPersonData] = useState({ name: '', lastName: '', file: '', approvedStatus: 'APPROVED' });
    const [userData, setUserData] = useState({ username: '' });
    const [addressData, setAddressData] = useState({ country: 'mx', state: 'son', city: 'obson', street: '', postalCode: '' });
    const [contactData, setContactData] = useState({ email: '', phone: '' });
    useEffect(() => {
        if (localStorage.getItem('storage_id') !== null) {
            getData();
        }
    }, [])
    async function getData() {
        const data = await profileData(localStorage.getItem('storage_id'));
        setPersonData({ name: data.person.name, lastName: data.person.lastName, file: data.avatar, approvedStatus:data.approvedStatus });
        setUserData({ username: data.username });
        console.log(data);

        setAddressData({ country: data.person.address.country, state: data.person.address.state, city: data.person.address.city, street: data.person.address.street, postalCode: data.person.address.postalCode });
        setContactData({ email: data.person.contactInfo.email, phone: data.person.contactInfo.phone })
    }
    function renderSwitch() {
        switch (menu) {
            case 1:
                return (
                    <>
                        <UserEdit data={personData}></UserEdit>
                    </>
                );
            case 2:
                return (
                    <>
                        <ContactEdit data={contactData}></ContactEdit>
                    </>
                );
            case 3:
                return (
                    <>
                        <AddressEdit data={addressData}></AddressEdit>
                    </>
                );
            case 4:
                return (
                    <>
                        <PasswordEdit data={userData}></PasswordEdit>
                    </>
                );
        }
    };
    return (
        <>
            <div className="flex pt-6 justify-center">
                <div className="bg-gray-200 rounded-lg flex lg:flex-row flex-col lg:w-5/6">
                    <div className="lg:basis-1/4">
                        <div className="h-full px-10 py-10">
                            <ul className="space-y-2 lg:block grid grid-cols-2">
                                <li className="">
                                    <div onClick={() => setMenu(1)} className="flex cursor-pointer items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <i className="fa-solid fa-user"></i>
                                        <span className={"ml-3 font-semibold " + (menu === 1 ? 'font-bold text-blue-600' : '')}>Usuario</span>
                                    </div>
                                </li>
                                <li>
                                    <div onClick={() => setMenu(2)} className="flex cursor-pointer items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <i className="fa-solid fa-phone"></i>
                                        <span className={"ml-3 font-semibold " + (menu === 2 ? 'font-bold text-blue-600' : '')}>Contacto</span>
                                    </div>
                                </li>
                                <li>
                                    <div onClick={() => setMenu(3)} className="flex cursor-pointer items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <i className="fa-solid fa-map-location-dot"></i>
                                        <span className={"ml-3 font-semibold " + (menu === 3 ? 'font-bold text-blue-600' : '')}>Direccion</span>
                                    </div>
                                </li>
                                <li>
                                    <div onClick={() => setMenu(4)} className="flex cursor-pointer items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <i className="fa-solid fa-key"></i>
                                        <span className={"ml-3 font-semibold " + (menu === 4 ? 'font-bold text-blue-600' : '')}>Contraseña</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="basis-3/4 p-4">
                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                            <div className="bg-white p-10">
                                {renderSwitch()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default EditContainer;
