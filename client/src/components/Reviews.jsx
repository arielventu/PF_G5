import React, { useState } from 'react'
import { Star } from 'react-star';
import styles from './Reviews.modules.css'

const Reviews = () => {
  
    // const showReviewText = (text) => {
    //     if (text.length > 100) {
    //         return text.substring(0, 100) + "..."
    //     }
    //     return text
    // }
    var show = false;
    const showRevText = () => {
        show = !show
    }
    return (
        <div>
        <Star className={styles.star}
                // onChange={(value) => console.log(value)}
                onClick={showRevText}
        />
            {show &&
                <form>
            <div className={styles.revBox}>
                <textarea className={styles.textAreaReview} col="30" name="review"></textarea>
                <label className={styles.labelReview} for="review">Breif Review</label>
            </div>
        </form>}
    </div>
    );
}

export default Reviews