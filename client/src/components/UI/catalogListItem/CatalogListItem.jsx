import React from 'react';
import cl from "./CatalogListItem.module.css"
import ProductButton from "../productButton/ProductButton";

const CatalogListItem = ({title, composition, price, img, id, onClick}) => {

    const handleClick = () => {
        onClick(id)
    }

    return (
        <article className={cl.wrapper}>
            <div className={cl["picture-wrapper"]} onClick={handleClick}>
                <img src={process.env.REACT_APP_API_URL + img} alt={title} className={cl.picture}/>
            </div>
            <div className={cl.content}>
                <p className={cl.title}>{title}</p>
                <p className={cl.composition}>{composition}</p>
                <div className={cl["bottom-wrapper"]}>
                    <ProductButton name="Выбрать" onClick={handleClick}/>
                    <p className={cl.price}>от {price} ₽</p>
                </div>
            </div>
        </article>
    );
};

export default CatalogListItem;