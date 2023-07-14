import { getAllRequest, postRequest, postRequestFile, putRequest } from '../utils/generic';
import { BASE_URL } from '../utils/config';
const CONTROLLER_PATH = "notification/";

const add = (data: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}add`;
    const body = data;
    return postRequest(apiURL, body).
        then((response: any) => response);
}
// id userId
const seeNotification =  (data: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}update`;
    const body = data;
    return putRequest(apiURL, body).
        then((response: any) => response);
}
const getNotifications = (data: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}all-paginated-not-read?id=${data.id}`;
    return getAllRequest(apiURL).
        then((response: any) => response);
}
const getCountNotifications = (data: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}count?id=${data}`;
    return getAllRequest(apiURL).
        then((response: any) => response);
}

export {
    add,
    getNotifications,
    getCountNotifications,
    seeNotification
}