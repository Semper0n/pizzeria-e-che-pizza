import React, {useContext, useEffect, useState} from 'react';
import cl from "./CreateProduct.module.css"
import {Context} from "../../../index";
import Input from "../../UI/input/Input";
import ProductButton from "../../UI/productButton/ProductButton";
import {createProduct, fetchProducts, fetchTypes} from "../../../http/productAPI";
import {observer} from "mobx-react-lite";

const CreateProduct = observer(({visible, setVisible}) => {
    const {product} = useContext(Context)

    const [name, setName] = useState('')
    const [composition, setComposition] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data))
        fetchProducts().then(data => product.setProducts(data))

    }, [])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addProduct = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('typeId', product.selectedType)
        formData.append('composition', composition)
        createProduct(formData).then(data => {
            setVisible(false)
            setName("")
            setComposition("")
            setPrice(0)
            setFile(null)
        })
    }


    const rootClasses = ['blur']
    if (visible) {
        rootClasses.push('active')
    }
    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={"menu"} onClick={(e) => e.stopPropagation()}>
                <h2>Добавление продукта</h2>
                <form className={cl.form} action="">
                    <select className={cl.select} defaultValue={'default'} onChange={(e) => {
                        product.setSelectedType(Number(e.target.value))
                    }}>
                        <option disabled="disabled" value='default'>--Выберите тип--</option>
                        {product.types.map(type =>
                            <option
                                key={type.id}
                                value={type.id}
                            >
                                {type.name}
                            </option>

                        )}
                    </select>
                    <Input type="text"
                           placeholder="Введите название продукта..."
                           value={name}
                           onChange={e => setName(e.target.value)}
                    />
                    <Input type="text"
                           placeholder="Введите состав продукта..."
                           value={composition}
                           onChange={e => setComposition(e.target.value)}
                    />
                    <Input type="number"
                           placeholder="Введите стоимость продукта..."
                           value={price}
                           onChange={e => setPrice(Number(e.target.value))}
                    />
                    <Input
                        type="file"
                        onChange={selectFile}
                    />
                    <ProductButton name="Добавить" onClick={addProduct}/>
                </form>
            </div>
        </div>
    );
});

export default CreateProduct;