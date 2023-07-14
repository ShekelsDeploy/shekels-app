import React from "react";
import { createRef, FC, useRef, useState } from "react";
import Select from 'react-select';
import './utils.css';
interface Props {
    id?: string,
    label?: string,
    placeholder?: string,
    register?: any,
    options?: any
    errorMessage?: any

}
export const Combobox: FC<Props> = ({ options, id = "", label = "", placeholder = "", register, errorMessage = '' }) => {
    // Funcion para variar las opciones
    const [listItems, setListItems] = useState(options);

    // Elementos del dom
    const element = register.ref;
    const fatherInput: any = useRef();
    const optionsDom: any = useRef();

    // Funcion que pinta los datos options del combobox
    const listItemsRender = listItems.map((option: any, index: number) =>
        <li key={index} onClick={() => onClickListener(option)}>{option}</li>
    );
    // Filtrado de elementos
    function filterItems() {
        const value = fatherInput.current.children[1].value;
        const newList = options.map((option: any) => {
            if (option.toLowerCase().includes(value.toLowerCase())) {
                return option;
            }
        });
        setListItems(newList);
    }
    // Seleccion de las opciones
    function onClickListener(option: any) {
        const input = fatherInput.current.children[1];
        input.value = option;
        input.focus();
        filterItems();
        // fatherInput.current.children[1];
    }
    function inputClickListener() {
        optionsDom.current.classList.remove('hidden');
    }
    function closeOptions(){
        optionsDom.current.classList.add('hidden');
    }
    return (
        <>
            <div className="text-left" >
                <div ref={fatherInput} onChange={filterItems}>
                    <label htmlFor={id} className="block text-left text-sm font-medium text-gray-700">{label}</label>
                    <input
                        onClick={() => inputClickListener()}
                        onBlur={() => closeOptions()}
                        id={id}
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder={placeholder}
                    />
                    <Select
                    ></Select>
                </div>
                <div ref={optionsDom} className="hidden">
                    <ul className="block">
                        {listItemsRender}
                    </ul>
                </div>
                <span className="error-message-input ">{errorMessage}</span>
            </div>

        </>
    );
}