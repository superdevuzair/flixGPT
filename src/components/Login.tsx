import { useState } from "react";
import Header from "./Header";

interface ILoginProps {}

const Login: React.FC<ILoginProps> = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn)
  }

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
        {!isSignIn && (<input
          type="text"
          placeholder="Full Name"
          className="p-4 my-4 w-full bg-gray-700"
        />)}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg">
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
