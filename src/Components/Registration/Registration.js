import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {Context} from "App";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {addDoc, collection} from "firebase/firestore";
import './style.css'
export const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const {auth, db} = useContext(Context);
    const navigate = useNavigate();
    const handleChangeEmail = (value) => {
        setEmail(value);
    }
    const handleChangePassword = (value) => {
        setPassword(value)
    }
    const handleChangeName = (value) => {
        setName(value)
    }
    const registerUser = async () => {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user;
                addDoc(collection(db, 'users'), {
                    uid: user.uid,
                    name,
                    email,
                    photoURL: 'data:image/png;base64,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',
                });
                navigate('/')
            }
        ).catch(error => console.log(error))
    }
    return (<div className='login'>
        <h2>Registration</h2>
        <input className='login__input' type={'email'} placeholder={'Email'} onChange={(e) => handleChangeEmail(e.target.value)}/>
        <input className='login__input' type='text' placeholder={'Name'} onChange={(e) => handleChangeName(e.target.value)}/>
        <input className='login__input' type='password' placeholder='Password' onChange={(e) => handleChangePassword(e.target.value)}/>
        <button className='login__button' onClick={registerUser}>Register</button>
        <Link className='login__link' to='/'>I have account</Link>
    </div>)
}