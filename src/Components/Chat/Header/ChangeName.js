import {useContext, useState} from "react";
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {Context} from "App";

export const ChangeName = () => {
    const {db, setUserInfo, userInfo} = useContext(Context)
    const [change, setChange] = useState('');
    const handleChange = (value) => {
        let text = value;
        let lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
            lines[i] = lines[i].trimLeft();
        }
        let result = lines.join('\n');
        setChange(result);
    }
    const changeName = () => {
        if (change) {
            const usersCollection = collection(db, 'users');
            const q = query(usersCollection, where('uid', '==', `${userInfo.uid}`));
            getDocs(q).then((querySnaphot) => {
                querySnaphot.forEach(docu => {
                    const newUserInfo = {
                        name: change,
                        photoURL: userInfo.photoURL,
                        uid: userInfo.uid,
                    }
                    updateDoc(doc(db, 'users', docu.id),
                        newUserInfo).then(log => setUserInfo(newUserInfo)).catch()
                })
            }).catch()
        }
    }

    return (<div className='chat__header__popup__block'>
        <input className='chat__header__popup__input' value={change} onChange={(e) => handleChange(e.target.value)}
               placeholder='change name'/>
        <button className='chat__header__popup__button' onClick={changeName}>Change name</button>
    </div>)
}