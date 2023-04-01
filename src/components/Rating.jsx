import React from 'react';
import CourseService from "../services/CourseService";

const Rating = ({courseId, courseRating, isActive}) => {
    let className = "rating"
    if (isActive)
        className += " rating_set"
    const ratings = document.querySelectorAll('.rating')

    if (ratings.length > 0) {
        initRatings();
    }

    function initRatings() {
        let ratingActive, ratingValue;
        for (let index = 0; index < ratings.length; index++) {
            const rating = ratings[index]
            initRating(rating);
        }


        function initRating(rating) {
            initRatingVars(rating);

            setRatingActiveWidth();

            if (rating.classList.contains('rating_set')) {
                setRating(rating);
            }
        }

        function initRatingVars(rating) {
            ratingActive = rating.querySelector('.rating__active');
            ratingValue = rating.querySelector('.rating__value')
        }

        function setRatingActiveWidth(index = courseRating) {
            const ratingActiveWidth = index / 0.05;
            ratingActive.style.width = `${ratingActiveWidth}%`
        }

        function setRating(rating) {
            const ratingItems = rating.querySelectorAll('.rating__item');
            console.log(ratingItems)
            for (let index = 0; index < ratingItems.length; index++) {
                const ratingItem = ratingItems[index];
                ratingItem.addEventListener("mouseenter", function (e) {

                    initRatingVars(rating);
                    setRatingActiveWidth(ratingItem.value);
                });
                ratingItem.addEventListener("mouseleave", function (e) {
                    setRatingActiveWidth();
                });
                ratingItem.addEventListener("click", async function (e) {
                    initRatingVars(rating);
                    courseRating = index + 1
                    setRatingActiveWidth()
                    const response = await CourseService.rateCourse(courseId, courseRating)
                })
            }
        }
    }

    return (
        <div className={className}>
            <div className="rating__body">
                <div className="rating__active"></div>
                <div className="rating__items">
                    <input type="radio" name="rating" value="1" className="rating__item"/>
                    <input type="radio" name="rating" value="2" className="rating__item"/>
                    <input type="radio" name="rating" value="3" className="rating__item"/>
                    <input type="radio" name="rating" value="4" className="rating__item"/>
                    <input type="radio" name="rating" value="5" className="rating__item"/>
                </div>
            </div>
        </div>
    );
};

export default Rating;