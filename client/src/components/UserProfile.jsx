import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import styles from './UserProfile.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { deleteUser, resetUserPass, getApiJWT, getUsers, getUserRoles } from "../actions/actions"

const UserProfile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, logout } = useAuth0();
  
  const getToken = () => {
    return new Promise( (resolve, reject) => {
      getAccessTokenSilently()
        .then( async token => getApiJWT(token) )
        .then( apiToken => {
          resolve(apiToken);
          console.log(apiToken)
        })
        .catch( error => {
          reject(error)
        })
    })
  };
  
  const getUsersHandle = () => {
    getToken()
      .then( apiToken => getUsers(apiToken) )
      .then( users => console.log(users.data) )
    
  }

  const deleteUserHandle = id => {
    let option = window.confirm(
      user.name + ", are you sure you want to delete your user?"
    );
    if (option) {
      getToken()
        .then( async apiToken => {
          let deleted = await deleteUser(id, apiToken)
          if (deleted.status === 204) logout()
          else {
            let nok = window.alert(`${deleted.status}: ${deleted.data}`)
          }
        })
        .catch( err => console.log(err) )
    }
  }

  const resetPassHandle = ( email ) => {
    let option = window.confirm(
      "Are you sure you want to reset your password?"
    );
    if (option) {
      getToken()
        .then( apiToken => {
          resetUserPass(email, apiToken)
            .then( res => {
              console.log(res)
              window.alert(res)
            })
        })
    }
  }

  const getRolesHandle = (id) => {
    getToken()
      .then( apiToken => {
        getUserRoles(id, apiToken)
          .then( res => {
            console.log(res)
          })
      })
  }


  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className={styles.userMasterContainer}>
        <div className={styles.userContainer}>
          <div className={styles}></div>
          <h1>{user.name}</h1>
          <img src={user.picture} alt={user.name} className={styles.userImage} />
          <p>{user.email}</p>
        </div>
        <div className={styles.userButtons}>
          {/* <button className="btn btn-primary" onClick={ () => getToken() }> GET TOKEN </button>
          <button className="btn btn-primary" onClick={ () => getUsersHandle() }> GET USERS </button>
          <button className="btn btn-primary" onClick={ () => getRolesHandle(user.sub) }> GET ROLES </button> */}
          <button className="userBtn btn btn-secondary" onClick={ () => logout() }> LOGOUT </button>
          <button className="userBtn btn btn-danger" onClick={ () => resetPassHandle(user.email) }> RESET PASSWORD </button>
          <button className="userBtn btn btn-danger" onClick={ () => deleteUserHandle(user.sub) }> DELETE USER </button>
        </div>
      </div>
    )
  );
};

export default withAuthenticationRequired(UserProfile, {
  onRedirecting: () => {return(<>Loading ...</>)},
});
