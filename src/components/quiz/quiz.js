import React, { Component } from 'react'
import swal from 'sweetalert'
// component 
import FirstPage from '../firstPage'

class Quiz extends Component {
    constructor(props){
        super(props)
        this.state = {
            allQuestions : [],
            teamName : "",
            quizName : "",
            startTime : "",
            endTime : "",
            finalPoints : 0,
            points : {},
            submit : false
        }
        this.points = {}
    }

    // get's all the prop's from start component 
    componentDidMount = () => {
        let questions = this.props.allQuestions
        let quizName = this.props.quizName
        let teamName = this.props.teamName
        if (questions && quizName && teamName){
            this.setState({
                allQuestions : questions,
                quizName : quizName,
                teamName : teamName
            })
        }
    }

    // update's the point object 
    updatePoints = (event) => {
        event.preventDefault()
        let option = event.target.getAttribute('option')
        let ans = event.target.getAttribute('ans')
        let id = event.target.getAttribute("_id")
        if (option === ans){
            this.points[id] = 1
        }else{
            this.points[id] = 0
        }
    }

    // submit-answer 
    submit = (event) =>{    
        event.preventDefault()
        let totalPoints = Object.values(this.points)
        // console.log('points',totalPoints)
        let res = 0
        for(let i=0;i<totalPoints.length;i++){
            res += totalPoints[i]
        }
        this.sendResult(res)  
    }

    // send result to db 
    sendResult = (res) => {
        let points = res
        console.log('send points',points)
        let key = localStorage.getItem("auth-key")
        let body = {"points" : points}
        if (key){
            fetch("https://quiz-app-v1.herokuapp.com/api/client/send-result",{
                method : "POST",
                headers : {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': true,
                    'Content-Type': 'application/json',
                    'auth-key' : key
                },
                body : JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => {
                if (data.msg){
                    swal(data.msg,"your result has been submited","success")
                    // alert(data.msg)
                    this.setState({
                        submit : true
                    })
                }
                if (data.error){
                    swal(data.error,"don't submit again!..","warning")
                    alert(data.error)
                }
                this.deleteKey()
            })
            .catch(err => {
                if(err){
                    swal("something went wrong!..","pls inform the incharge","error")
                    // alert("something went wrong!...")
                }
            })
        }
    }

    // delete auth-key from localstorage 
    deleteKey = () =>{
        if (this.state.submit){
            let key = localStorage.getItem("auth-key")
            if(key){
                localStorage.removeItem("auth-key")
            }else{
                localStorage.removeItem("auth-key")
            }
        }
    }

    render() {
        console.log(this.state.allQuestions)
        let questions = this.state.allQuestions.map((q,key) => {
            return(
                <div key={key} className="question-container">
                    <h3 className="question">{key + 1} : {q.question.ques}</h3>
                    <form className="options">
                    {q.question.options.map((op,key) => {
                        return(
                            <React.Fragment>
                                <input type="radio" 
                                key={key}
                                _id={q._id}
                                name="options"
                                value={op.optionAns}
                                option={op.option}
                                ans={q.question.answer}
                                onChange={this.updatePoints}
                                className="option"/><span className="option-ans">{op.optionAns}</span>
                            </React.Fragment>
                        )
                    })}
                    </form>
                </div>
            )
        })

        if(this.state.submit){
            return(
                <div>
                    <FirstPage submit={this.state.submit}/>
                </div>
            )
        }

        return (
            <div className="main-quiz-container">
                <div className="quiz-box">
                    {questions}     
                </div>
                <div className="timer">
                    <h1>00:40:10</h1>
                </div>
                <div className="submit-container">
                    <button onClick={this.submit} className="submit-btn">
                        submit answers
                    </button>
                </div>           
            </div>
        )
    }
}

export default Quiz