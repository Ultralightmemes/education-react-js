import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {Context} from "../index";
import MyProgress from "./UI/progress/MyProgress";

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
                        <MyProgress
                            value={course.percents}
                            max={100}
                        />
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default StudentCourseCard;