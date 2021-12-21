import React, { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { Card, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserStyleSheet.css'
toast.configure()

function Login() {

    const [emailInput, setEmailInput] = useState()


    const setEmailLogin = (e) => {
        setEmailInput({ ...emailInput, [e.target.name]: e.target.value })
    }

    const submitInput = () => {

        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!reg.test(String(emailInput.email))) {

            toast.error("Please enter valid email format",{position:toast.POSITION.TOP_RIGHT} )

        } else {
            console.log(emailInput.email);
            localStorage.setItem('user',JSON.stringify(emailInput.email))
            window.location.href='/forms'
        }

    }

    const clientId = "368885034985-ti014ip1ee2gdjihtv34obaosah2uobp.apps.googleusercontent.com"

    const responseGoogle = (res) => {

    }

    return (
        <div>
            <Card className='login-card'>
                <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}><h1>Login/Signup</h1></Card.Title>
                    <div className='login-body'>
                        <label>Email</label>
                        <br></br>
                        <input placeholder='enter your email' type='email' name='email' onChange={setEmailLogin}></input>
                        <br></br><br></br>

                        <Button onClick={submitInput}>SignIn</Button>
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="SignIn with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </Card.Body>
            </Card>

        </div>
    )
}

export default Login
