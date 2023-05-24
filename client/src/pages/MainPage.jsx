import React, {useEffect, useState} from 'react';
import Categories from "../components/UI/categories/Categories";
import CatalogList from "../components/UI/catalogList/CatalogList";
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../index";
import {fetchProducts, fetchTypes} from "../http/productAPI";
import ProductPage from "../components/modals/productPage/ProductPage";

const MainPage = observer(() => {
    const {product} = useContext(Context)
    const [modalPage, setModalPage] = useState(false)

    const handleIdChange = (newId) => {
        setModalPage(true)
        product.setSelectedProductId(newId)
    }


    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data))
        fetchProducts().then(data => product.setProducts(data))

    }, [])

    return (
        <section>
            <Categories />
            {product.types.map(type =>
                <CatalogList
                    key={type.id}
                    title={type.name}
                    anchor={type.id}
                    typeID={type.id}
                    onClick={handleIdChange}
                />
            )}
            <ProductPage visible={modalPage} setVisible={setModalPage} id={product.selectedProductId}/>
        </section>
    );
});

export default MainPage;