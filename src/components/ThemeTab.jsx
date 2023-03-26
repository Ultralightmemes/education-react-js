import React from 'react';

const ThemeTab = ({theme}) => {
    return (
        <div className="flex flex-col flex-1 justify-center items-center w-2/3 mt-2">
            <div className="flex flex-1 w-full justify-center items-center text-center">
                <h2 className="text-4xl bg-gray-400 w-full rounded-t-xl pb-2">{theme.title}</h2>
            </div>
            <div className="flex flex-1 w-full justify-center items-center bg-gray-300 rounded-b-xl">
                <h3 className="text-xl w-full text-justify m-4 ">
                    {theme.description}
                </h3>
            </div>
        </div>
    );
};

export default ThemeTab;