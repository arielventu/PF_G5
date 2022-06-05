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

const Reviews = () => {
  const { productId } = useParams();
  // const productId = 52;
  const dispatch = useDispatch();
  const reviewsById = useSelector((state) => state.reviewsById);
  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    dispatch(getReviewsById(productId));
    // console.log(reviews);
  }, []);

  useEffect(() => {
    setReviewsList(reviewsById);
  }, [reviewsById]);
  
  console.log(productId)

  return (
    <div className={styles.divContainer}>
      
    </div>
  );
};

export default Reviews;
