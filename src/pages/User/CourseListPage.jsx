import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import CourseService from "../../services/CourseService";
import CategoriesSidebar from "../../components/CategoriesSidebar";
import CourseCard from "../../components/CourseCard";
import {observer} from "mobx-react-lite";

const CourseListPage = observer(() => {
    const [courses, setCourses] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedSort, setSelectedSort] = useState('')
    const [searchState, setSearchState] = useState(false)

    const [fetchCourses, isCoursesLoading, coursesError] = useFetching(async () => {
        const response = await CourseService.getAll(selectedSort, searchQuery);
        setCourses(response.data)
    })

    useEffect(() => {
        fetchCourses()
    }, [selectedSort, searchState])

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        setSearchState(!searchState)
    }

    return (
        <div className="flex mx-auto w-11/12 ml-10">
            <CategoriesSidebar/>
            <div className="ml-5 w-full">
                <div className="flex w-full mb-3">
                    <select
                        onChange={e => setSelectedSort(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" selected>Стандартная</option>
                        <option value={'name'}>По названию</option>
                        <option value={'publish_date'}> По дате публикации</option>
                        <option value={'update_date'}>По дате обновления</option>
                    </select>
                    <form className="ml-3 w-4/5 flex">
                        <input
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Поиск..."
                            id="default-search"
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300
                               rounded-l-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:border-r-0"
                        />
                        <button
                            type="submit"
                            onClick={e => handleSearchSubmit(e)}
                            className="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800
                                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm
                                px-4 py-2"
                        >
                            Search
                        </button>
                    </form>
                </div>
                {courses.length === 0 ?
                    <div className="w-11/12">
                        <h1 className="mx-auto">Курсов не найдено</h1>
                    </div>
                    :
                    <div className="max-w-screen-2xl gap-x-4 grid grid-cols-3">
                        {courses?.map(course => <CourseCard course={course} key={course.id}/>)}
                    </div>
                }
            </div>
        </div>
    );
});

export default CourseListPage;