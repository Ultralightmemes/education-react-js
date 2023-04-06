import React from 'react';
import {API_URL} from "../http";
import {Link} from "react-router-dom";

const CourseTeacherCard = ({course}) => {
    const handleImageError = (event) => {
        event.target.src = '/No_image_available.svg.png';
    };

    console.log(course)
    return (
        <Link to={`/teacher/course/${course.id}`} className="w-full shadow-lg flex flex-row h-48">
            <img className="h-44 w-44 mx-auto ml-1 my-2"
                 src={API_URL.substring(0, API_URL.length - 1) + course.image}
                 alt="CourseCard"
                 id={course.id}
                 onError={handleImageError}
            />
            <div className="px-6 py-4 w-full">
                <h1 className="font-bold text-xl mb-2 mx-auto" >{course.name}</h1>
                <div className="grid grid-cols-3 gap-x-16 mt-8">
                    <div>
                        <h2>Дата публикации:</h2>
                        <h3>{course.publish_date}</h3>
                    </div>
                    <div>
                        <h2>Последнее обновление:</h2>
                        <h3>{course.update_date}</h3>
                    </div>
                    <div>
                        <h2>Опубликован:</h2>
                        <input type="checkbox" checked={course.is_published} disabled/>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseTeacherCard;