import React from 'react';
import cl from "./Header.module.css"
import {Link} from "react-router-dom";
import logo from "../../images/logo.png"
import avatar from "../../images/avatar.png"

const Header = () => {
    return (
        <header className={cl.header}>
            <div className={cl.wrapper}>
                <div className={cl.block}>
                    <div className={cl["logo-full"]}>
                        <Link to="/main" className={cl["header-link"]} title={"E Che Pizza!"}>
                            <img className={cl.logo} src={logo} title={"E Che Pizza!"} alt={"logo"}/>
                            <p className={cl["logo-text"]}>E Che Pizza!</p>
                        </Link>
                    </div>
                    <p className={cl.text}>Среднее время доставки: <b>00:24:19</b></p>
                </div>
                <div className={cl.block}>
                    <p className={cl.text}>Время работы: с 11:00 до 23:00</p>
                    <div className={cl["sign-in"]}>
                        <Link to="/main" className={cl["header-link"]} title={"Войти в аккаунт"}>
                            <img className={cl.avatar} src={avatar} title={"Войти в аккаунт"} alt={"logo"}/>
                            <p className={cl["header-text"]}>Войти в аккаунт</p>
                        </Link>
                    </div>
                </div>


            </div>
        </header>
    );
};

export default Header;