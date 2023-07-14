import { getAllRequest, postRequest, postRequestFile, updateRequest } from '../utils/generic';
import { BASE_URL } from '../utils/config';
const CONTROLLER_PATH = "auth/";

const login = (user: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}signin`;
    const body = user;
    return postRequest(apiURL, body).
        then((response: any) => response);
}
const signup = (user: any) => {
    console.log(user);
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}signup`;
    const body = user;
    return postRequestFile(apiURL, body).
        then((response: any) => response);
}
const confirmAccount = (param: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}confirm-account?id=${param}`;
    return getAllRequest(apiURL).
        then((response: any) => response);
}
const resetEmailSend = (param: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}reset-validate-account-token?email=${param}`;
    return getAllRequest(apiURL).
        then((response: any) => response);
}
const logout = () => {
    localStorage.removeItem("storage_role");
    localStorage.removeItem("storage_logged");
    localStorage.removeItem("storage_username");
    localStorage.removeItem("storage_id");
    localStorage.removeItem("storage_avatar");
}
const passwordUpdate = (data: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}passwordUpdate`;
    const body = data;
    return updateRequest(apiURL, body).
        then((response: any) => response);
}
export {
    login,
    signup,
    logout,
    confirmAccount,
    resetEmailSend,
    passwordUpdate
}