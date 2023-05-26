import React, {useContext, useEffect, useState} from 'react';
import cl from "./BasketItem.module.css"
import {createBasketProduct, removeBasketProduct} from "../../../http/basketAPI";
import {Context} from "../../../index";

const BasketItem = ({title, price, img, count, size, id}) => {
    const {product} = useContext(Context)

    const initialPrice = (size === "medium" ? price * 1.5 + (9 - (price * 1.5 - Math.floor(price * 1.5 / 10) * 10))
        : size === "big" ? price * 1.8 + (9 - (price * 1.8 - Math.floor(price * 1.8 / 10) * 10))
            : price + (9 - (price - Math.floor(price / 10) * 10))) * count

    const [productPrice, setProductPrice] = useState(initialPrice)

    const [productCount, setProductCount] = useState(count)

    const alignPrice = (price, count) => {
        if (size === "medium") {
            price *= 1.5
        } else if (size === "big") {
            price *= 1.8
        }
        let left = 9 - (price - Math.floor(price / 10) * 10)
        return (left + price) * count
    }

    const removeProduct = () => {
        removeBasketProduct({productId: id, size})
            .then(data => {
                setProductCount(data.count)
                setProductPrice(alignPrice(price, data.count))
                product.reduceTotalPrice(alignPrice(price, 1))
            })
            .catch(e => alert(e.response.data.message))
    }

    const addProduct = () => {
        createBasketProduct({productId: id, size})
            .then(data => {
                setProductCount(data.count)
                setProductPrice(alignPrice(price, data.count))
                product.addTotalPrice(alignPrice(price, 1))
            })
        .catch(e => alert(e.response.data.message))
    }

    useEffect(() => {
        product.addTotalPrice(productPrice)
    }, [])

    return (
        <article className={cl.wrapper}>
            <div className={cl.left}>
                <div className={cl["picture-wrapper"]}>
                    <img className={cl.picture}
                         src={process.env.REACT_APP_API_URL + img}
                         alt={title}/>
                </div>
                <div className={cl.info}>
                    <p className={cl.title}>{title}</p>
                    <p className={cl.size}>
                        {
                        size === "small" ? "Маленькая, 20 см" :
                            size === "medium" ? "Средняя, 28 см" :
                                size === "big" ? "Большая, 33 см" : ""
                    }</p>
                </div>
            </div>
            <div className={cl.right}>
                <div className={cl.counter}>
                    <button className={cl.button} onClick={removeProduct}>-</button>
                    <p className={cl.count}>{productCount}</p>
                    <button className={cl.button} onClick={addProduct}>+</button>
                </div>
                <div className={cl.price}>{productPrice} ₽</div>
            </div>
        </article>
    );
};

export default BasketItem;