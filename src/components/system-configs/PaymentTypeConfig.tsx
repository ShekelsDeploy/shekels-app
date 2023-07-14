import React, { useState, useEffect } from 'react';
import { ButtonStylePrimary } from 'assets/class-styles';
import { IPaymentType } from './entity/PaymentType.entity';
import { PaymentTypeEnum } from './entity/PaymentType.entity';
import { getPaymentConfig, savePaymentConfig, updatePaymentConfig } from 'services/systemConfigs/paymentConfig';
import { NotificationManager } from 'react-notifications';

export default function PaymentTypeConfigComponent() {

	const paymentTypeValues = [
		{ value: 'CASH', label: 'EFECTIVO' },
		{ value: 'CARD', label: 'TARJETA' }
	];

	const paymentTypeInit: IPaymentType = {
		id: undefined,
		paymentType: PaymentTypeEnum.CASH,
		userId: localStorage.getItem('storage_id'),
		cardNumber: undefined,
		cardExpirationYear: undefined,
		cardExpirationMonth: undefined,
		user: {
			id: localStorage.getItem('storage_id')
		}
	}
	const [paymentTypeState, setPaymenTypeState] = useState(paymentTypeInit);
	const [loadingState, setLoadingState] = useState(true);
	useEffect(() => {
		const data = {
			id: localStorage.getItem('storage_id')
		}
		getPaymentConfig(localStorage.getItem('storage_id')).then((res) => {
			console.log(res);
			setPaymenTypeState(res);
			setLoadingState(false);
		}).catch(() => { 
			setPaymenTypeState(paymentTypeInit);
			setLoadingState(false);
		});
	}, []);

	const onChangeValue = (ev: any) => {
		const target = ev.target;
		paymentTypeState[target.id as keyof typeof paymentTypeState] = target.value;
		setPaymenTypeState({ ...paymentTypeState });
		console.log(paymentTypeState);
	}

	const onSaveData = () => {
		setLoadingState(true);
		savePaymentConfig(paymentTypeState).then(
			(response: any) => {
				console.log(response);
				setLoadingState(true);
				NotificationManager.success('Configuración creada con exito', 'Success');
			}
		).catch((error)=> {
			console.log(error);
			setLoadingState(false);
			NotificationManager.error('Error al guardar la configuracion', 'Error');
		})
	}

	const onEditData = () => {
		setLoadingState(true);
		updatePaymentConfig(paymentTypeState)
		.then((response) => {
			console.log(response);
			setLoadingState(false);
			if(response.response.status == "UPDATED"){
				NotificationManager.success('Configuración actualizada', 'Success');
			}else{
				NotificationManager.error('Error al actualizar la configuracion', 'Error');
			}
			
		})
		.catch((error)=>{
			setLoadingState(false);
			NotificationManager.error('Error al actualizar la configuracion', 'Error')
		});
	}

	return (
		<>{
			loadingState
				?
				(
					<div className="text-center mt-20">
						<div role="status">
							<svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
								<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
							</svg>
							<span className="sr-only">Loading...</span>
						</div>
					</div>
				)
				:
				(
					<div className="relative w-1/2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
						<section className="flex flex-col xl:px-20 py-3 px-2">
							<div className="mb-3 w-mid  ml-5 mr-5">
								<div className="mb-6">
									<label htmlFor='paymentType' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de pago</label>
									<select id="paymentType" onChange={onChangeValue} value={paymentTypeState.paymentType} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
										{
											paymentTypeValues?.map((pay: any) => {
												return (<option key={pay.value} value={pay.value}>{pay.label}</option>)
											})
										}
									</select>
								</div>
								{
									paymentTypeState.paymentType === PaymentTypeEnum.CARD ?
										(<>
											<div className="mb-6">
												<label htmlFor="ownerName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del titular</label>
												<input type="text" id="ownerName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
											</div>
											<div className="mb-6">
												<label htmlFor="cardNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número de tarjeta</label>
												<input type="text" id="cardNumber" value={paymentTypeState.cardNumber} onChange={onChangeValue} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1111-1111-1111-1111" required />
											</div>
											<div className="grid gap-6 mb-6 md:grid-cols-2">
												<div>
													<label htmlFor='cardExpirationMonth' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mes</label>
													<input type="text" id="cardExpirationMonth" value={paymentTypeState.cardExpirationMonth} onChange={onChangeValue} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="01" required />
												</div>
												<div>
													<label htmlFor="cardExpirationYear" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Año</label>
													<input type="text" id="cardExpirationYear" value={paymentTypeState.cardExpirationYear} onChange={onChangeValue} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="23" required />
												</div>
											</div>
										</>)
										:
										<div></div>
								}
								<div className='step-footer md:block hidden'>
									<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
										{
											paymentTypeState.id
												?
												(
													<button onClick={onEditData} type="submit" className={ButtonStylePrimary}>
														Editar
													</button>
												)
												:
												(
													<button onClick={onSaveData} type="submit" className={ButtonStylePrimary}>
														Guardar
													</button>
												)
										}

									</div>
								</div>
							</div>
						</section>
					</div>
				)
		}
		</>
	)
}