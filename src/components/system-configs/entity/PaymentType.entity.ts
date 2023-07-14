
export interface IPaymentType {
	id?:string;
	paymentType:PaymentTypeEnum;
	userId?:string | null;
	cardNumber?:string;
	cardExpirationYear?:string;
	cardExpirationMonth?:string;
	user?:{
		id?:string | null;
	}
}

export enum PaymentTypeEnum {
  CASH = 'CASH',
  CARD = 'CARD'
}