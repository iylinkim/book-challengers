import React from "react";
import styles from "components/Auth/auth.module.css";
import { toggleClassName } from "utils";
import { useAccount } from "hooks/state";

const Auth = ({ darkTheme }) => {
  const {
    onSubmit,
    onChange,
    email,
    password,
    error,
    newAccount,
    toggleLoginSignout,
    onSocialSignIn,
  } = useAccount();

  return (
    <div className={styles.wrap}>
      <div className={styles.img}>
        <img src="/book-challengers/images/authMain.jpg" alt="auth main" />
      </div>
      <div className={toggleClassName(darkTheme, styles, "info_wrap")}>
        <div className={styles.info}>
          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.email}>
              <span
                className={toggleClassName(darkTheme, styles, "box", "icon")}
              >
                <i className="fas fa-envelope"></i>
              </span>
              <input
                className={toggleClassName(darkTheme, styles, "box", "input")}
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className={styles.password}>
              <span
                className={toggleClassName(darkTheme, styles, "box", "icon")}
              >
                <i className="fas fa-lock"></i>
              </span>
              <input
                className={toggleClassName(darkTheme, styles, "box", "input")}
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
                required
              />
            </div>
            <span className={styles.error}>{error ? `${error} !` : ""}</span>

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
