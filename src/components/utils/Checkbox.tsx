import React from "react";

interface Props {
  isChecked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Checkbox = (props: Props) => {
  return (
    <div>
      <label htmlFor={props.label}>{props.label}</label>
      <input
        type="checkbox"
        id={props.label}
        checked={props.isChecked}
        onChange={props.handleChange}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
    </div>
  );
};
export default Checkbox;