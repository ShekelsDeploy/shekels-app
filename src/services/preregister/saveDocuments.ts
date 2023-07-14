import { getAllRequest, postRequest, postRequestFile, updateRequest } from '../utils/generic';
import { BASE_URL } from '../utils/config';
const CONTROlLER_PATH = "personFiles/";
const CATEGORY_PATH = "category/";
const saveDocument = async (data: any) => {
    const apiURL = `${BASE_URL}${CONTROlLER_PATH}upload`;
    const body = data;
    return await postRequestFile(apiURL, body);
}
const saveUpdate = async (data: any) => {
    const apiURL = `${BASE_URL}${CONTROlLER_PATH}update`;
    const body = data;
    return await postRequestFile(apiURL, body);
}

const getDocuments = (id: any) => {
    console.log(id);
    const apiURL = `${BASE_URL}${CONTROlLER_PATH}personFiles?id=${id}`;
    return getAllRequest(apiURL);
}
const getDocumentsFiles = (id: any) => {
    console.log(id);
    const apiURL = `${BASE_URL}${CONTROlLER_PATH}documents?id=${id}`;
    return getAllRequest(apiURL);
}
// id approved
const avatarVerification = async (data: any) => {
    const apiURL = `${BASE_URL}${CONTROlLER_PATH}avatar-verification`;
    const body = data;
    return await updateRequest(apiURL, body);
}
// id approved
const approvedOrRejectFile = async (data: any) => {
    const apiURL = `${BASE_URL}${CONTROlLER_PATH}file-verification`;
    const body = data;
    return await updateRequest(apiURL, body);
}
const saveServiceCategory = (body: any) => {
    const apiURL = `${BASE_URL}${CATEGORY_PATH}save`;
    return postRequest(apiURL, body);
}

export {
    saveDocument,
    getDocuments,
    getDocumentsFiles,
    saveServiceCategory,
    approvedOrRejectFile,
    avatarVerification
}