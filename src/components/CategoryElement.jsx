import React from 'react';
import {Link} from "react-router-dom";

const CategoryElement = ({category, id = null}) => {
    let classname = "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white"
    let link = '/courses'
    if (id === String(category.id)) {
        classname += " bg-amber-200 hover:bg-amber-400 dark:hover:bg-amber-700"
    } else {
        link = '/category/' + category.id
        classname += "hover:bg-gray-100 dark:hover:bg-gray-700"
    }
    return (
        <li>
            <Link to={link}>
                <div
                    className={classname}>
                    <span className="ml-3">{category.name}</span>
                </div>
            </Link>
        </li>
    );
};

export default CategoryElement;