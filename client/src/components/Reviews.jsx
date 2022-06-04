import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getReviews, getReviewsById, setReviews } from "../actions/actions";
import styles from "./Reviews.module.css";
import swal from "sweetalert";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faStar
// } from "@fortawesome/free-solid-svg-icons";

const Reviews = () => {
  // const { productId } = useParams();
  const productId = 52;
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.allReviews);
  const reviewsById = useSelector((state) => state.reviewsById);
  //   const [reviewsList, setReviewsList] = useState([]);
  const [newReview, setNewReview] = useState({
    description: "",
    starLevel: 0,
    productId: productId,
  });

  useEffect(() => {
    dispatch(getReviews());
    dispatch(getReviewsById(productId));
    console.log(reviews);
  }, []);

  //   useEffect(() => {
  //     setReviewsList(reviews);
  //   }, [reviews]);

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setReviewsList({
    //   ...reviewsList,
    //   [name]: value,
    // });
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setReviews(newReview));
    swal("Success!", "Your review has been added!", "success");
    setNewReview({
      description: "",
      starLevel: 0,
      productId: productId,
    });
    reviews.push(newReview);
  };

  return (
    <div>
      <div className={styles.reviews}>
        <div className={styles.reviews__header}>
          <h2>Reviews</h2>
        </div>

        <div className={styles.reviews__body__reviews__review__form}>
          <form onSubmit={handleSubmit}>
                      <div className={styles.reviews__body__reviews__review__form__stars}>
                          <div className={styles.reviews__body__reviews__review__form__stars__star}>
                              <input type="radio" name="starLevel" value="1" onChange={handleChange} />
                              <label htmlFor="star1">1</label>
                          </div>
                          <div className={styles.reviews__body__reviews__review__form__stars__star}>
                              <input type="radio" name="starLevel" value="2" onChange={handleChange} />
                              <label htmlFor="star2">2</label>
                          </div>
                          <div className={styles.reviews__body__reviews__review__form__stars__star}>
                              <input type="radio" name="starLevel" value="3" onChange={handleChange} />
                              <label htmlFor="star3">3</label>
                          </div>
                          <div className={styles.reviews__body__reviews__review__form__stars__star}>
                              <input type="radio" name="starLevel" value="4" onChange={handleChange} />
                              <label htmlFor="star4">4</label>
                          </div>
                          <div className={styles.reviews__body__reviews__review__form__stars__star}>
                              <input type="radio" name="starLevel" value="5" onChange={handleChange} />
                              <label htmlFor="star5">5</label>
                          </div>
                      </div>
                      <div className={styles.reviews__body__reviews__review__form__description}>
                          <textarea name="description" id="description" cols="30" rows="10" onChange={handleChange}></textarea>
                      </div>
                      <div className={styles.reviews__body__reviews__review__form__submit}>
                          <input type="submit" value="Submit" />
                      </div>
                  </form>
              </div>
          </div>
      </div>
  );
};

//          <div class="stars">
//            <form action="">
//              <input class="star star-5" id="star-5-2" type="radio" name="star" />
//              <label class="star star-5" for="star-5-2"></label>
//              <input class="star star-4" id="star-4-2" type="radio" name="star" />
//              <label class="star star-4" for="star-4-2"></label>
//              <input class="star star-3" id="star-3-2" type="radio" name="star" />
//              <label class="star star-3" for="star-3-2"></label>
//              <input class="star star-2" id="star-2-2" type="radio" name="star" />
//              <label class="star star-2" for="star-2-2"></label>
//              <input class="star star-1" id="star-1-2" type="radio" name="star" />
//              <label class="star star-1" for="star-1-2"></label>
//              <div class="rev-box">
//                <textarea class="review" col="30" name="review"></textarea>
//                <label class="review" for="review">
//                  Breif Review
//                </label>
//                            <button class="submit" type="submit">Submit</button>
//              </div>
//            </form>
//          </div>
//        </div>

//         <form>
//             <div className={styles.revBox}>
//                 <textarea className={styles.textAreaReview} col="30" name="review"></textarea>
//                 <label className={styles.labelReview} for="review">Breif Review</label>
//             </div>
//         </form>
//     </div>
//    );
// };

export default Reviews;
