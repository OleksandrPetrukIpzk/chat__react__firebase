import {useContext, useState} from "react";
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {Context} from "App";
import {NotificationContainer, NotificationManager} from 'react-notifications';

export const ChangePhoto = () => {
    const [url, setUrl] = useState('');
    const {db, setUserInfo, userInfo} = useContext(Context)
    const changePhoto = () => {
        if (url) {
            const usersCollection = collection(db, 'users');
            const q = query(usersCollection, where('uid', '==', `${userInfo.uid}`));
            getDocs(q).then((querySnaphot) => {
                querySnaphot.forEach(docu => {
                    const newUserInfo = {
                        name: userInfo.name,
                        photoURL: url,
                        uid: userInfo.uid,
                    }
                    updateDoc(doc(db, 'users', docu.id),
                        newUserInfo).then(log => setUserInfo(newUserInfo))
                        .catch(error => NotificationManager.error('Photo dont change'))
                })
            }).catch(error => NotificationManager.error('Photo dont change'))
        }
    }

    const handleChangeLink = (value) => {

        let text = value;
        let lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
            lines[i] = lines[i].trimLeft();
        }
        let result = lines.join('\n');
        setUrl(result);
    }

    return (<div className='chat__header__popup__block'>
        <input className='chat__header__popup__input' value={url} onChange={(e) => handleChangeLink(e.target.value)}
               placeholder='change photo'/>
        <button className='chat__header__popup__button' onClick={changePhoto}>Change photo</button>
        <NotificationContainer/>
    </div>)
}