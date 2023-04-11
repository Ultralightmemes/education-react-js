import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import {Context} from "../index";
import MyProgress from "./UI/progress/MyProgress";
import Rating from "./Rating";
import LoginForm from "./LoginForm";
import MyModal from "./UI/MyModal/MyModal";

const StudentCourseCard = ({course}) => {
    const {store} = useContext(Context)

    const [modal, setModal] = useState(false)

    const handleImageError = (event) => {
        event.target.src = '/No_image_available.svg.png';
    };

    return (
        <div className="rounded overflow-hidden shadow-lg h-[290px] mb-3">
            <Link to={'/course/' + course.id + '/lesson'} onClick={() => store.delLesson()}>
                <div>
                    <img className="h-44 w-44 mx-auto mt-2"
                         src={course.image ? course.image : '/No_image_available.svg.png'}
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
            <div className="flex">
                <button className="-mt-3 mr-2 ml-auto text-sm" onClick={() => setModal(true)}>Оценить курс</button>
            </div>
            <MyModal visible={modal} setVisible={setModal}>
                <div className="flex justify-center mb-2">
                    <h3>Оцените курс</h3>
                </div>

                <div className="flex justify-center">
                    <Rating courseRating={course.rating} courseId={course.id} isActive={true}/>
                </div>
            </MyModal>
        </div>
    );
};

export default StudentCourseCard;