import React, { useState, useEffect } from 'react' ;  
import styles from './UsersAdmin.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import { getApiJWT, getUsers } from '../actions/actions'
import UsersCard from './UsersCard';


const UsersAdmin = () => {

    const { user, getAccessTokenSilently } = useAuth0()
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
        getToken()
        .then( apiToken => getUsers(apiToken) )
        .then( users => {
            // console.log(users.data);
            setUsersList(users.data)
        })
    };

    useEffect( () => refreshList, []);
    

    return (
        <>
        {usersList.map( (u, i) => (
            <UsersCard 
                key={i}
                id={`${u.user_id}`} 
                name={`${u.name}`} 
                email={`${u.email}`}
                picture={`${u.picture}`}
                refresh = { refreshList }
            />
        ))}
        </>
    )
};

export default UsersAdmin;