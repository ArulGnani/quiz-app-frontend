import React, { useContext, useEffect, useState } from 'react'
import { QuizContext } from './quiz'
import './style/questions.css'

function Questions () {
    const context = useContext(QuizContext)
    const [questions,setQuestions] = useState([])

    useEffect(() => {
        setQuestions([...questions, ...context.state.allQuestions])
    },[context.state.allQuestions])

    useEffect(() => mapAnswers() ,[questions])

    const mapAnswers = () => {
        if (questions.length !== 0) {
            questions.forEach(ques => {
                if (!context.state.answers[ques._id]) {
                    context.dipatch({
                        type : "updateAnswers",
                        payload : {
                            answer : {[ques._id] : ques.question.answer}
                        }
                    })
                }
            })
        } 
    }

    const updateYoutAnswer = (e) => {
        let questionId = e.target.id 
        let option = e.target.getAttribute("option")
        context.dipatch({
            type : "updateYourAnswers",
            payload : {
                answer : {[questionId] : option}
            }
        })
    }

    return (
        <section id="question-comp">
            { 
            questions.map(({ question, _id }, quesNo) => {
                return (
                    <div key={_id} id="container">
                        <h2 id="question">
                            {quesNo + 1}. { question.ques }
                        </h2>
                        <form id="options">
                        { question.options.map(option => {
                            return (
                            <div key={option.id} id="option">
                                <input
                                    type="radio"
                                    name="option" 
                                    id={_id}
                                    option={option.option}
                                    onClick={(e) => updateYoutAnswer(e)}
                                />
                                <span id="option-answer">
                                    {option.option} . {option.optionAns}
                                </span><br/>
                            </div>
                            )
                        })} 
                        </form>
                    </div>
                )
            })
        }
    </section>
    )
}

export default Questions