import LoginForm from "./components/LoginForm";
import {useContext, useEffect} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter";
import './App.css'
import Navbar from "./components/Navbar";

function App() {
    const {store} = useContext(Context)
    useEffect(() => {
        if (localStorage.getItem('access')) {
            store.checkAuth()
        }
    }, [])

    if (store.isLoading) {
        return <div>Загрузка</div>
    }

    // if (!store.isAuth) {
    //     return (
    //         <LoginForm/>
    //     )
    // }

    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default observer(App);
