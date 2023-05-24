import React, {useContext, useState} from 'react';
import cl from "./CatalogList.module.css"
import "./CatalogList.module.css"
import CatalogListItem from "../catalogListItem/CatalogListItem";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const CatalogList = observer(({typeID, title, anchor, onClick}) => {
    const {product} = useContext(Context)


    return (
        <div className={cl.wrapper} id={anchor}>
            <h2 className={cl.title}>{title}</h2>
            <div className={cl["items-list"]}>
                {product.products
                    .map(product => {
                        if (product.typeId === typeID) {
                            return <CatalogListItem
                                key={product.id}
                                title={product.name}
                                composition={product.composition}
                                price={product.price}
                                id={product.id}
                                img={product.img}
                                onClick={onClick}

                            />
                        }
                        return null
                    }

                )}
            </div>

        </div>
    );
});

export default CatalogList;