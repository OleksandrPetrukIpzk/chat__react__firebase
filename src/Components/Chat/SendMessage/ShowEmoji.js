import {useState} from "react";
import EmojiPicker from "emoji-picker-react";


export const ShowEmoji = ({setText}) => {

    const [isEmoji, setIsEmoji] = useState(false);

    const handleClickEmoji = (value) => {
        setText(prevState => prevState + value.emoji);
    }

    const handleShowEmoji = () => {
        setIsEmoji(prev => !prev)
    }

    return (<div> {isEmoji && <EmojiPicker onEmojiClick={value => handleClickEmoji(value)} emojiStyle='google'/>}
        <button className='send__emoji' onClick={handleShowEmoji}>🤩</button>
    </div>)
}