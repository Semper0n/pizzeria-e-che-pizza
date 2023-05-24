import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import MainPage from "../pages/MainPage";
import {Context} from "../index";


const AppRouter = () => {
    const {user} = useContext(Context)

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route path={path} element={Component} key={path} exact/>
            )}
            {!user.isAuth && publicRoutes.map(({path, Component}) =>
                <Route path={path} element={Component} key={path} exact/>
            )}
            <Route path="*" element={<MainPage />} />
        </Routes>
    );
};

export default AppRouter;