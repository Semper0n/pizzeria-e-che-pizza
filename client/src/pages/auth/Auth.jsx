import React, {useState} from 'react';
import cl from "./Auth.module.css"
import ProductButton from "../../components/UI/productButton/ProductButton";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {login, registration} from "../../http/userAPI";
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../../index";
import Input from "../../components/UI/input/Input";


const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)
            }else {
                data = await registration(email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            history(MAIN_ROUTE)
        }catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <section className={cl.wrapper}>
            <h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
            <form className={cl.form} action="">
                <Input type="email"
                       placeholder="Введите ваш email:"
                       value={email}
                       onChange={e => setEmail(e.target.value)} />
                <Input
                    type={'password'}
                    placeholder={'Введите ваш пароль:'}
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
                <ProductButton name={isLogin ? "Войти" : "Зарегистрироваться"} onClick={click}/>
            </form>
            {isLogin ?
                <p>Нет аккаунта? <Link to={REGISTRATION_ROUTE} className={cl.register}>Зарегистрироваться</Link></p>
                :
                <p>Уже есть аккаунт? <Link to={LOGIN_ROUTE} className={cl.register}>Войти в аккаунт</Link></p>

            }
        </section>
    );
});

export default Auth;