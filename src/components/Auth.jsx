import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

const Auth = () => {
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
      console.log(error);
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
    <>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
      </form>
      <p onClick={toggleLoginSignout}>
        {newAccount ? "Sign In" : "Create Account"}
      </p>
      <button onClick={onSocialSignIn} name="Google">
        Sign In with Google
      </button>
      <button onClick={onSocialSignIn} name="Github">
        Sign In with Github
      </button>
    </>
  );
};

export default Auth;
