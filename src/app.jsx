import AppRouter from "components/Router/Router";
import Challenges from "components/Challenges/Challenges";
import useAuth from "hooks/state";
import "./app.css";

function App({ ImageInput, ToggleBtn, book }) {
  const ChallengeList = (props) => <Challenges {...props} userObj={userObj} />;
  const { init, loggedIn, setLoggedIn, userObj, refreshUser } = useAuth();

  return (
    <>
      {init ? (
        <AppRouter
          ChallengeList={ChallengeList}
          ImageInput={ImageInput}
          ToggleBtn={ToggleBtn}
          loggedIn={loggedIn}
          book={book}
          userObj={userObj}
          setLoggedIn={setLoggedIn}
          refreshUser={refreshUser}
        />
      ) : (
        <div className="loading">
          <p className="spinner">
            <i className="fas fa-spinner"></i>
          </p>
          <p className="loading_text">Loading...</p>
        </div>
      )}
    </>
  );
}

export default App;
