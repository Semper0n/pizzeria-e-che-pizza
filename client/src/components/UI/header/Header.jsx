import React, {useContext} from 'react';
import cl from "./Header.module.css"
import {Link, useNavigate} from "react-router-dom";
import logo from "../../../images/logo.png"
import avatar from "../../../images/avatar.png"
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {BASKET_ROUTE, LOGIN_ROUTE} from "../../../utils/consts";

const Header = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.token = ""
    }

    return (
        <header className={cl.header}>
            <div className={cl.wrapper}>
                <div className={cl.block}>
                    <div className={cl["logo-full"]}>
                        <Link to="/" className={cl["header-link"]} title={"E Che Pizza!"}>
                            <img className={cl.logo} src={logo} title={"E Che Pizza!"} alt={"logo"}/>
                            <p className={cl["logo-text"]}>E Che Pizza!</p>
                        </Link>
                    </div>
                </div>
                <div className={cl.block}>
                    <p className={cl["work-time"]}>Время работы: с 11:00 до 23:00</p>
                    <div className={cl["sign-in"]}>
                        {user.isAuth ?
                            <button
                                className={cl["basket-button"]}
                                onClick={() => history(BASKET_ROUTE)}>Корзина</button>
                            : ""
                        }
                            {user.isAuth ?
                            <button className={cl["sign-in__button"]} onClick={() => logOut()}>
                                <img className={cl.avatar} src={avatar} alt={"logo"}/>
                                <p className={cl.text}>Выйти</p>
                            </button>
                            :
                            <button className={cl["sign-in__button"]} onClick={() => history(LOGIN_ROUTE)}>
                                <img className={cl.avatar} src={avatar} alt={"logo"}/>
                                <p className={cl.text}>Войти в аккаунт</p>
                            </button>
                        }
                    </div>
                </div>

            </div>
        </header>
    );
});

export default Header;