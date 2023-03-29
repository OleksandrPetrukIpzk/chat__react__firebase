import {useContext, useEffect, useRef, useState} from "react";
import {Context} from "App";
import { ref, getDownloadURL} from "firebase/storage";


export const Message = ({message, selectedChat}) => {
    const scroll = useRef();
    const [photo, setPhoto] = useState(null);
    const {storage, userInfo} = useContext(Context);

    useEffect(() => {
            if (message.text.includes('image/')) {
                getDownloadURL(ref(storage, message.text))
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
        scroll.current?.scrollIntoView({behavior: 'smooth'})
    }, [message, selectedChat])
    return (<div ref={scroll} key={message.lastTime}
                 className={message.uidFrom === userInfo.uid ? 'messages__from' : 'messages__to'}>
        <p style={{background: 'none'}}></p>
        <p className={message.uidFrom === userInfo.uid ? 'message__from' : 'message__to'}>
            {photo ? <img className='message__photo' src={photo}/> : message.text}

        </p>

    </div>)
}

//Time if need <p className='message__time'>{message.time}</p>