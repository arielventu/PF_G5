import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getReviews, getReviewsById, setReviews } from "../actions/actions";
import starB from "../image/starb.svg";
import starY from "../image/stary.svg";
import styles from "./Reviews.module.css";
import swal from "sweetalert";
// import { FontAwesomeIcon } from "@htmlFortawesome/react-fontawesome";
// import {
//     faStar
// } from "@htmlFortawesome/free-solid-svg-icons";

const Reviews = ({productId, name}) => {
  const dispatch = useDispatch();
  const reviewsById = useSelector((state) => state.reviewsById);
  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    dispatch(getReviewsById(productId));
    // console.log(reviewsById);
  }, []);
  
  useEffect(() => {
    dispatch(getReviewsById(productId));
    setReviewsList(reviewsById);
  }, [reviewsById.length]);
  
  // console.log('productId: ', productId)
  // console.log('reviewsById: ',reviewsById.length);
  // console.log('reviewsList: ',reviewsList);

  return (
    <div className={styles.divContainer}>
      <div className={styles.divReviews}>
        <div className={styles.divReviewsTitle}>
          <h2>Reviews of { name }</h2>

          {reviewsList?.map((review) => (
            <div key={productId} className={styles.divReviewsContent}>
              <div key={productId * 2} className={styles.divReviewsContentTitle}>
                <h4 key={productId * 3}>{review.username === null || review.username === '' ? 'Anonymous' : review.username}</h4>
                <p key={productId * 4}>{review.description}</p>
                <div key={productId * 5} className={styles.divReviewsContentStars}>
                  <p key={productId * 6}>{review.starsLevel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
