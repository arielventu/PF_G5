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
                {/* BUTTON PREV */}
            {currentPage === 1 ?
                <button className={styles.button} disabled>&lt;</button>
                    : currentPage > 1 && <button className={styles.button} onClick={() => pagination(currentPage - 1)}>&lt;</button>}
                {/* BUTTONS */}
                {currentPage > 3 ? <button className={styles.button} onClick={() => pagination(1)}>1</button> : null}
                {currentPage > 4 ? <button className={styles.button} disabled>...</button> : null}
                {pageNumbers.map(number => {
                    if (number <= currentPage + 2 && number >= currentPage - 2) {
                        return <button
                            key={number}
                            className={currentPage === number ? styles.current : styles.button}
                            onClick={() => pagination(number)}>
                            {number}
                        </button>
                    }
                })}
                {currentPage < pageNumbers.length - 2 ? <button className={styles.button} disabled>...</button> : null}
                {currentPage < pageNumbers.length - 1 ? <button className={styles.button} onClick={() => pagination(pageNumbers.length)}>{pageNumbers.length}</button> : null}
                {/* {pageNumbers && pageNumbers.slice(currentPage - 1, currentPage + 5).map(number => (
                    <div key={number} className={styles.divButton}>
                        <button className={ number === currentPage ? styles.current : styles.button} onClick={() => pagination(number)}>{number}</button>
                    </div>
                ))} */}
                {/* BUTTON NEXT */}
                {currentPage === pageNumbers.length ?
                    <button className={styles.button} disabled>&gt;</button>
                    : currentPage <= pageNumbers.length - 1 && <button className={styles.button} onClick={() => pagination(currentPage + 1)}>&gt;</button>}
            </ul>
        </nav>
    )
}