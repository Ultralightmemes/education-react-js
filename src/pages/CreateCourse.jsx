import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import CategoryService from "../services/CategoryService";

const CreateCourse = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const [isPublished, setIsPublished] = useState(false)
    const [chosenCategories, setChosenCategories] = useState([])

    const [fetchCategories, isCategoriesLoading, categoriesError] = useFetching(async () => {
        const response = await CategoryService.getCategories()
        setCategories(response.data)
    })

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <div className="w-2/3">

        </div>
    );
};

export default CreateCourse;