import {useContext} from "react";
import {ref, uploadBytes} from "firebase/storage";
import {addDoc, collection} from "firebase/firestore";
import {Context} from "App";
import {IconSendFile} from "Components/Chat/SendMessage/IconSendFile";

export const SendFile = ({selectedChat, text}) => {

    const {db, setUsersList, usersList, storage, userInfo,} = useContext(Context);

    const handleChangeFile = async (e) => {
        const storageRef = ref(storage, `image/${e.target.files[0].name}`);
        uploadBytes(storageRef, e.target.files[0]).then(snaphot => console.log("Complete"))
        await addDoc(collection(db, 'messages'), {
            text: storageRef.fullPath,
            uidFrom: userInfo.uid,
            uidTo: selectedChat.uid,
            time: `${new Date().getHours() + ':' + new Date().getMinutes()}`,
            lastTime: new Date(),
            checked: false,
        });
        const userLists = usersList;
        const userList = userLists.map(user => {
            if ((user.uid === selectedChat.uid) || (user.uid === userInfo.uid)) {
                user.lastMessage = text;
            }
            return user;
        });
        setUsersList(userList)
    }

    return (<div><label htmlFor="file-upload">
            <IconSendFile/>
        </label>
            <input id='file-upload' type='file' onChange={handleChangeFile} multiple
                   accept="image/png, image/jpg, image/gif, image/jpeg"/></div>
    )
}