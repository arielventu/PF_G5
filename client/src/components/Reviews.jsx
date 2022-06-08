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
  // const { id } = useParams();
  // const productId = id;
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
                <p key={productId * 4}>{review.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
