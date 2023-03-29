import Popup from "reactjs-popup";
import {ChangeName} from "Components/Chat/Header/ChangeName";
import {ChangePhoto} from "Components/Chat/Header/ChangePhoto";
import 'reactjs-popup/dist/index.css';

export const HeaderPopup = () => {
    return (<Popup trigger={<button className='chat__header__popup__target'>Change profile</button>}
                   position={"center center"} modal>
        <ChangeName/>
        <ChangePhoto/>
    </Popup>)
}