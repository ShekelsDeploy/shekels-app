import React from "react";
import { createRef, FC, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import Select, { components } from 'react-select';
import { LabelStyle } from "../../assets/class-styles";
import './utils.css';
interface Props {
    id?: string,
    label?: string,
    control?: any,
    register?: any,
    options?: any,
    name?: any,
    errorMessage?: any
    defaultValue?: any
}
export const Combobox: FC<Props> = ({ options, defaultValue, id = "", label = "", control, name, errorMessage = '' }) => {
    const Input = (props: any) => (
        <components.Input
            {...props}
            inputClassName="outline-none border-none shadow-none focus:ring-transparent"
        />
    )
    const customStyles = {
        control: (base:any, state:any) => ({
          ...base,
          background: "rgb(243 244 246)",
          // match with the menu
          borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
          // Overwrittes the different states of border
          borderColor: state.isFocused ? "gray" : "rgb(229 231 235)",
          // Removes weird border around container
          boxShadow: state.isFocused ? null : null,
          "&:hover": {
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "gray" : "gray"
          }
        }),
        menu: (base:any) => ({
          ...base,
          // override border radius to match the box
          borderRadius: 0,
          // kill the gap
          marginTop: 0
        }),
        menuList: (base:any) => ({
          ...base,
          // kill the white space on first and last option
          padding: 0
        })
      };
    return (
        <>
            <div className="text-left" >
                <label htmlFor={id} className={LabelStyle +' mb-1'}>{label}</label>
                <Controller
                    control={control}
                    defaultValue={defaultValue}
                    name={name}
                    render={({ field: { onChange, value, ref } }) => (
                        <Select
                            styles={customStyles}
                            value={options.find((c: any) => c.value === value)}
                            onChange={val => onChange(val.value)}
                            options={options}
                            components={{ Input }}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 2,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#DCDCDC',
                                    primary: 'black',
                                },
                            })}
                        // isMulti
                        />
                    )}
                />
                <span className="error-message-input ">{errorMessage}</span>
            </div>

        </>
    );
}