import errorCatch from "./errorCatch";

const axios = require('axios');

const getOneRequest = (url: RequestInfo | URL) => {
    return fetch(url).
        then(res => res.json());
}

const getAllRequestWithParams = (url: RequestInfo | URL, body: any) => {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).
        then(res => res.json());
}

const getAllRequest = (url: RequestInfo | URL) => {
    return fetch(url).
        then(res => res.json());
}

const postRequest = (url: RequestInfo | URL, body: any) => {
    return fetch(url,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).
        then(async res => {
            return errorCatch(await res.json(), false);
        }).catch((e) => {
            return errorCatch(e, true);
        });
}
const updateRequest = (url: RequestInfo | URL, body: any) => {
    return fetch(url,
        {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).
        then(async res => {
            return errorCatch(await res.json(), false);
        }).catch((e) => {
            return errorCatch(e, true);
        });
}
const putRequest = (url: RequestInfo | URL, body: any) => {
    return fetch(url,
        {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).
        then(async res => {
            return errorCatch(await res.json(), false);
        }).catch((e) => {
            return errorCatch(e, true);
        });
}

const deleteRequest = () => {

}

const postRequestFile = async (url: RequestInfo | URL, body: any) => {
    try {
        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                },
                body
            });
        return errorCatch(await response.json(), false);
    } catch (error) {
        return errorCatch(error, true);
    }
}

export {
    getOneRequest,
    getAllRequest,
    getAllRequestWithParams,
    postRequest,
    putRequest,
    updateRequest,
    deleteRequest,
    postRequestFile
}