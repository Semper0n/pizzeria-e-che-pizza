import AdminPage from './pages/AdminPage'
import Basket from './pages/basket/Basket'
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import MainPage from "./pages/MainPage";
import Auth from "./pages/auth/Auth";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <AdminPage />
    },
    {
        path: BASKET_ROUTE,
        Component: <Basket />
    }
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: <MainPage />
    },
    {
        path: LOGIN_ROUTE,
        Component: <Auth />
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth />
    }
]