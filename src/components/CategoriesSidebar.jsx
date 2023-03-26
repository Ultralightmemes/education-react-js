import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import CategoryService from "../services/CategoryService";
import CategoryElement from "./CategoryElement";

const CategoriesSidebar = () => {
    const [categories, setCategories] = useState([])

    const [fetchCategories, isCategoriesLoading, categoriesError] = useFetching(async () => {
        const response = await CategoryService.getCategories()
        setCategories(response.data)
    })

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <aside className="w-80" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
                <ul className="space-y-2">
                    {categories.map(category => <CategoryElement category={category} key={category.id}/>)}
                </ul>
            </div>
        </aside>
    );
};

export default CategoriesSidebar;