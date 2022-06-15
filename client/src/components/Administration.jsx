import React, { useState } from 'react' ;  
import styles from './Administration.module.css';
import UsersAdmin from './UsersAdmin';
import Products from './Products';
import Orders from './Orders'


const Administration = () => {

    const [sectionActive, setSectionAcive] = useState('stock');

    const handleButton = ( e ) => {
        console.log(e);
        setSectionAcive(e.target.name)
    };

    return (
        <div className={styles.mainAdminContainer}>
            <div className={styles.sectionButtonsContainer}>
                <button name='stock' className={`${styles.adminBtn} ${sectionActive === 'stock' && styles.active}`} onClick={ (e) => handleButton(e) }> Products </button>
                <button name='orders' className={`${styles.adminBtn} ${sectionActive === 'orders' && styles.active}`} onClick={ (e) => handleButton(e) }> Orders </button>
                <button name='users' className={`${styles.adminBtn} ${sectionActive === 'users' && styles.active}`} onClick={ (e) => handleButton(e) }> Users </button>
            </div>
            <div className={styles.sectionContentContainer}>
                { sectionActive === 'stock' && <Products /> }
                { sectionActive === 'orders' && <Orders /> }
                { sectionActive === 'users' && <UsersAdmin /> }
            </div>
        </div>
    )
};

export default Administration;