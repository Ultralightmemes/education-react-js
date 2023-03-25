import React from 'react';
import CourseItem from "./CourseItem";

const CourseList = ({courses}) => {
    if (!courses.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Курсы не найдены
            </h1>
        )
    }
    return (
        <div>
            {courses.map(course => <CourseItem course={course} key={course.id}/>)}
        </div>
    );
};

export default CourseList;