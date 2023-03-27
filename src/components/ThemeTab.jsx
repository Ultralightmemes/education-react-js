import React from 'react';

const ThemeTab = ({theme}) => {
    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            <div className="flex flex-1 w-full justify-center items-center text-center">
                <h2 className="text-2xl bg-gray-400 w-full pb-2">{theme.title}</h2>
            </div>
            <div className="flex flex-1 w-full justify-center items-center bg-gray-300">
                <h3 className="text-xl w-full text-justify m-4 ">
                    {theme.description}
                </h3>
            </div>
        </div>
    );
};

export default ThemeTab;