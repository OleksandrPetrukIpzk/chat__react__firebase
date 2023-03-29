import {useState} from "react";
import {ShowEmoji} from "Components/Chat/SendMessage/ShowEmoji";
import {SendFile} from "Components/Chat/SendMessage/SendFile";
import {ButtonSendMessage} from "Components/Chat/SendMessage/ButtonSendMessage";
import {WriteMessage} from "Components/Chat/SendMessage/WriteMessage";
import './style.css'

export const SendMessage = ({messages, selectedChat}) => {

    const [text, setText] = useState('');

    return (<div className='send'>
        <WriteMessage text={text} setText={setText}/>
        <ShowEmoji setText={setText}/>
        <SendFile text={text} selectedChat={selectedChat}/>
        <ButtonSendMessage text={text} selectedChat={selectedChat} messages={messages} setText={setText}/>
    </div>)
}