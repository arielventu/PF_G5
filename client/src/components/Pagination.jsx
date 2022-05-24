import React from "react";
import styles from './Pagination.module.css';

export default function Pagination({shoesPerPage, products, pagination, currentPage}) {
    const pageNumbers = []

    for(var i = 1; i <= Math.ceil(products/shoesPerPage); i++){
        pageNumbers.push(i)
    }
    return(
        <nav className={styles.nav}>
            <ul className={styles.ul}>
            {currentPage === 1 ?
                <button className={`${styles.pageItem} ${styles.num}`} disabled>&lt;</button>
                    : currentPage > 1 && <button className={`${styles.pageItem} ${styles.num}`} onClick={() => pagination(currentPage - 1)}>&lt;</button>}
                {pageNumbers && pageNumbers.map(number=>(
                    <div key={number} className={styles.li}>
                        <button className={styles.button} onClick={()=>pagination(number)}>{number}</button>
                    </div>
                ))}
            </ul>
        </nav>
    )
}