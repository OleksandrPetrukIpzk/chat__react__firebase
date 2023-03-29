import {useContext, useEffect, useState} from "react";
import {collection, getDocs, onSnapshot,} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";
import {Context} from "App";
import {SearchUsers} from "Components/Chat/SearchUsers/SearchUsers";
import {Header} from "Components/Chat/Header/Header";
import {ChatWithUser} from "Components/Chat/ChatWithUser/ChatWithUser";
import './style.css'

export const Chat = () => {
    const [listUserWithChat, setListUserWithChat] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState({});
    const [widthScreen, setWidthScreen] = useState(window.innerWidth);
    const {
        auth,
        db,
        setUserInfo,
        allMessagesUser,
        setAllMessagesUser,
        userInfo,
        setUsersList,
        usersList,
        isChats,
        setIsChats
    } = useContext(Context);

    useEffect(() => {
        const handleResize = () => setWidthScreen(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
            const users = [];
            onAuthStateChanged(auth, async (user) => {
                const userSnapshot = await getDocs(collection(db, 'users'));
                userSnapshot.forEach((doc) => {
                        const info = doc.data();
                        if (user.uid === info.uid)
                            setUserInfo({
                                name: info.name,
                                photoURL: info.photoURL,
                                uid: info.uid,
                            });
                    }
                )
                const messagesSnapshot = await getDocs(collection(db, 'messages'));
                messagesSnapshot.forEach((doc) => {
                        const info = doc.data();
                        if (user.uid === info.uidTo || user.uid === info.uidFrom) {
                            const message = allMessagesUser;
                            message.push(info);
                            setAllMessagesUser(message);
                            if (user.uid === info.uidTo) {
                                users.push({
                                    uid: info.uidFrom
                                });

                            } else if (user.uid === info.uidFrom) {
                                users.push({
                                        uid: info.uidTo
                                    }
                                );

                            }
                        }

                    }
                )

                const table = {};
                const list = users.filter(({uid}) => (!table[uid] && (table[uid] = 1)));
                setListUserWithChat(list);
            })
        }, []
    )

    useEffect(() => {
        if (selectedChat.uid) {
            const messagesFiltred = allMessagesUser?.sort((x, y) => x.lastTime - y.lastTime)?.filter(message => (message.uidFrom === userInfo.uid && message.uidTo === selectedChat.uid) || (message.uidFrom === selectedChat.uid && message.uidTo === userInfo.uid))
            setMessages(messagesFiltred);
        }
    }, [selectedChat, allMessagesUser])

    useEffect(() => {
        const unscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
                const item = allMessagesUser;
                snapshot.forEach((doc) => {
                        const info = doc.data();
                        const ball = item.findIndex(item => item.lastTime.seconds === info.lastTime.seconds);
                        if (ball === -1) {
                            if (userInfo.uid === info.uidTo && listUserWithChat.findIndex(user => user.uid === info.uidFrom)) {
                                setListUserWithChat(prev => [...prev, {
                                    uid: info.uidFrom
                                }])
                            }
                            if (userInfo.uid === info.uidFrom && selectedChat.uid === info.uidTo) {
                                item.push(info);
                                setMessages(prev => [...prev, info])
                            }
                            if (userInfo.uid === info.uidTo) {
                                item.push(info);
                                const userList = usersList.map(user => {
                                    if ((user.uid === info.uidFrom)) {
                                        user.lastMessage = info.text;
                                        user.lastMessageTime = info.time;
                                        user.lastTime = info.lastTime;
                                    }
                                    return user;
                                });
                                setUsersList(userList);
                            }
                            if (selectedChat.uid === info.uidFrom && userInfo.uid === info.uidTo) {
                                setMessages(prevState => [...prevState, info]);

                            }
                        }
                    }
                )

                setAllMessagesUser(item);
            }
        )
        return () => unscribe();
    }, [selectedChat])

    return (<div>
        <Header setMessages={setMessages} setSelectedChat={setSelectedChat} setListUserWithChat={setListUserWithChat}/>
        <div className='chat__main'>
            {widthScreen >= 1300 || !isChats ?
                <SearchUsers listUserWithChat={listUserWithChat} setSelectedChat={setSelectedChat}
                             widthScreen={widthScreen}/> :
                <button className='back' onClick={() => setIsChats(false)}>show Chats</button>}
            {selectedChat.uid ?
                <ChatWithUser setMessages={setMessages} messages={messages} selectedChat={selectedChat}
                              setSelectedChat={setSelectedChat} widthScreen={widthScreen}
                /> : widthScreen >= 1300 ? <div className='chat__alert'>
                    <h2>Chose your chat</h2>
                </div> : ""}
        </div>
    </div>)
}