import React from 'react';
import cl from "./Input.module.css";

const Input = ({type, placeholder, value, onChange}) => {
    return (
        <input type={type}
               placeholder={placeholder}
               className={cl.input}
               value={value}
               onChange={onChange} />
    );
};

export default Input;