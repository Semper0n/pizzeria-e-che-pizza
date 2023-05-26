import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import Header from "./components/UI/header/Header";
import AppRouter from "./components/AppRouter";
import Footer from "./components/UI/footer/Footer";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";
import Spinner from "./components/UI/spinner/Spinner";


const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    if (localStorage.token) {
        try {
            useEffect(() => {
                check().then(data => {
                    user.setUser(true)
                    user.setIsAuth(true)
                }).finally(() => setLoading(false))
            }, [localStorage.token])
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    if(localStorage.token && loading) {
        return <Spinner />
    }

  return (
    <BrowserRouter>
        <Header />
        <div className="page">
            <AppRouter />
        </div>
        <Footer />
    </BrowserRouter>
  );
})

export default App;
