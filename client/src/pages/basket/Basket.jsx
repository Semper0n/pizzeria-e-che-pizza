import React, {useContext, useEffect} from 'react';
import {Context} from "../../index";
import BasketItem from "../../components/UI/basketItem/BasketItem";
import {observer} from "mobx-react-lite";
import {fetchBasketProducts} from "../../http/basketAPI";
import {fetchProducts} from "../../http/productAPI";

const Basket = observer(() => {
    const {product} = useContext(Context)

    product.basketProducts.map(basketItem => {

    })

    useEffect(() => {
        fetchBasketProducts().then(data => product.setBasketProducts(data))
        fetchProducts().then(data => product.setProducts(data))
    }, [])

    return (
        <section>
            <h2>Ваш заказ</h2>
            {product.basketProducts.map(basketItem => {
                let basket
                product.products.map(item => {
                    if (basketItem.productId === item.id) {
                        basketItem = {...basketItem, item}
                        basket = <BasketItem
                            key = {basketItem.id}
                            id = {basketItem.productId}
                            title={basketItem.item.name}
                            price={basketItem.item.price}
                            img={basketItem.item.img}
                            count={basketItem.count}
                            size={basketItem.size}
                        />
                    }
                })
                return basket
            })
            }
        </section>

    );
});

export default Basket;

// return <BasketItem
//     title={basketItem.item.name}
//     price={basketItem.item.price}
//     img={basketItem.item.img}
//     // count={}
//     size={basketItem.size}
// />


