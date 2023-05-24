import React from 'react';
import cl from "./SizeButton.module.css"

const SizeButton = ({name, onClick, type, active}) => {

    let rootClasses = cl.wrapper
    if (type === active) {
        rootClasses += ` ${cl.active}`
    }

    return (
        <button className={rootClasses} onClick={onClick}>
            <h6 className={cl.name}>{name}</h6>
        </button>
    );
};

export default SizeButton;