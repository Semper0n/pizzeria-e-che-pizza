import React from 'react';
import cl from "./Footer.module.css"
import {Link} from "react-router-dom";
import VK from "../../../images/vk.png"
import inst from "../../../images/instagram.png"

const Footer = () => {
    return (
        <div className={cl.footer}>
            <div className={cl.wrapper}>
                <div className={cl.block}>
                    <h2 className={cl.title}>E Che Pizza!</h2>
                    <Link className={cl.link} to={""}>
                        <p>О компании</p>
                    </Link>
                    <Link className={cl.link} to={""}>
                        <p>Пользовательское соглашение</p>
                    </Link>
                    <Link className={cl.link} to={""}>
                        <p>Условия гарантии</p>
                    </Link>
                </div>
                <div className={cl.block}>
                    <h2 className={cl.title}>Помощь</h2>
                    <Link className={cl.link} to={""}>
                        <p>Ресторан</p>
                    </Link>
                    <Link className={cl.link} to={""}>
                        <p>Контакты</p>
                    </Link>
                    <Link className={cl.link} to={""}>
                        <p>Поддержка</p>
                    </Link>
                </div>
                <div className={cl.block}>
                    <h2 className={cl.title}>Контакты</h2>
                    <Link className={cl.link} to={"tel:+78005553535"}>
                        <p>+7 (800) 555-35-35</p>
                    </Link>
                    <Link className={cl.link} to={""}>
                        <p>Москва, Кутузовский проспект, 57</p>
                    </Link>

                    <div className={cl["social"]}>
                        <Link className={cl.social__link} to={""}>
                            <img className={cl.social__icon} src={VK} alt="VK"/>
                            <p className={cl.social__text}>VK</p>
                        </Link>
                        <Link className={cl.social__link} to={""}>
                            <img className={cl.social__icon} src={inst} alt="VK"/>
                            <p className={cl.social__text}>Instagram</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Footer;