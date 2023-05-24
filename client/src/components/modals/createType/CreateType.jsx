import React, {useState} from 'react';
import cl from "./CreateType.module.css";
import ProductButton from "../../UI/productButton/ProductButton";
import Input from "../../UI/input/Input";
import {createType} from "../../../http/productAPI";

const CreateType = ({visible, setVisible}) => {
    const [value, setValue] = useState('')


    const addType = () => {
        createType({name: value}).then(data => {
            setValue('')
            setVisible(false)
        }).catch(e => alert(e.response.data.message))
    }

    const rootClasses = ['blur']
    if (visible) {
        rootClasses.push('active')
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={"menu"} onClick={(e) => e.stopPropagation()}>
                <h2>Добавление типа</h2>
                <form className={cl.form} action="client/src/components/modals/createType/CreateType">
                    <Input type="text"
                           placeholder="Введите название типа..."
                           className={cl.input}
                           value={value}
                           onChange={e => setValue(e.target.value)}
                    />
                    <ProductButton name="Добавить" onClick={addType}/>
                </form>
            </div>
        </div>
    );
};

export default CreateType;