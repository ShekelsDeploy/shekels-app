import { getAllRequest, putRequest } from '../utils/generic';
import { BASE_URL } from '../utils/config';
const CONTROLLER_PATH = "service-order/";
// "HAIRCUT","NAILS","HAIRSTYLES","MAKEUP", "EYELASH","BARBER","BARBER_HAIRCUT"
const getOrders = (data: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}os-by-service-type-available?serviceType=${data}`;
    return getAllRequest(apiURL).
        then((response: any) => response);
}
// Lista de OS por customer
const getOsByUser = (data: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}get-os-by-user?userId=${data}`;
    return getAllRequest(apiURL).
        then((response: any) => response);
}
// Lista de OS por Partner
const getOsByPartner = (data: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}get-os-by-partner?userId=${data}`;
    return getAllRequest(apiURL).
        then((response: any) => response);
}
// Una OS por customer
const getOsRequested = (data: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}os-requested?userId=${data.userId}&osId=${data.osId}`;
    return getAllRequest(apiURL).
        then((response: any) => response);
}

// pagar OS por customer
const paidRequested = (body: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}paid`;
    return putRequest(apiURL, body).
        then((response: any) => response);
}

// cancelar OS por customer
const cancelRequested = (body: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}cancel`;
    return putRequest(apiURL, body).
        then((response: any) => response);
}

export {
    getOrders,
    getOsByUser,
    getOsByPartner,
    getOsRequested,
    paidRequested,
    cancelRequested,
}