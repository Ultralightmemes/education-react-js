import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {Context} from "../index";

const StudentCourseCard = ({course}) => {
    const {store} = useContext(Context)

    const handleImageError = (event) => {
        event.target.src = '/No_image_available.svg.png';
    };
    return (
        <div>
            <Link to={'/course/' + course.id + '/lesson'} onClick={() => store.delLesson()}>
                <div className="rounded overflow-hidden shadow-lg h-72 w-80 mb-3">
                    <img className="h-44 w-44 mx-auto mt-2"
                         src={course.image}
                         alt="CourseCard"
                         id={course.id}
                         onError={handleImageError}
                    />
                    <div className="px-6 py-4">
                        <div className="text-xl">
                            <p className="whitespace-normal text-lg text-center">
                                {course.name.substring(0, 25)}
                            </p>
                        </div>
                    </div>
                    <div className="px-6 pb-2">
                        {course.categories.slice(0, 1).map(category =>
                            <span
                                key={category.id}
                                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold
                                text-gray-700 mr-2 mb-2"
                            >
                                {category.name}</span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default StudentCourseCard;