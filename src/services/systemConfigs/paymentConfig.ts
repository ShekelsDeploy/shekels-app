import { postRequest,putRequest, getOneRequest } from '../utils/generic';
import { BASE_URL } from '../utils/config';
import { IPaymentType } from 'components/system-configs/entity/PaymentType.entity';
const CONTROLLER_PATH = "configs/";

const savePaymentConfig = (body: IPaymentType) => {
    const apiURL = `${BASE_URL}${CONTROLLER_PATH}create`;
    return postRequest(apiURL, body).
        then((response: any) => response);
}

const getPaymentConfig = (userId:string|null) => {
	const apiURL = `${BASE_URL}${CONTROLLER_PATH}payment-config?id=${userId}`;
	return getOneRequest(apiURL).
	then((response:IPaymentType) => response)
}

const updatePaymentConfig = (body: IPaymentType) => {
	const apiURL = `${BASE_URL}${CONTROLLER_PATH}update`;
	return putRequest(apiURL, body).
			then((response: any) => response);
}

export {
	savePaymentConfig,
	getPaymentConfig,
	updatePaymentConfig,
}