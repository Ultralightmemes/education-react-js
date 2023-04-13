import React from 'react';
import {Link} from "react-router-dom";
import Rating from "./Rating";
import {API_URL} from "../http";

const BigCard = ({course}) => {
    const handleImageError = (event) => {
        event.target.src = '/No_image_available.svg.png';
    };

    return (
        <div>
            <Link to={'/preview/' + course.id}>
                <div className="rounded overflow-hidden shadow-lg h-full mb-3 bg-white bg-opacity-90  items-center text-center justify-center">
                    <img className="h-60 w-60 mx-auto mt-2"
                         src={course.image ? API_URL.substring(0, API_URL.length - 1) + course.image : '/No_image_available.svg.png'}
                         alt="CourseCard"
                         id={course.id}
                         onError={handleImageError}
                    />
                    <div className="px-6 py-4">
                        <div className="text-xl">
                            <p className="whitespace-normal text-lg text-center">
                                {course.name}
                            </p>
                        </div>
                    </div>
                    <div className="w-3/12 mx-auto mb-5">
                        <Rating
                            courseRating={course.rating}
                            isActive={false}
                            courseId={course.id}
                        />
                    </div>
                    <div className="px-6 pb-2 max-w-fit max-h-min">
                        {course.categories &&
                            course.categories.map(category =>
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

export default BigCard;