import React, { Component } from 'react'
import swal from 'sweetalert';
// component 
import Quiz from './quiz'
// css 
import './quizStyle.css'

class StartPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            allQuestions : [],
            isStart : false,
            quizName : "",
            teamName : "",
            err : "",
            loading : false,
            stopTime : "",
            timer : 0
        }
    }

    componentDidMount = () => {
        let quizName = this.props.quizName
        let teamName = this.props.teamName
        this.setState({
            quizName : quizName,
            teamName : teamName
        })
    }

    // start the quiz 
    startQuiz = () => {
        let key = this.checkForKey()
        // console.log(key)
        if (key){
            fetch("https://quiz-app-v1.herokuapp.com/api/client/start-quiz",{
                method : "GET",
                headers : {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': true,
                    'Content-Type': 'application/json',                
                    "auth-key" : key
                }
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if(data.status){
                    if (data.status === "-"){
                        swal("pls wait quiz is not started....")
                    }
                    if (data.status === "started"){
                        swal("quiz has started!....")
                        this.setState({
                            isStart : true,
                            loading : true,
                            stopTime : data.stopTime,
                            timer : data.time
                        })
                        this.getAllQuestions()
                    }
                    if (data.status === "finished"){
                        swal("quiz finished!...")
                    }
                }else{
                    swal("wait!..")
                }
            })
        }else{
            // console.log("not authorized")
            this.setState({
                isStart : false
            })
        }
    }

    // get-all-question 
    getAllQuestions = () => {
        let key = this.checkForKey()
        if(key){
            fetch("https://quiz-app-v1.herokuapp.com/api/client/get-quiz-questions",{
                method : "GET",
                headers : {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': true,
                    'Content-Type': 'application/json',                
                    "auth-key" : key
                }
            })
            .then(res => res.json())
            .then(data =>{
                if (!data.err){
                    // console.log(data)
                    this.setState({
                        allQuestions : [...data]
                    })
                }else{
                    let err = "something went wrong!..."
                    this.setState(err)
                }
            })
        }else{
            let err = "something went wrong!..."
            this.setState(err)
        }
    }

    // check's for auth-key in localstorage 
    checkForKey = () => {   
        let key = localStorage.getItem("auth-key")
        if (key){
            return key
        }else{
            return false
        }
    }

    // set err 
    setError = (err) => {
        this.setState({
            err : err
        })
    }

    // reset err
    resetError = () => {
        this.setState({
            err : ""
        })
    }

    render() {
        if(this.state.isStart=== true && this.state.allQuestions.length >= 1){
            return(
                <div>
                    <Quiz allQuestions={this.state.allQuestions}
                    quizName={this.state.quizName}
                    teamName={this.state.teamName}
                    timer={this.state.timer}/>
                </div>
            )
        }
        return (
            <div className="start-main">
                <div className="img-box">
                        <img src={require("../auth/logo.png")} width="500px"/>
                    </div>
                <div className="box">
                    <h2 className="quiz-name">quiz-name : {this.state.quizName}</h2>
                    <h3 className="team-name">team-name : {this.state.teamName}</h3>
                    <button onClick={this.startQuiz} className="start-btn">
                        start quiz
                    </button>
                </div>
            </div>
        )
    }
}

export default StartPage