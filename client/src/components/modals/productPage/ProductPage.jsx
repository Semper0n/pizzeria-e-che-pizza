import React, {useEffect, useState} from 'react';
import cl from "./ProductPage.module.css";
import ProductButton from "../../UI/productButton/ProductButton";
import {createType, fetchOneProduct} from "../../../http/productAPI";
import SizeButton from "../../UI/sizeButton/SizeButton";
import {createBasketProduct} from "../../../http/basketAPI";

const ProductPage = ({visible, setVisible, id}) => {
    const [product, setProduct] = useState('')
    const [price, setPrice] = useState(0)
    const [isSelected, setIsSelected] = useState('small')

    useEffect(() => {
            fetchOneProduct(id).then(data => setProduct(data))
            setPrice(product.price)
    }, [product.price, id])


    const rootClasses = ['blur']
    if (visible) {
        rootClasses.push('active')
    }

    const alignPrice = (price) => {
        let left = 9 - (price - Math.floor(price / 10) * 10)
        return left + price
    }

    const addBasketProduct = () => {
        if (product.typeId === 1 || product.typeId === 3) {
            createBasketProduct({productId: product.id, size: isSelected}).then(data => {
                setVisible(false)
            }).catch(e => alert(e.response.data.message))
        } else {
            createBasketProduct({productId: product.id, size: null}).then(data => {
                setVisible(false)
            }).catch(e => alert(e.response.data.message))
        }
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => {
            setVisible(false)
            setIsSelected("small")
        }}>
            <div className={"menu"} onClick={(e) => e.stopPropagation()}>
                <div className={cl.wrapper}>
                    <div className={cl["picture-wrapper"]}>
                        <img className={cl.picture}
                             src={id ? process.env.REACT_APP_API_URL + product.img : ""}
                             alt={product.name}/>
                    </div>
                    <div className={cl.info}>
                        <div className={cl["upper-menu"]}>
                            <div className={cl.title}>{product.name}</div>
                            <div className={cl.composition}>{product.composition}</div>
                            { product.typeId === 1 ?
                                <div className={cl.size}>
                                    <SizeButton
                                        name={"20 см"}
                                        type={"small"}
                                        active={isSelected}
                                        onClick={() => {
                                            setPrice(product.price)
                                            setIsSelected("small")
                                        }}/>
                                    <SizeButton
                                        name={"28 см"}
                                        type={"medium"}
                                        active={isSelected}
                                        onClick={() => {
                                            setPrice(alignPrice(product.price * 1.5))
                                            setIsSelected("medium")
                                        }}/>
                                    <SizeButton
                                        name={"33 см"}
                                        type={"big"}
                                        active={isSelected}
                                        onClick={() => {
                                            setPrice(alignPrice(product.price * 1.8))
                                            setIsSelected("big")
                                        }}/>
                                </div> : ""
                            }
                            { product.typeId === 3 ?
                                <div className={cl.size}>
                                    <SizeButton
                                        name={"6 шт"}
                                        type={"small"}
                                        active={isSelected}
                                        onClick={() => {
                                            setPrice(product.price)
                                            setIsSelected("small")
                                        }}/>
                                    <SizeButton
                                        name={"9 шт"}
                                        type={"medium"}
                                        active={isSelected}
                                        onClick={() => {
                                            setPrice(alignPrice(product.price * 1.5))
                                            setIsSelected("medium")
                                        }}/>
                                    <SizeButton
                                        name={"12 шт"}
                                        type={"big"}
                                        active={isSelected}
                                        onClick={() => {
                                            setPrice(alignPrice(product.price * 1.8))
                                            setIsSelected("big")
                                        }}/>
                                </div> : ""
                            }
                        </div>
                        <div className={cl["bottom-menu"]}>
                            <p className={cl.price}>Итого: {price} Р</p>
                            <ProductButton name="Выбрать" onClick={addBasketProduct}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductPage;