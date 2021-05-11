import {useState, useContext, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import {doesUsernameExist} from '../services/firebase';

export default function SignUp() {
  const history = useHistory();
  const {firebase} = useContext(FirebaseContext);

  const [username, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    
    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);
        // authentication
          // emailAddress & password & username(displayName)
        await createdUserResult.user.updateProfile({
          displayName: username
        });

        // firebase user collection (create a document)
        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          following: [],
          dateCreated: Date.now()
        });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      }
    } else {
      setError('That username is already taken, please try another.');
    }
  };

  useEffect(() => {
    document.title = 'Sign up - Instagram';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img className="mt-2 w-6/12 bm-4" src="/images/logo.png" alt="Instagram app"/>
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleSignUp} method="POST">
            <input
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              onChange={({target}) => setUserName(target.value)}
              value={username}
            />
            <input
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              onChange={({target}) => setFullName(target.value)}
              value={fullName}
            />
            <input
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              onChange={({target}) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              onChange={({target}) => setPassword(target.value)}
              value={password}
            />
            <button
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
              ${isInvalid && 'opacity-50'}`}
              type="submit"
              disabled={isInvalid}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Have an account?{``}
            <Link className="font-bold text-blue-medium" to={ROUTES.LOGIN}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// fl - Karl Hadwen

// un - karl

// karlhadwen@gmail.com
