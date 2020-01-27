import React, { Component } from 'react'
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

    updatePoints = (event) => {
        event.preventDefault()
        let option = event.target.getAttribute('option')
        let ans = event.target.getAttribute('ans')
        let id = event.target.getAttribute("_id")
        if (option === ans){
            this.points[id] = 1
        }
    }

    // submit-answer 
    submit = (event) =>{    
        event.preventDefault()
        let totalPoints = Object.values(this.points)
        console.log(totalPoints)
        let res = 0
        for(let i=0;i<totalPoints.length;i++){
            res += totalPoints[i]
        }
        this.sendResult(res)
    }

    // send result to db 
    sendResult = (finalPoints) => {
        let points = finalPoints
        let key = localStorage.getItem("auth-key")
        let body = {"points" : points}
        if (key){
            fetch("http://localhost:5000/api/client/send-result",{
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
                    alert(data)
                    this.setState({
                        submit : true
                    })
                }
                if (data.error){
                    alert(data.error)
                }

            })
            .catch(err => {
                if(err){
                    alert("something went wrong!...")
                }
            })
        }
    }


    render() {
        console.log(this.state.allQuestions)
        let questions = this.state.allQuestions.map((q,key) => {
            return(
                <div key={key}>
                    <h3>{q.question.ques}</h3>
                    {q.question.options.map((op,key) => {
                        return(
                            <div key={key}>
                                <input type="radio" 
                                _id={q._id}
                                name="options"
                                value={op.optionAns}
                                option={op.option}
                                ans={q.question.answer}
                                onChange={this.updatePoints}/>{op.optionAns}
                            </div>
                        )
                    })}
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
            <div>
                {questions}     
                <button onClick={this.submit}>submit answers</button>           
            </div>
        )
    }
}

export default Quiz