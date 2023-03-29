import {useContext} from "react";
import {Context} from "App";
import {HeaderPopup} from "Components/Chat/Header/HeaderPopup";
import {ExitAccount} from "Components/Chat/Header/ExitAccount";
import './style.css'

export const Header = ({setMessages, setSelectedChat, setListUserWithChat}) => {

    const {userInfo} = useContext(Context)

    return (<header className='chat__header'>
        <div className='chat__header__info'>
            <img className='chat__header__info__photo' src={userInfo.photoURL}/>
            <p className='chat__header__info__name'>{userInfo.name}</p>
            <HeaderPopup/>
        </div>
        <ExitAccount setMessages={setMessages} setSelectedChat={setSelectedChat}
                     setListUserWithChat={setListUserWithChat}/>
    </header>)
}