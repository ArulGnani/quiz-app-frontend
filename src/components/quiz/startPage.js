import React, { Component } from 'react'

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
            loading : false
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
        if (key){
            if (this.state.isStart === false){
                this.setState({
                    isStart : true,
                    loading : true
                })
                this.getAllQuestions(key)
            }else{
                alert("pls wait!...")
            }
        }else{
            console.log("not authorized")
            this.setState({
                isStart : false
            })
        }
    }

    // get-all-question 
    getAllQuestions = (key) => {
        let token = key
        if(token){
            fetch("http://localhost:5000/api/client/get-quiz-questions",{
                method : "GET",
                headers : {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': true,
                    'Content-Type': 'application/json',                
                    "auth-key" : token
                }
            })
            .then(res => res.json())
            .then(data =>{
                if (!data.err){
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
                    teamName={this.state.teamName}/>
                </div>
            )
        }
        return (
            <div className="box">
                <h3>quiz-name : {this.state.quizName}</h3>
                <h4>team-name : {this.state.teamName}</h4>
                <button onClick={this.startQuiz}>start quiz</button>
            </div>
        )
    }
}

export default StartPage