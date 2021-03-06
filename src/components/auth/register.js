import React, { Component } from 'react'
// component 
import StartPage from "../quiz/startPage"
import swal from 'sweetalert';
// custom css
import './style.css'


class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            email : "",
            quizName : "",
            teamName : "",
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
            if (this.state.isClicked === false && this.state.loading === false){
                this.registerUser()
                this.resetErrMsg()
            }
        }   
    }

    // register new user in db 
    registerUser = () => {
        const newUser = {
            email : this.state.email,
            teamName : this.state.teamName,
            quizName : this.state.quizName
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
                swal(e,"error")
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
        let validEmail = this.validEmailId(this.state.email)
        if (this.state.email === "" || this.state.quizName === "" ||
        this.state.teamName === ""){
            return "all fields are required!..."
        }else if(this.state.email.length < 5 || validEmail === false){
            return "enter an valid email!..."
        }else if(this.state.quizName.length < 3){
            return "quizName should be min 5 char"
        }else if(this.state.teamName.length < 5){
            return "teamName should be min 5 char"
        }else {
            return true
        }
    }

    // check for valid email id 
    validEmailId = (email) => {
        let reg =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return reg.test(String(email).toLowerCase())
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
            alert("loading pls wait...")
            // swal("loading pls wait....")
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
            <div className="main-bg">
                <div className="logo-bg">
                    <img src={require('./logo.png')} alt="logo" width="500px"
                    className="logo"/>
                </div>
                <form className="reg">
                    <span className="err">{err}</span>
                    <br />
                    <input type="text" placeholder="enter your email" 
                    value={this.state.email} onChange={this.handelChange}
                    name="email"/>
                    <br />
                    <input type="text" placeholder="enter your teamname"
                    value={this.state.teamName} onChange={this.handelChange}
                    name="teamName"/>
                    <br />
                    <input type="text" placeholder="enter your quiz name"
                    value={this.state.quizName} onChange={this.handelChange}
                    name="quizName"/>
                    <br />
                    <button onClick={this.submit} className="reg-submit-btn">register</button>
                </form>
            </div>
        )
    }
}
export default Register