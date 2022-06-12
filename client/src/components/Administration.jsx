import React, { useState } from 'react' ;  
import styles from './Administration.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import { postCheckoutOrder, getApiJWT } from '../actions/actions';
import UsersAdmin from './UsersAdmin';
import Products from './Products';


const Administration = () => {

    const [sectionActive, setSectionAcive] = useState('stock');

    const handleButton = ( e ) => {
        console.log(e);
        setSectionAcive(e.target.name)
    };

    return (
        <div className={styles.mainAdminContainer}>
            <div className={styles.sectionButtonsContainer}>
                <button name='stock' onClick={ (e) => handleButton(e) }> Stock </button>
                <button name='orders' onClick={ (e) => handleButton(e) }> Orders </button>
                <button name='users' onClick={ (e) => handleButton(e) }> Users </button>
            </div>
            <div className={styles.sectionContentContainer}>
                { sectionActive === 'stock' && <Products /> }
                { sectionActive === 'orders' && <p> ORDERS </p> }
                { sectionActive === 'users' && <UsersAdmin /> }
            </div>
        </div>
    )
};

export default Administration;