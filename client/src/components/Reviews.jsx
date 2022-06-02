import React, { useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import {getReviews, getReviewsById, setReviews} from '../actions/actions';
import styles from "./Reviews.modules.css";
import swal from 'sweetalert';


const Reviews = () => {
   
    const reviews = useSelector((state) => state.reviews);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        id: "",
        username: "",
        description: "",
        starsLevel: "",
        productId: "",
    });

    
    return (

   <div>
       <div class="cont">
         <div class="stars">
           <form action="">
             <input class="star star-5" id="star-5-2" type="radio" name="star" />
             <label class="star star-5" for="star-5-2"></label>
             <input class="star star-4" id="star-4-2" type="radio" name="star" />
             <label class="star star-4" for="star-4-2"></label>
             <input class="star star-3" id="star-3-2" type="radio" name="star" />
             <label class="star star-3" for="star-3-2"></label>
             <input class="star star-2" id="star-2-2" type="radio" name="star" />
             <label class="star star-2" for="star-2-2"></label>
             <input class="star star-1" id="star-1-2" type="radio" name="star" />
             <label class="star star-1" for="star-1-2"></label>
             <div class="rev-box">
               <textarea class="review" col="30" name="review"></textarea>
               <label class="review" for="review">
                 Breif Review
               </label>
                           <button class="submit" type="submit">Submit</button>
             </div>
           </form>
         </div>
       </div> 

        <form>
            <div className={styles.revBox}>
                <textarea className={styles.textAreaReview} col="30" name="review"></textarea>
                <label className={styles.labelReview} for="review">Breif Review</label>
            </div>
        </form> 
    </div>
   );
};

export default Reviews;
