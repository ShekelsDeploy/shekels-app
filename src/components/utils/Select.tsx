import { FC } from "react";
import './utils.css'
interface Props {
    id?: string,
    label?: string,
    placeholder?: string,
    register?: any,
    options?: any
    errorMessage?: any

}
export const SelectInput: FC<Props> = ({ options, id = "", label = "", placeholder = "", register, errorMessage = '' }) => {
    const listItems = options.map((option: any) =>
        <option key={option.value} value={option.value}>{option.label}</option>
    );
    return (
        <>
            <div className="text-left" >
                <label htmlFor={id} className="block text-left text-sm font-medium text-gray-700">{label}</label>
                <select
                    id={id}
                    {...register}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                    {listItems}
                </select>
                <span className="error-message-input ">{errorMessage}</span>
            </div>

        </>
    );
}