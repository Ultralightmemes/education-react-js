import React from 'react';
import LessonComponent from "./LessonComponent";

const ThemeWithLessons = ({theme}) => {
    return (
        <li>
            <div
                className='p-2 text-xl font-semibold text-gray-900 rounded-lg'>
                <span className="ml-1">{theme.title}</span>
            </div>
            <hr className="border-gray-800"/>
            <ul className="relative">
                {theme.lessons.map(lesson => <LessonComponent lesson={lesson} key={lesson.id}/>)}
            </ul>
        </li>
    );
};

export default ThemeWithLessons;