const { authService, firebaseInstance } = require("fbase");
const { useState, useEffect } = require("react");

// User
const useAuth = () => {
  const [init, setInit] = useState(false);
  const [loggedIn, setLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUserObj(user);
      } else {
        setLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, [loggedIn, userObj]);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return { init, loggedIn, setLoggedIn, userObj, refreshUser };
};

// Sign in / Sign up
export const useAccount = () => {
  const [newAccount, setNewAccount] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      setError(error.message);
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

  return {
    onSubmit,
    onChange,
    email,
    password,
    error,
    newAccount,
    toggleLoginSignout,
    onSocialSignIn,
  };
};

export const useBooks = (book, inputRef) => {
  const [books, setBooks] = useState([]);
  const [bookInfo, setBookInfo] = useState({});

  const onClick = (event) => {
    event.preventDefault();
    book
      .search(inputRef.current.value)
      .then((results) => setBooks(results.data.documents));
  };

  return { books, bookInfo, setBookInfo, onClick };
};

export default useAuth;
