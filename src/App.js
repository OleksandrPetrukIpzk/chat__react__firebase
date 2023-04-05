import React, {createContext, useState} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import {Auth} from "Components/Auth/Auth";
import {Chat} from "Components/Chat/Chat";
import {Registration} from "Components/Registration/Registration";
import 'react-notifications/lib/notifications.css';

export const Context = createContext(null);

const App = () => {

  initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
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
