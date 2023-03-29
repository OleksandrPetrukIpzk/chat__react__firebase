import {useContext, useEffect, useState} from "react";
import {getDownloadURL, ref} from "firebase/storage";
import {Context} from "App";

export const User = ({user, setSearch, setSelectedChat}) => {
    const {storage, setIsChats} = useContext(Context);
    const [isPhoto, setIsPhoto] = useState(false);
    const [localPhoto, setLocalPhoto] = useState('');
    useEffect(() => {
        if (user?.lastMessage?.includes('image/') && user?.lastMessage !== localPhoto) {
            getDownloadURL(ref(storage, user.lastMessage))
                .then((url) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = (event) => {
                        const blob = xhr.response;
                    };
                    xhr.open('GET', url);
                    xhr.send();
                    setLocalPhoto(url);
                    setIsPhoto(true);
                })
        }
    }, [user])

    const handleChangeUser = (user) => {
        setSelectedChat(user)
        setSearch('');
        setIsChats(true);
    }

    return (<div key={user.uid} className='chat__search__user'
                 onClick={() => handleChangeUser(user)}>
        <img className='chat__search__user__photo' src={user.photoURL}/>
        <div style={{width: '100%'}}>
            <p className='chat__search__user__name'>{user.name}</p>
            <p className='chat__search__user__message'> {user.lastMessage && isPhoto ?
                <div className='prev__photo message__block'><p
                    style={{display: 'flex', alignItems: 'center'}}>Photo: <img className='user__photos'
                                                                                src={localPhoto}/></p>
                    <p>{user.lastMessageTime}</p></div> :
                <div className='message__block'><p className='chat__search__user__message'>{user.lastMessage}</p><p
                    className='user__time'>{user.lastMessageTime}</p></div>}
            </p>
        </div>
    </div>)
}