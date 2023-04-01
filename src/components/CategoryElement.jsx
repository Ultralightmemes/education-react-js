import React from 'react';
import {Link} from "react-router-dom";

const CategoryElement = ({category, id = null}) => {
    let classname = "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg"
    let link = '/courses'
    if (id === String(category.id)) {
        classname += " bg-blue-500 hover:bg-blue-600"
    } else {
        link = '/category/' + category.id
        classname += " hover:bg-gray-100"
    }
    return (
        <li>
            <Link to={link}>
                <div
                    className={classname}>
                    <span className="ml-3">{category.name}</span>
                </div>
            </Link>
            <hr className="bg-gray-500 h-[1px] mx-2"/>
        </li>
    );
};

export default CategoryElement;