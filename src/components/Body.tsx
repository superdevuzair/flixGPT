import { UnknownAction } from "@reduxjs/toolkit";
import { onAuthStateChanged, User } from "firebase/auth";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import Browse from "./Browse";
import Login from "./Login";

interface IBodyProps {}

const Body: React.FC<IBodyProps> = (props) => {
  const dispatch: React.Dispatch<UnknownAction> = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
      } else {
        dispatch(removeUser(null));
      }
    });
  }, []);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
