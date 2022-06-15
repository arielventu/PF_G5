import React, { useEffect, useState } from 'react' ;  
import styles from './UsersCard.module.css';
import { setAdmin, revokeAdmin, deleteUser, getApiJWT, getUserRoles } from '../actions/actions'
import { useAuth0 } from '@auth0/auth0-react';

const UsersCard = ({ id, admin, name, email, picture, refresh }) => {
    
    const { getAccessTokenSilently } = useAuth0()
    // // const [ adminUser, setAdminUser ] = useState(false);

    const getToken = () => {
        return new Promise( (resolve, reject) => {
            getAccessTokenSilently()
            .then( async token => getApiJWT(token) )
            .then( apiToken => {
                resolve(apiToken);
                // console.log(apiToken)
            })
            .catch( error => {
                reject(error)
            })
        })
    };

    // const getUserRole = () => {
    //     getToken()
    //     .then( apiToken => getUserRoles(id, apiToken) )
    //     .then( roles => {
    //         console.log(roles)
    //         let adminRole = roles.filter( role => role.name === 'Admin' );
    //         if ( adminRole.length > 0 ) {
    //             setAdminUser( true )
    //         }
    //     })
    // }

    // useEffect( () => getUserRole() ,[]);

    const handleButton = (e) => {
        getToken()
        .then( apiToken => {
            if ( e.target.name === 'set-admin' ) {
                setAdmin( id, { roles: [ "rol_ssYAS839QjRHk2GX" ]}, apiToken)
                .then( res => {
                    console.log(res);
                    refresh();
                })
                .catch( err => {
                    console.log(err);
                })
            }
            if ( e.target.name === 'revoke-admin' ) {
                revokeAdmin( id, { roles: ["rol_ssYAS839QjRHk2GX"]}, apiToken)
                .then( res => {
                    console.log(res);
                    refresh();
                })
                .catch( err => {
                    console.log(err);
                })
            }
            if ( e.target.name === 'delete' ) {
                deleteUser(id, apiToken)
                .then( res => {
                    console.log(res);
                    refresh();
                })
                .catch( err => console.log(err) )
            }
        })
    };

    return (
        <>
            <div className={styles.cardContainer}>
                    <img src={picture} alt="User Image" className={styles.userImg} />
                <p id={styles.nameText}><span className={styles.label}>Name:</span><br /> {name}</p>
                <p id={styles.mailText}><span className={styles.label}>E-mail:</span><br /> {email}</p>
                <div className={styles.buttonsContainer}>
                    { admin ? <button 
                        name='revoke-admin' 
                        className={`${styles.userButton} ${styles.alert}`}
                        onClick={ (e) => handleButton(e) }
                    > 
                        Revoke Admin 
                    </button> :
                    <button 
                        name='set-admin' 
                        className={`${styles.userButton} ${styles.medium}`}
                        onClick={ (e) => handleButton(e) }
                    > 
                        Set Admin 
                    </button>}
                    <button 
                        name='delete' 
                        className={`${styles.userButton} ${styles.danger}`}
                        onClick={ (e) => handleButton(e) }
                    > 
                        Delete 
                    </button>
                </div>
            </div>
        </>
    )
}

export default UsersCard;