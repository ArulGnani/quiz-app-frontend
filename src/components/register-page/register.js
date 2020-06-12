import React,{ useState } from 'react'
import { Redirect } from 'react-router-dom'
import validate from '../../utils/validate'
import swal from 'sweetalert';
import './style/register.css'

const Register = () => {
    const [email,setEmail] = useState("")
    const [quizName,setQuizName] = useState("")
    const [teamName,setTeamName] = useState("")
    const [registed,setIsRegisted] = useState(false)
    const [err,setErr] = useState("")
    const [loading,setLoading] = useState(false)

    const submit = (e) => {
        e.preventDefault()
        let state = { email, quizName, teamName }
        let verified = validate(state)    
        if (verified !== true) setErr(verified)
        if (verified === true) registerUser()
    }

    const registerUser = async () => {
        setLoading(true)
        let newUser = { email, teamName, quizName }
        await fetch("https://quiz-app-v1.herokuapp.com/api/client/login",{
            method : "POST",
            headers : {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Content-Type': 'application/json'                
            },
            body : JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            setLoading(false)
            // console.log(data)
            let { token, error } = data 
            if (error) setErr(error)
            if (token) {
                saveItLocally(token,newUser)
                setIsRegisted(true)
            }
        })
        .catch(err => {
            setLoading(false)
            swal("something went wrong!..","try again...","error")
        }) 
    }

    const saveItLocally = (token, user) => {
        let state = sessionStorage.hasOwnProperty("state")
        let key = sessionStorage.hasOwnProperty("key")
        if (state) sessionStorage.removeItem("state")
        if (key) sessionStorage.removeItem("key")
        sessionStorage.setItem("state",JSON.stringify(user))
        sessionStorage.setItem("key",JSON.stringify(token))
    }

    if (registed) { return ( <Redirect to="/start-quiz"/> )}

    return (
        <main id="login-main">
            <form 
                id="login-form" 
                className={loading ? "fade-bg" : ""} 
                method="post" 
                onChange={() => setErr("")} 
            >
                { err ? <span id="err">{err}</span> :  
                loading ? <span className="loading"></span> : "" }
                <input 
                    type="text" 
                    placeholder="enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    name="email"
                    className="login-input"
                />
                <input 
                    type="text" 
                    placeholder="enter your teamname" 
                    value={teamName} 
                    onChange={(e) => setTeamName(e.target.value)} 
                    name="teamName"
                    className="login-input"
                />
                <input 
                    type="text" 
                    placeholder="enter your quiz name" 
                    value={quizName} 
                    onChange={(e) => setQuizName(e.target.value)}
                    name="quizName"
                    className="login-input"
                />
                <button 
                    onClick={submit} 
                    className="reg-submit-btn"
                    className="login-btn"
                >
                    register
                </button>
            </form>
        </main>
    )
}

export default Register