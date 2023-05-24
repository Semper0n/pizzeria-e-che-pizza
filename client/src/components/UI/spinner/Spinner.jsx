import React from 'react';
import cl from "./Spinner.module.css"

const Spinner = () => {
    return (
        <div className={cl.wrapper}>
            <div className={cl.loader}>
                <div className={cl.textInLoader}>Идёт загрузка...</div>
            </div>
        </div>
    );
};

export default Spinner;