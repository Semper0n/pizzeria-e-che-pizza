import React, {useContext} from 'react';
import cl from "./Categories.module.css"
import CategoriesItem from "../categoriesItem/CategoriesItem";
import pizzas from "../../../images/pizza.png"
import drinks from "../../../images/soda.png"
import snacks from "../../../images/french-fries.png"
import desserts from "../../../images/cupcake.png"
import sauces from "../../../images/soy-sauce.png"
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const Categories = observer(() => {
    const {product} = useContext(Context)
    const arr = [pizzas, drinks, snacks, desserts, sauces]


    return (
        <div className={cl.wrapper}>
            {product.types.map(type =>
                <CategoriesItem key={type.id} title={type.name} pic={arr[type.id - 1]} anchor={`#${type.id}`}/>
            )}
        </div>
    );
});

export default Categories;