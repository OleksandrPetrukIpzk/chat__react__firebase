import {useContext} from "react";
import {collection, getDocs} from "firebase/firestore";
import {getDownloadURL, ref} from "firebase/storage";
import {Context} from "App";

export const InputSearchUser = ({search, setSearch, setPhoto, setSearchUser}) => {

    const {db, storage, userInfo, allMessagesUser} = useContext(Context);

    const handleSearch = async (value) => {
        setSearch(value);
        if (value) {
            const searches = [];
            const querySnapshot = await getDocs(collection(db, 'users'));
            querySnapshot.forEach((doc) => {
                if (doc.data().name !== userInfo.name) {
                    if (doc.data().name.toLowerCase().includes(value.toLowerCase())) {
                        const lastMessages = allMessagesUser;
                        const lastMessage = lastMessages.filter(message => doc.data().uid === message.uidTo || doc.data().uid === message.uidFrom);
                        if (lastMessages.find(message => doc.data().uid === message.uidTo || doc.data().uid === message.uidFrom)) {
                            lastMessage.sort((x, y) => y.lastTime - x.lastTime)
                            searches.push({
                                name: doc.data().name,
                                photoURL: doc.data().photoURL,
                                uid: doc.data().uid,
                                lastMessage: lastMessage[0].text,
                                lastMessageTime: lastMessage[0].time
                            });
                            if (lastMessage[0].text.includes('image/')) {
                                getDownloadURL(ref(storage, lastMessage[0].text))
                                    .then((url) => {
                                        const xhr = new XMLHttpRequest();
                                        xhr.responseType = 'blob';
                                        xhr.onload = (event) => {
                                            const blob = xhr.response;
                                        };
                                        xhr.open('GET', url);
                                        xhr.send();
                                        setPhoto(url);

                                    })
                            }
                        } else {
                            searches.push({
                                name: doc.data().name,
                                photoURL: doc.data().photoURL,
                                uid: doc.data().uid,
                            });

                        }

                    }
                }
            })
            setSearchUser(searches);
        } else {
            setSearchUser([]);
        }
    }

    return (<input value={search} className='chat__search__input' placeholder='Search'
                   onChange={(e) => handleSearch(e.target.value)}/>)
}