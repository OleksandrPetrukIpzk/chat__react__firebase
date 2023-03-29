import {useContext} from "react";
import {addDoc, collection} from "firebase/firestore";
import {Context} from "App";
import {IconSendMessage} from "Components/Chat/SendMessage/IconSendMessage";

export const ButtonSendMessage = ({text, messages, selectedChat, setText}) => {

    const {db, setUsersList, usersList, userInfo,} = useContext(Context);

    const sendMessage = async () => {
        if (text !== '' && text.length > 0) {
            try {
                await addDoc(collection(db, 'messages'), {
                    text,
                    uidFrom: userInfo.uid,
                    uidTo: selectedChat.uid,
                    time: `${new Date().getHours() + ':' + new Date().getMinutes()}`,
                    lastTime: new Date(),
                    checked: false,
                });
                if (messages.length === 0) {
                    setUsersList(prev => [...prev, {
                        name: selectedChat.name,
                        photoURL: selectedChat.photoURL,
                        uid: selectedChat.uid,
                        lastMessage: text,
                        checked: false,
                        lastMessageTime: `${new Date().getHours() + ':' + new Date().getMinutes()}`,
                        lastTime: new Date(),
                    }]);

                } else {
                    const userList = usersList.map(user => {
                        if ((user.uid === selectedChat.uid) || (user.uid === userInfo.uid)) {
                            user.lastMessage = text;
                            user.lastMessageTime = `${new Date().getHours() + ':' + new Date().getMinutes()}`;
                            user.lastTime = new Date()
                        }
                        return user;
                    });
                    setUsersList(userList)
                }
                setText('');

            } catch (error) {
                console.log(error);
            }

        }
    }

    return (<button className='send__button' onClick={sendMessage}><IconSendMessage/>
    </button>)
}