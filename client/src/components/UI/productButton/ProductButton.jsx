import React from 'react';
import cl from "./ProductButton.module.css"

const ProductButton = ({name, onClick}) => {
    return (
        <button type="button" className={cl.wrapper} onClick={onClick}>
            <p className={cl.name}>{name}</p>
        </button>
    );
};

export default ProductButton;