import React from 'react';
import {Link} from "react-router-dom";

const CategoryElement = ({category}) => {
    let classname = "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white"
    return (
        <li>
            <Link to={'/category/' + category.id}>
                <div
                    className={classname}>
                    <span className="ml-3">{category.name}</span>
                </div>
            </Link>
        </li>
    );
};

export default CategoryElement;