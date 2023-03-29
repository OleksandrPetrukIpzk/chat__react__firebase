import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Context} from "App";

export const ExitAccount = ({setMessages, setSelectedChat, setListUserWithChat}) => {
    const {
        auth,
        setUsersList, setAllMessagesUser
    } = useContext(Context)
    const navigate = useNavigate()
    const handleExit = () => {
        auth.signOut();
        navigate('/');
        setMessages([]);
        setSelectedChat([]);
        setUsersList([]);
        setAllMessagesUser([]);
        setListUserWithChat([]);
    }
    return (<button className='chat__header__sign' onClick={handleExit}>Log out
    </button>)
}