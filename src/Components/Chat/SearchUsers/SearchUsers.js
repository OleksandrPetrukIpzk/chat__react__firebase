import {useContext, useEffect, useState} from "react";
import {collection, getDocs, onSnapshot} from "firebase/firestore";
import {Context} from "App";
import {User} from "Components/Chat/SearchUsers/User";
import {InputSearchUser} from "Components/Chat/SearchUsers/InputSearchUser";
import './style.css'

export const SearchUsers = ({listUserWithChat, setSelectedChat, widthScreen}) => {

    const [search, setSearch] = useState('');
    const [searchUser, setSearchUser] = useState([]);
    const [photo, setPhoto] = useState('');
    const {db, usersList, setUsersList, userInfo, allMessagesUser, isChats,} = useContext(Context);

    useEffect(() => {
            const user = [];
            const listUsers = async () => {
                const querySnapshot = await getDocs(collection(db, 'users'));
                querySnapshot.forEach((doc) => {
                        if (listUserWithChat.find(user => user.uid === doc.data().uid) !== undefined && usersList.includes(user => user.uid === doc.data().uid) === false) {
                            const lastMessages = allMessagesUser;
                            const lastMessage = lastMessages.filter(message => doc.data().uid === message.uidTo || doc.data().uid === message.uidFrom).sort((x, y) => y.lastTime - x.lastTime);
                            user.push({
                                name: doc.data().name,
                                photoURL: doc.data().photoURL,
                                uid: doc.data().uid,
                                lastMessage: lastMessage[0].text,
                                lastMessageTime: lastMessage[0].time,
                                lastTime: lastMessage[0].lastTime,
                            })
                        }
                    }
                )
                if (user.length > usersList.length) {
                    setUsersList(user);
                }

            }

            listUsers().catch()

        },
        [listUserWithChat]);

    useEffect(() => {
        const unscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
            const item = allMessagesUser;
            const users = usersList;
            snapshot.forEach((doc) => {
                    const info = doc.data();
                    const ball = item.findIndex(item => item.lastTime.seconds === info.lastTime.seconds);
                    if (ball === -1) {
                        users.map(user => {
                            if ((user.uid === info.uidFrom && userInfo.uid === info.uidTo)) {
                                user.lastMessage = info.text;
                                user.lastMessageTime = info.time;
                                user.lastTime = info.lastTime;
                            }
                            return user;
                        });

                    }
                }
            )
            setUsersList(users);
        })
        return () => unscribe();
    }, [usersList])


    return (<div
            className={widthScreen < 1300 ? isChats ? 'chat__searchMobile__none' : 'chat__searchMobile__show' : 'chat__search'}>
            <InputSearchUser setSearchUser={setSearchUser} setSearch={setSearch} setPhoto={setPhoto} search={search}/>
            {
                search === '' ? usersList?.sort((x, y) => y.lastTime - x.lastTime).map(user => <div key={user.lastTime}>
                        <User user={user}
                              setSearch={setSearch} setSelectedChat={setSelectedChat}/></div>) :
                    searchUser.map(user => <User
                        user={user} setSearch={setSearch} setSelectedChat={setSelectedChat}/>)}
        </div>
    )
}