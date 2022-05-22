import React from 'react'
import styles from './SearchBar.module.css';

const SearchBar = () => {
  return (
    <div className={styles.container}>
        <input className={styles.input} type="text" value={"buscar..."} />
    </div>
  )
}

export default SearchBar