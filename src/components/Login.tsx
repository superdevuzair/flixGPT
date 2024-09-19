import React, { useRef, useState } from "react";
import Header from "./Header";
import { validate } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
interface ILoginProps {}

const Login: React.FC<ILoginProps> = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch();
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const name = useRef<HTMLInputElement | null>(null);

  const toggleSignInForm = (): void => {
    setIsSignIn(!isSignIn);
  };
  const handleGenericClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    const verify: null | string = validate(
      email.current?.value!,
      password.current?.value!
    );
    if (verify) {
      setErrorMessage(verify);
      return;
    }
    if (!isSignIn) {
      //signup with firebase
      createUserWithEmailAndPassword(
        auth,
        email.current?.value!,
        password.current?.value!
      )
        .then((userCredentials: UserCredential) => {
          updateProfile(userCredentials.user, {
            displayName: name.current?.value!,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser!;
              //dispatch function to update display name for current user 
              //We are using AuthStateChange-> firebase for Adding and removing user from Redux.
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                })
              );
              navigate("/browse");
            })
            .catch((error: Error) => {
              console.log("error", error.message);
            });
        })
        .catch((error: Error) => {
          const errorMsg: string = error.message;
          console.error(errorMsg);
          setErrorMessage(errorMsg);
        });
    } else {
      //sign in with firebase
      signInWithEmailAndPassword(
        auth,
        email.current?.value!,
        password.current?.value!
      )
        .then((user: UserCredential) => {
          navigate("/browse");
        })
        .catch((error: Error) => {
          setErrorMessage(error.message);
          console.error(error.message);
        });
    }

    console.log("verify", verify);
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img
        className="object-cover w-full h-full"
        src="/netflix-background.jpg"
        alt="netflix background"
      />

      {/* Black Fade Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent"></div>

      {/* Header - Will be on top of the overlay */}
      <Header />
      <form className="z-10 top-0 w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-60">
        <h1 className="font-bold text-3xl py-4">
          {" "}
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        {errorMessage && (
          <p className="text-red-700 text-lg py-2 font-bold">{errorMessage}</p>
        )}
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={(e) => handleGenericClick(e)}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <span className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignIn
            ? "New to Netflix ? Sign Up Now"
            : "Already registered ? Sign In now."}
        </span>
      </form>
    </div>
  );
};

export default Login;
