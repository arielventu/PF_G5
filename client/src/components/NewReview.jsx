import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getReviews, getReviewsById, setReviews } from "../actions/actions";
import starB from "../image/starb.svg";
import starY from "../image/stary.svg";
import styles from "./NewReview.module.css";
import swal from "sweetalert";
import { useAuth0 } from "@auth0/auth0-react";
// import { FontAwesomeIcon } from "@htmlFortawesome/react-fontawesome";
// import {
//     faStar
// } from "@htmlFortawesome/free-solid-svg-icons";

const NewReview = ({ handleModal }) => {
    const { id } = useParams();
    const productId = id;
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.allReviews);
    const reviewsById = useSelector((state) => state.reviewsById);
    const { user } = useAuth0();
    const initialReview = {
        username: user.name,
        description: "",
        starsLevel: 0,
        productId: productId,
    }
    const [newReview, setNewReview] = useState(initialReview);

  useEffect(() => {
    dispatch(getReviews());
    dispatch(getReviewsById(productId));
    // console.log(reviews);
  }, []);

  const handleChange = (e) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.starsLevel === 0) {
        swal({
            text: "Don't forget to rate us with stars",
            icon: "warning",
            buttons: false,
            timer: 3000,
        });
    } else if (newReview.description.length === 0) {
        swal({
            text: "Don't forget to write a review",
            icon: "warning",
            buttons: false,
            timer: 3000,
        });
    } else {
        dispatch(setReviews(newReview));
        swal("Success!", "Your review has been added!", "success");
        setNewReview(initialReview);
        reviews.push(newReview);
        reviewsById.push(newReview);
      //  dispatch(getReviewsById(productId))
      }
      handleModal(); // Cierra modal en componente padre 'Detail'
  };

return (
    <div className={styles.divContainer}>
        <div className={styles.divFormContainer}>
            <div className={styles.divInnerContainer}>
                <div className={styles.divReviewsHeader}>
                    <h2 className={styles.reviewsHeader}>Thank for your review!</h2>
                </div>
                <div className={styles.divReviewFormContainer}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.divStarsContainer}>
                            <div className={styles.divStar}>
                                <input className={styles.inputStar} id="sl1" type="radio" name="starsLevel" value="1" onChange={handleChange}/>
                                <label className={styles.labelStar1} htmlFor="sl1">
                                    {newReview.starsLevel < 1 ?
                                        <img className={styles.star} src={starB} alt="star" />
                                        : <img className={styles.star} src={starY} alt="star" />
                                    }
                                </label>
                            </div>
                            <div className={styles.divStar}>
                                <input className={styles.inputStar} id="sl2" type="radio" name="starsLevel" value="2" onChange={handleChange}/>
                                <label className={styles.labelStar2} htmlFor="sl2">
                                    {newReview.starsLevel < 2 ?
                                        <img className={styles.star} src={starB} alt="star" />
                                        : <img className={styles.star} src={starY} alt="star" />
                                    }
                                </label>
                            </div>
                            <div className={styles.divStar}>
                                <input className={styles.inputStar} id="sl3" type="radio" name="starsLevel" value="3" onChange={handleChange}/>
                                <label className={styles.labelStar3} htmlFor="sl3">
                                    {newReview.starsLevel < 3 ?
                                        <img className={styles.star} src={starB} alt="star" />
                                        : <img className={styles.star} src={starY} alt="star" />
                                    }
                                </label>
                            </div>
                            <div className={styles.divStar}>
                                <input className={styles.inputStar} id="sl4" type="radio" name="starsLevel" value="4" onChange={handleChange}/>
                                <label className={styles.labelStar4} htmlFor="sl4">
                                    {newReview.starsLevel < 4 ?
                                        <img className={styles.star} src={starB} alt="star" />
                                        : <img className={styles.star} src={starY} alt="star" />
                                    }
                                </label>
                            </div>
                            <div className={styles.divStar}>
                                <input className={styles.inputStar} id="sl5" type="radio" name="starsLevel" value="5" onChange={handleChange}/>
                                <label className={styles.labelStar5} htmlFor="sl5">
                                    {newReview.starsLevel < 5 ?
                                        <img className={styles.star} src={starB} alt="star" />
                                        : <img className={styles.star} src={starY} alt="star" />
                                    }
                                </label>
                            </div>
                        </div>
                        {/* <div className={styles.divReviewsHeader}>
                            <h2>Your name</h2>
                        </div>
                        <div className={styles.divUsernameReview}>
                            <input  className={styles.usernameReview} type="text" cols="30" name="username" id="username" onChange={handleChange}/>
                        </div> */}
                        {/* <div className={styles.divDescriptionTitle}>
                            <h2 className={styles.descriptionTitle}>Your review</h2>
                        </div> */}
                        <div className={styles.divDescriptionReview}>
                            <textarea className={styles.textareaReview}
                                placeholder="Write your review here"
                                name="description"
                                id="description"
                                cols="30"
                                rows="6"
                                onChange={handleChange}>
                            </textarea>
                        </div>
                        <div className={styles.divSubmitReview}>
                            <input className={styles.submitReview} type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
);
};

export default NewReview;
