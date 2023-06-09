import React from 'react';
import {Link} from "react-router-dom";
import {API_URL} from "../http";

const CourseCard = ({course, absoluteURL = true}) => {
    const handleImageError = (event) => {
        event.target.src = '/No_image_available.svg.png';
    };
    return (
        <div>
            <Link to={'/preview/' + course.id}>
                <div className="rounded overflow-hidden shadow-lg h-72 mb-3 bg-white bg-opacity-90">
                    <img className="h-44 w-44 mx-auto mt-2"
                         src={course.image ?
                             (absoluteURL ? course.image : API_URL.substring(0, API_URL.length - 1) + course.image)
                             :
                             '/No_image_available.svg.png'}
                         alt="CourseCard"
                         id={course.id}
                         onError={handleImageError}
                    />
                    <div className="px-6 py-4">
                        <div className="text-xl">
                            <p className="whitespace-normal text-lg text-center">
                                {
                                    course.name.length > 25
                                        ?
                                        course.name.substring(0, 25) + '...'
                                        :
                                        course.name
                                }
                            </p>
                        </div>
                    </div>
                    <div className="px-6 pb-2 max-w-fit max-h-min">
                        {course.categories.slice(0, 2).map(category =>
                            <span
                                key={category.id}
                                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold
                                text-gray-700 mr-2 mb-5"
                            >
                                {category.name}</span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CourseCard;