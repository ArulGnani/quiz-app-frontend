import React, { Component } from 'react'
// component 
import StartPage from "../quiz/startPage"
// custom css
import './style.css'

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            email : "",
            quizName : "sample2",
            teamName : "sample2",
            passWord : "",
            isRegisted : false,
            errMsg : "",
            loading : false,
            isClicked : false,
            authKey : ""           
        }
    }

    // handel's change event 
    handelChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
            errMsg : ""
        })
    }

    // when sumbit
    submit = (event) => {
        event.preventDefault()
        let verified = this.verifyInput()    
        if (verified !== true){
            this.setErrMsg(verified)
        }else{
            if (this.state.isClicked === false){
                this.registerUser()
                this.resetErrMsg()
            }
        }   
    }

    // register new user in db 
    registerUser = () => {
        console.log("reg")
        const newUser = {
            email : this.state.email,
            quizName : this.state.quizName,
            teamName : this.state.teamName,
            password : this.state.passWord
        }
        
        fetch("https://quiz-app-v1.herokuapp.com/api/client/login",{
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
            if (data.err){
                let err = data.err
                this.setErrMsg(err)
            }else{
                let token = data.token
                this.saveToken(token)
                this.setState({
                    loading : true,
                    isRegisted : true,
                    authKey : token
                })
                this.resetState()
            }
        })
        .catch(err => {
            if (err){
                let e = "somthing went wrong!..."
                this.setErrMsg(e)
            }
        }) 
    }

    // save auth-key to localstorage 
    saveToken = (token) => {
        let key= token 
        let isKey = localStorage.getItem("auth-key")
        if (isKey){
            localStorage.removeItem("auth-key")
            localStorage.setItem("auth-key",key)
        }else{
            localStorage.setItem("auth-key",key)
        }
    }

    // client-side validation 
    verifyInput = () => {
        if (this.state.email === "" || this.state.quizName === "" ||
        this.state.teamName === "" || this.state.passWord === ""){
            return "all fields are required!..."
        }else if(this.state.email.length < 5){
            return "enter an valid email!..."
        }else if(this.state.passWord.length < 8){
            return "password should be min 8 char"
        }else if(this.state.quizName.length < 3){
            return "quizName should be min 5 char"
        }else if(this.state.teamName.length < 5){
            return "teamName should be min 5 char"
        }else {
            return true
        }
    }

    // reset whole state 
    resetState = () => {
        this.setState({
            email : "",
            passWord : "",
            errMsg : "",
            loading : false,
            isClicked : false
        })
    }
    
    // clear error message in state
    resetErrMsg = () => {
        this.setState({
            errMsg : "",
            isClicked : true
        })
    }

    // set err msg to state 
    setErrMsg = (err) => {
        this.setState({
            errMsg : err,
            isClicked : false
        })
    }

    render() {
        let err = this.state.errMsg
        if(this.state.loading){
            alert("loading pls wait!...")
        }
        if (this.state.isRegisted){
            return (
                <div>
                    <StartPage quizName={this.state.quizName}
                    teamName={this.state.teamName}/>
                </div>
            )
        }
     
        return (
            <div>
                <form>
                    <span className="err">{err}</span>
                    <br />
                    <input type="text" placeholder="enter your email" 
                    value={this.state.email} onChange={this.handelChange}
                    name="email"/>
                    <br />
                    <input type="text" placeholder="enter ur teamname"
                    value={this.state.teamName} onChange={this.handelChange}
                    name="teamName"/>
                    <br />
                    <input type="text" placeholder="enter ur quiz name"
                    value={this.state.quizName} onChange={this.handelChange}
                    name="quizName"/>
                    <br />
                    <input type="password" placeholder="enter ur password"
                    value={this.state.password} onChange={this.handelChange}
                    name="passWord"/>
                    <br />
                    <button onClick={this.submit}>submit</button>
                </form>
            </div>
        )
    }
}
export default Register