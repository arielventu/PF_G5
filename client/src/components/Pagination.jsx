import React from "react";
import styles from './Pagination.module.css';

export default function Pagination({shoesPerPage, products, pagination}){
    const pageNumbers = []

    for(var i = 1; i <= Math.ceil(products/shoesPerPage); i++){
        pageNumbers.push(i)
    }
    return(
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                {pageNumbers && pageNumbers.map(number=>(
                    <li key={number} className={styles.li}>
                    <button className={styles.button}onClick={()=>pagination(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}