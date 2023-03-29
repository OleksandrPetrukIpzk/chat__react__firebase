import {useContext} from "react";
import {Context} from "App";
import {SendMessage} from "Components/Chat/SendMessage/SendMessage";
import {Message} from "Components/Chat/ChatWithUser/Message";
import './style.css'

export const ChatWithUser = ({setMessages, messages, selectedChat, widthScreen}) =>{
    const {isChats} = useContext(Context)
    return(<div className={ widthScreen < 1300 ? isChats ? 'message__phone' : 'message__none' : 'message'}>
        <div className='message__user'>
            <img className='message__img' src={selectedChat.photoURL}/>
            <p className='message__name'>{selectedChat.name}</p>
        </div>
        <div className='message__scroll'  >
        { messages?.map(message =>  <Message message={message} selectedChat={selectedChat} /> ) }
        </div>
        <SendMessage messages={messages} selectedChat={selectedChat} setMessages={setMessages}/>
        </div>)
}