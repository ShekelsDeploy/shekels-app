import { FC } from "react";
import { stringPury } from "../../services/validation/validation";
import './utils.css';
import { InputStyle, LabelStyle } from "../../assets/class-styles";
interface Props {
    id?: string,
    label?: string,
    placeholder?: string,
    type?: string,
    register?: any,
    errorMessage?: any
}
export const TextInput: FC<Props> = ({ id = "", label = "", placeholder = "", type = "text", register, errorMessage = '' }) => {
    function onblurHandler(e: any) {
        e.target.value = stringPury(e.target.value);
    }
    return (
        <>
            <div className="text-left" onBlur={(e) => onblurHandler(e)}>
                <label htmlFor={id} className={LabelStyle}>{label}</label>
                <input
                    id={id}
                    type={type}
                    className={InputStyle}
                    placeholder={placeholder}  
                    {...register}
                />
                <span className="error-message-input ">{errorMessage}</span>
            </div>

        </>
    );
}