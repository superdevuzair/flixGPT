import { signOut } from "firebase/auth";
import * as React from "react";
import { useSelector } from "react-redux";
import { UnknownAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => {
  const dispatch: React.Dispatch<UnknownAction> = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const user = useSelector((store: any) => store?.user);

  const onHanldeSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error: Error) => {
        console.log("err", error);
      });
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser(null));
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black top-0 left-0 p-4 z-10 flex justify-between">
      {/* Logo */}
      <img className="w-48" src="/Netflix_Logo_PMS.png" alt="Netflix Logo" />
      {user && (
        <div className="flex p-2">
          <img className="w-12 h-12" src="/userLogo.png" alt="user logo" />
          <button
            className="font-bold text-white p-1 text-lg"
            onClick={onHanldeSignout}
          >
            {" "}
            {user?.displayName} - Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
