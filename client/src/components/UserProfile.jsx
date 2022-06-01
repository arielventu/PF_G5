import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className={styles.userContainer}>
        <h1>{user.name}</h1>
        <img src={user.picture} alt={user.name} className={styles.userImage} />
        <p>{user.email}</p>
      </div>
    )
  );
};

export default withAuthenticationRequired(UserProfile, {
  onRedirecting: () => {return(<>Loading ...</>)},
});
