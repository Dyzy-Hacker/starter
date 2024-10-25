import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import athleteGroupImage from "../../public/images/heroBanner.jpeg";

const Login: React.FC = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      <div className="md:flex-1 flex items-center justify-center mb-8 md:mb-0">
        <img
          src={athleteGroupImage}
          alt="Athletes Group"
          className="w-4/5 md:w-3/5"
        />
      </div>

      <div className="md:flex-1 flex flex-col justify-center">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Your Fitness Journey Starts Here
        </h1>
        <button
          onClick={signInWithGoogle}
          className="border border-blue-400 hover:bg-blue-100 text-blue-400 font-medium py-2 px-[40vh] rounded-md"
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
