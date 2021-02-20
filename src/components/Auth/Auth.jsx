import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";
import styles from "components/Auth/auth.module.css";

const Auth = () => {
  console.log("Auth");
  const [newAccount, setNewAccount] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggleLoginSignout = () => setNewAccount((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        //Sign Up
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        //Sign In
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSocialSignIn = (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "Google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
      authService.signInWithPopup(provider);
    } else if (name === "Github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
      authService.signInWithPopup(provider);
    }
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.img}>
        <img src="authMain.jpg" alt="auth main" />
      </div>
      <div className={styles.info_wrap}>
        <div className={styles.info}>
          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.email}>
              <span className={`${styles.box} ${styles.icon}`}>
                <i className="fas fa-envelope"></i>
              </span>
              <input
                className={`${styles.box} ${styles.input}`}
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className={styles.password}>
              <span className={`${styles.box} ${styles.icon}`}>
                <i className="fas fa-lock"></i>
              </span>
              <input
                className={`${styles.box} ${styles.input}`}
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
                required
              />
            </div>
            <input
              className={`${styles.box} ${styles.submit}`}
              type="submit"
              value={newAccount ? "Create Account" : "Sign In"}
            />
          </form>

          <p onClick={toggleLoginSignout} className={styles.toggle}>
            {newAccount
              ? "Already have an account?"
              : "dont't have an account?"}
            <span>{newAccount ? "Sign In" : "Create Account"}</span>
          </p>
          <span className={styles.social_text}>Or, Sign In with</span>
          <p className={styles.social_wrap}>
            <button
              onClick={onSocialSignIn}
              name="Google"
              className={`${styles.box} ${styles.social}`}
            >
              <span>
                <i className="fab fa-google"></i>
              </span>
              Google
            </button>
            <button
              onClick={onSocialSignIn}
              name="Github"
              className={`${styles.box} ${styles.social}`}
            >
              <span>
                <i className="fab fa-github"></i>
              </span>
              Github
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
