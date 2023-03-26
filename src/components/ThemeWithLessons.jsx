import React from 'react';
import LessonComponent from "./LessonComponent";

const ThemeWithLessons = ({theme}) => {
    return (
        <li>
            <div
                className='p-2 text-xl font-semibold text-gray-900 rounded-lg dark:text-white hover:bg-blue-700 dark:hover:bg-blue-700 '>
                <span className="ml-1">{theme.title}</span>
            </div>
            <ul className="relative">
                {theme.lessons.map(lesson => <LessonComponent lesson={lesson} key={lesson.id}/>)}
            </ul>
        </li>
    );
};

export default ThemeWithLessons;