import React from 'react';

const ThemeTab = ({theme}) => {
    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            <div className="flex flex-1 w-full justify-center items-center text-center shadow-purple-100 shadow-md rounded-xl">
                <h2 className="text-2xl w-full pb-2 ">{theme.title}</h2>
            </div>
            <div className="flex flex-1 w-full justify-center items-center">
                <h3 className="text-sm w-full text-justify m-4">
                    {theme.description}
                </h3>
            </div>
        </div>
    );
};

export default ThemeTab;