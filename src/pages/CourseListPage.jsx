import React, {useContext, useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import CourseService from "../services/CourseService";
import CategoriesSidebar from "../components/CategoriesSidebar";
import CourseCard from "../components/CourseCard";
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

    return (
        <div className="flex mx-auto w-11/12 ml-10">
            <CategoriesSidebar/>
            <div className="ml-5">
                <div className="flex w-full mb-3">
                    <select
                        onChange={e => setSelectedSort(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" selected>Стандартная</option>
                        <option value={'name'}>По названию</option>
                        <option value={'publish_date'}> По дате публикации</option>
                        <option value={'update_date'}>По дате обновления</option>
                    </select>
                    <div className="relative ml-3 w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Поиск..."
                            id="default-search"
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300
                               rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                               dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                               dark:focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            onClick={() => setSearchState(!searchState)}
                            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800
                                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm
                                px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="max-w-screen-2xl gap-x-10 grid grid-cols-3">
                    {courses?.map(course => <CourseCard course={course} key={course.id}/>)}
                </div>
            </div>
        </div>
    );
});

export default CourseListPage;