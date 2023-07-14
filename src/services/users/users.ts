import { getAllRequest, postRequestFile, putRequest, updateRequest } from '../utils/generic';
import { BASE_URL } from '../utils/config';
const CONTROLLER_PATH = "users/";

const listUsers = (params: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}all?limit=${params.limit}&page=${params.page}&verified=${params.verified}&role=${params.role}`;
    return getAllRequest(apiURL).
        then((response: any) => response);
}
const profileData = (param: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}profileData?id=${param}`;
    return getAllRequest(apiURL).
        then((response: any) => response);
}
const updateAvatar = async (data: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}upload`;
    const body = data;
    return await postRequestFile(apiURL, body);
}
// id status
const changeStatusUser = async (data: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}user-process-status`;
    const body = data;
    return await putRequest(apiURL, body);
}
const updateUserInfo = async (data: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}upload`;
    const body = data;
    return await updateRequest(apiURL, body);
}
const availability = (param: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}availability?id=${param}`;
    return getAllRequest(apiURL).
        then((response: any) => response);
}
// "AVAILABLE","BUSY","OFFLINE"
// id, availability
const updateAvailability = async (data: any) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}update-availability`;
    const body = data;
    return await putRequest(apiURL, body);
}
export {
    listUsers,
    profileData,
    updateAvatar,
    updateUserInfo,
    availability,
    updateAvailability,
    changeStatusUser
}