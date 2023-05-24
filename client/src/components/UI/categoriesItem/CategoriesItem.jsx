import React from 'react';
import cl from "./Categoriesitem.module.css"
import AnchorLink from "react-anchor-link-smooth-scroll/lib/anchor-link";

const CategoriesItem = ({title, pic, anchor}) => {
    return (
        <article className={cl.wrapper}>
            <AnchorLink offset='60' href={anchor} className={cl.link} >
                <img src={pic} alt={title} className={cl.picture}/>
                <p className={cl.title}>{title}</p>
            </AnchorLink>
        </article>
    );
};

export default CategoriesItem;