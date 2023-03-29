import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";
import React, {createContext, useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import {collection, getFirestore, onSnapshot} from "firebase/firestore";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Auth} from "Components/Auth/Auth";
import {Chat} from "Components/Chat/Chat";
import {Registration} from "Components/Registration/Registration";
import { getStorage } from "firebase/storage";

export const Context = createContext(null);
const App = () => {
  initializeApp({
    apiKey: "AIzaSyCbqJ0XgUohGw0muZNs0p42KXaVfY8tOVA",
    authDomain: "chat-app-react-5bd2e.firebaseapp.com",
    projectId: "chat-app-react-5bd2e",
    storageBucket: "chat-app-react-5bd2e.appspot.com",
    messagingSenderId: "546866629044",
    appId: "1:546866629044:web:4cfe084831b8d2c8044ae1",
      databaseURL: "https://chat-app-react-5bd2e-default-rtdb.firebaseio.com/",
  });
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage()

    const [usersList, setUsersList] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [allMessagesUser, setAllMessagesUser] = useState([]);
  const [isChats, setIsChats] = useState(false);
  const router = createBrowserRouter([
    {
      path: '/',
      element:  <Auth/>
    },
    {
      path: '/chat',
      element:  <Chat/>
    },
    {
      path: '/registration',
      element: <Registration/>
    }
  ])
  return (
      <Context.Provider value={{
        auth,
        db,
        storage,
          usersList,
          setUsersList,
          userInfo,
          setUserInfo,
          allMessagesUser, setAllMessagesUser,
        isChats, setIsChats
      }}>
          <RouterProvider router={router}/>
      </Context.Provider>
  );
}

export default App;
