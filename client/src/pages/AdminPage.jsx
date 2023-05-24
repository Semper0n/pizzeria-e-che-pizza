import React, {useContext, useState} from 'react';
import ProductButton from "../components/UI/productButton/ProductButton";
import CreateType from "../components/modals/createType/CreateType";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import CreateProduct from "../components/modals/createProduct/CreateProduct";

const AdminPage = () => {

    const [typeModal, setTypeModal] = useState(false)
    const [productModal, setProductModal] = useState(false)


    return (
        <section>
            <ProductButton name={"Добавить тип"} onClick={() => setTypeModal(true)}/>
            <div style={{height:"10px"}}></div>
            <ProductButton name={"Добавить продукт"} onClick={() => setProductModal(true)}/>
            <CreateType visible={typeModal} setVisible={setTypeModal}/>
            <CreateProduct visible={productModal} setVisible={setProductModal}/>
        </section>
    );
};

export default AdminPage;