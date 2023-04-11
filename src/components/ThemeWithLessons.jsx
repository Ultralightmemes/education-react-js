import React, {useState} from 'react';
import LessonComponent from "./LessonComponent";

const ThemeWithLessons = ({theme}) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <li>
            <div
                className='p-2 text-l font-semibold text-gray-900 rounded-lg hover:bg-gray-300 cursor-pointer'
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{theme.title}</span>
            </div>
            <hr className="border-gray-800"/>
            {isOpen &&
                <ul className="relative">
                    {theme.lessons.map(lesson => <LessonComponent lesson={lesson} key={lesson.id}/>)}
                </ul>
            }
        </li>
    );
};

export default ThemeWithLessons;