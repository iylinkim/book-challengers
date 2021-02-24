import React, { useState } from "react";
import styles from "components/Profile/profile.module.css";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, ChallengeList, refreshUser }) => {
  const [editing, setEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState();
  const [newUserObj, setNewUserObj] = useState({
    displayName: userObj.displayName,
    photoURL: userObj.photoURL,
  });
  const history = useHistory();

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(userObj.photoURL, newUserObj.photoURL);
    if (
      userObj.displayName !== newUserObj.displayName ||
      userObj.photoURL !== newUserObj.photoURL
    ) {
      await userObj.updateProfile({
        displayName: newUserObj.displayName,
        photoURL: profilePhoto,
      });
    }
    refreshUser();
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setProfilePhoto(result);
      setNewUserObj((data) => ({ ...data, photoURL: result }));
    };
    reader.readAsDataURL(theFile);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewUserObj((data) => ({ ...data, displayName: value }));
  };

  const goToHome = () => {
    history.push("/");
  };

  return (
    <>
      <h3>Profile</h3>
      <form onSubmit={onSubmit}>
        <p className={styles.profileImg}>
          <img
            src={profilePhoto ? profilePhoto : userObj.photoURL}
            alt={userObj.displayName}
          />
        </p>
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="text" value={newUserObj.displayName} onChange={onChange} />
        <input type="submit" value="Update" />
      </form>
      <h3 className={styles.title}>Challenges</h3>
      <ChallengeList />
      <h3 className={`${styles.title} ${styles.add}`} onClick={goToHome}>
        + New Challenge
      </h3>
      {/* <h3>Your trophies</h3> */}
    </>
  );
};

export default Profile;
