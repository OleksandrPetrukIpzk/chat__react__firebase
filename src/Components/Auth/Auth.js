import {useContext, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {Context} from "App";
import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {addDoc, collection, getDocs} from "firebase/firestore";
import './style.css'
import {NotificationContainer, NotificationManager} from 'react-notifications';

export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {auth, db} = useContext(Context);
    const navigate = useNavigate();

    const login = async () => {
        let isRegisteredUser = false;
        const provider = new GoogleAuthProvider();
        const {user} = await signInWithPopup(auth, provider);
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            if (doc.data().email === user.email) {
                isRegisteredUser = true;
            }
        })
        if (!isRegisteredUser) {
            addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            });
        }
        navigate('/chat')
    }

    const loginUser = () => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user;
                navigate('/chat')
            }
        ).catch(error => NotificationManager.error('Something with your entered data'))
    }
    const handleChangeEmail = (value) => {
        setEmail(value);
    }
    const handleChangePassword = (value) => {
        setPassword(value)
    }
    return (<div className='login'>
        <h2>Login</h2>
        <input className='login__input' type={'email'} placeholder={'Email'}
               onChange={(e) => handleChangeEmail(e.target.value)}/>
        <input className='login__input' type='password' placeholder='Password'
               onChange={(e) => handleChangePassword(e.target.value)}/>
        <button className='login__button' onClick={loginUser}>Login</button>
        <button className='login__button' onClick={login}>Google</button>
        <Link className='login__link' to='/registration'>Registration</Link>
        <NotificationContainer/>
    </div>)
}