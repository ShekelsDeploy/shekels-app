import { updateRequest } from '../utils/generic';
import { BASE_URL } from '../utils/config';
const CONTROLLER_PATH = "person-data/";

const updateNameLastName = (data: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}update`;
    const body = data;
    return updateRequest(apiURL, body).
        then((response: any) => response);
}
const contactUpdate = (data: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}contactUpdate`;
    const body = data;
    return updateRequest(apiURL, body).
        then((response: any) => response);
}
const addressUpdate = (data: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}addressUpdate`;
    const body = data;
    return updateRequest(apiURL, body).
        then((response: any) => response);
}

export {
    updateNameLastName,
    contactUpdate,
    addressUpdate
}