import React, {useState} from 'react';
import cl from "./BasketItem.module.css"
import {createBasketProduct, removeBasketProduct} from "../../../http/basketAPI";

const BasketItem = ({title, price, img, count, size, id}) => {
    const [productPrice, setProductPrice] = useState(price * count)
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
            })
            .catch(e => alert(e.response.data.message))
    }

    const addProduct = () => {
        createBasketProduct({productId: id, size})
            .then(data => {
                setProductCount(data.count)
                setProductPrice(alignPrice(price, data.count))
            })
        .catch(e => alert(e.response.data.message))
    }

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
                <div className={cl.price}>{productPrice} Р</div>
            </div>
        </article>
    );
};

export default BasketItem;