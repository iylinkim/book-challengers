import React, { useState } from "react";
import styles from "components/Profile/profile.module.css";

const Profile = ({
  ImageInput,
  userObj,
  ChallengeList,
  refreshUser,
  darkTheme,
}) => {
  const [newUserObj, setNewUserObj] = useState({
    displayName: userObj.displayName,
    photoURL: userObj.photoURL,
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (
      userObj.displayName !== newUserObj.displayName ||
      userObj.photoURL !== newUserObj.photoURL
    ) {
      await userObj.updateProfile({
        displayName: newUserObj.displayName,
        photoURL: newUserObj.photoURL,
      });
    }
    refreshUser();
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewUserObj((data) => ({ ...data, displayName: value }));
  };

  return (
    <>
      <h3 className={styles.title}>{userObj.displayName}'s Profile</h3>
      <form className={styles.form} onSubmit={onSubmit}>
        <p className={styles.profileImg}>
          <img src={newUserObj.photoURL} alt={userObj.displayName} />
        </p>
        <ImageInput setNewUserObj={setNewUserObj} darkTheme={darkTheme}/>
        <input
          className={styles.userName}
          type="text"
          value={newUserObj.displayName}
          onChange={onChange}
        />
        <input className={styles.update} type="submit" value="Update" />
      </form>
      <h3 className={styles.title}>Challenges </h3>
      <p className={styles.subTitle}>
        Click each section if you go to that challenge
      </p>
      <ChallengeList darkTheme={darkTheme}/>
    </>
  );
};

export default Profile;
