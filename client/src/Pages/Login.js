import React from 'react'
import { useGoogleLogin } from 'react-google-login';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
import axios from 'axios';
const Login = () => {
    let history = useHistory();
    const clientId = "167239900596-l26qmlnm2jpm5mmiff7t6gvusq68ip5r.apps.googleusercontent.com";
    const onSuccess = (res) => {
        const { name, email, imageUrl, googleId } = res.profileObj;
        axios.post("http://localhost:8080/api/auth", {
            name, email, imageUrl, googleId
        }).then((res) => {
            if (res.status === 200) {
                Cookies.set("userCookie", googleId, { expires: 2 });
                history.push('/');
                window.location.reload()

            }
            if (res.status === 202) {
                Cookies.set("userCookie", googleId, { expires: 2 });
                history.push('/');
                window.location.reload()
            }
        })

    }

    const onFailure = () => {
        alert("Some thing went wrong")
    }

    const { signIn } = useGoogleLogin({
        onSuccess,
        clientId,
        onFailure,
    });
    return (
        <>
            <br /> <br /> <br />
            <button onClick={signIn}>Continue with google</button>
        </>
    )
}

export default Login;