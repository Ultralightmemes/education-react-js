import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import CategoryService from "../services/CategoryService";
import CategoriesSidebar from "../components/CategoriesSidebar";
import CourseCard from "../components/CourseCard";

const CategoryPage = () => {
    const {id} = useParams()
    const [category, setCategory] = useState({
        id: null,
        name: '',
        courses: [
            {
                id: null,
                name: '',
                categories: []
            }
        ],
        image: '',
    })

    const [fetchCategory, isCategoryLoading, categoryError] = useFetching(async () => {
        const response = await CategoryService.getCategory(id);
        setCategory(response.data)

    })

    useEffect(() => {
        fetchCategory()
    }, [id])

    return (
        <div className="flex mx-auto w-5/6 ml-10">
            <CategoriesSidebar id={id}/>
            <div className="max-w-screen-2xl gap-10 grid grid-cols-3 ml-5">
                {category.courses.map(course => <CourseCard course={course} key={course.id}/>)}
            </div>
        </div>
    );
};

export default CategoryPage;