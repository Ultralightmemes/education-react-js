import React from 'react';
import {Route, Routes} from "react-router-dom";
import {publicRoutes} from "./routes";
import Error from "../pages/Error";

const AppRouter = () => {
    return (
        <Routes>
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