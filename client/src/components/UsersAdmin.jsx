import React, { useState, useEffect } from 'react' ;  
import styles from './UsersAdmin.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import { getApiJWT, getUsers } from '../actions/actions'
import UsersCard from './UsersCard';


const UsersAdmin = () => {

    const { getAccessTokenSilently } = useAuth0()
    const [usersList, setUsersList] = useState([]);


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
    
    const refreshList = () => {
        // console.log('refresh')
        getToken()
        .then( apiToken => getUsers(apiToken) )
        .then( users => {
            console.log(users.data);
            setUsersList(users.data)
        })
    };

    useEffect( () => refreshList, []);
    

    return (
        <>

        { usersList.length === 0 ?
            <div className={styles.divLoading}>
                <img src="https://thumbs.gfycat.com/PepperyMediumBrahmancow-size_restricted.gif" />
            </div> :
            <div id={styles.userAdminContainer}>
                <h1 className={styles.usersTitle}> Users Management </h1>
                {usersList.map( (u, i) => (
                    <UsersCard 
                        key={i}
                        id={`${u.user_id}`}
                        admin={u.admin}
                        name={`${u.name}`} 
                        email={`${u.email}`}
                        picture={`${u.picture}`}
                        refresh = { refreshList }
                    />
                ))}
            </div>
        }
        </>
    )
};

export default UsersAdmin;