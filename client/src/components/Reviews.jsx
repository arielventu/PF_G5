import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getReviews, getReviewsById, setReviews } from "../actions/actions";
import starB from "../image/starb.svg";
import starY from "../image/stary.svg";
import styles from "./Reviews.module.css";
// import swal from "sweetalert";
// import { FontAwesomeIcon } from "@htmlFortawesome/react-fontawesome";
// import {
//     faStar
// } from "@htmlFortawesome/free-solid-svg-icons";


const Reviews = ({ productId, name }) => {
  const dispatch = useDispatch();
  const reviewsById = useSelector((state) => state.reviewsById);
  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    dispatch(getReviewsById(productId));
    setReviewsList([]);
    setReviewsList(reviewsById);
  }, [productId, reviewsById, reviewsById.length, reviewsById[0]?.id, reviewsById[0]?.review]);
  
  // useEffect(() => {
  //   dispatch(getReviewsById(productId));
  //   setReviewsList(reviewsById);
  // }, [reviewsById[0].id]);
  
  
  // console.log('productId: ', productId)
  // console.log('reviewsById: ',reviewsById);
  // console.log('reviewsList: ',reviewsList);

  return (
    <div className={styles.divContainer}>
      <div className={styles.divReviews}>
        <div className={styles.divReviewsTitle}>
          <h2>Reviews of { name }:</h2>
          {reviewsList?.map((review, i) => (
            <div key={i} className={styles.divReviewsContent}>
              <div key={`b${productId}`} className={styles.divReviewsContentTitle}>
                <h4 key={`c${productId}`}>{review.username === null || review.username === '' ? 'Anonymous' : review.username}</h4>
                  {review.starsLevel === 1 &&
                    <div className={styles.divStar}>
                      <img className={styles.star} src={starY} alt="star" />
                      <img className={styles.star} src={starB} alt="star" />
                      <img className={styles.star} src={starB} alt="star" />
                      <img className={styles.star} src={starB} alt="star" />
                      <img className={styles.star} src={starB} alt="star" />
                    </div>}
                    {review.starsLevel === 2 &&
                    <div className={styles.divStar}>
                      <img className={styles.star} src={starY} alt="star" />
                      <img className={styles.star} src={starY} alt="star" />
                      <img className={styles.star} src={starB} alt="star" />
                      <img className={styles.star} src={starB} alt="star" />
                      <img className={styles.star} src={starB} alt="star" />
                    </div>}
                  {review.starsLevel === 3 &&
                    <div className={styles.divStar}>
                      <img className={styles.star} src={starY} alt="star" />
                      <img className={styles.star} src={starY} alt="star" />
                      <img className={styles.star} src={starY} alt="star" />
                      <img className={styles.star} src={starB} alt="star" />
                      <img className={styles.star} src={starB} alt="star" />
                    </div>}
                  {review.starsLevel === 4 &&
                    <div className={styles.divStar}>
                      <img className={styles.star} src={starY} alt="star" />
                      <img className={styles.star} src={starY} alt="star" />
                      <img className={styles.star} src={starY} alt="star" />
                      <img className={styles.star} src={starY} alt="star" />
                      <img className={styles.star} src={starB} alt="star" />
                    </div>}
                  {review.starsLevel === 5 &&
                    <div className={styles.divStar}>
                      <img className={styles.star} src={starY} alt="star" />
                      <img className={styles.star} src={starY} alt="star" />
                      <img className={styles.star} src={starY} alt="star" />
                      <img className={styles.star} src={starY} alt="star" />
                      <img className={styles.star} src={starY} alt="star" />
                    </div>}
                <p key={`p${productId}`} className={styles.reviewp}>{review.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
