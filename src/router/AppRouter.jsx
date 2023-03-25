import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {publicRoutes, privateRoutes} from "./routes";
import Error from "../pages/Error";
import {Context} from "../index";

const AppRouter = () => {
    const {store} = useContext(Context)
    return (
        <Routes>
            store.isAuth
            ?
            {privateRoutes.map(route =>
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                />
            )}
            :
            {publicRoutes.map(route =>
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                />
            )}
            <Route path="*" element={<Error/>}/>
        </Routes>
    );
};

export default AppRouter;