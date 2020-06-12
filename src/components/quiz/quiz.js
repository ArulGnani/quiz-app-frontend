import React, { useEffect, useReducer } from 'react'
import Timer from './timer'
import Questions from './questions'
import Submit from './submit'
import _404 from '../404-page/404'
import './style/quiz.css'

const Quiz = () => {
    const [state, dipatch] = useReducer(reducer, initState)

    useEffect(() => {
        let questions = JSON.parse(sessionStorage.getItem("questions"))
        let time = JSON.parse(sessionStorage.getItem("timer"))
        let key = "key" in sessionStorage
        let { quizName } = JSON.parse(sessionStorage.getItem("state"))
        if (questions && time && key && state) {
            dipatch({ 
                type : "componentMounted",
                payload : { questions, time, quizName }
            })
        }
    },[])


    if (!state.auth) return( <_404/> )

    return (
        <QuizContext.Provider value={{state, dipatch}}>
            <main id="quiz" className={state.loading ? "fade-bg" : ""}>
                {state.loading ? <span className="loading"></span> : ""}
                <nav id="quiz-header">
                    <Timer />
                    <h2 id="quiz-name">{ state.quizName }</h2>
                    <Submit />
                </nav>
                <Questions />
            </main>
        </QuizContext.Provider>
    )
}

export default Quiz

const initState = {
    auth : false,
    loading : false,
    quizName : "",
    allQuestions : [],
    answers : {},
    yourAnswers : {},
    noOfQuestions : 0,
    submit : false ,
    time : 0,
    stoptimer : false
}

const reducer = (state, action) => {
    switch (action.type) {
        case "loading":
            return { ...state, loading : true }
        case "resetLoading": 
            return { ...state, loading : false }
        case "componentMounted":
            return { 
                ...state, 
                auth : true,
                allQuestions : action.payload.questions,
                time : action.payload.time,
                quizName : action.payload.quizName
            }
        case "updateYourAnswers":
            return {
                ...state,
                yourAnswers : { ...state.yourAnswers, ...action.payload.answer }
            }
        case "updateAnswers":
            return {
                ...state,
                answers : { ...state.answers, ...action.payload.answer }
            }
        case "submit":
            return { ...state, submit : true }
        case "stopTimer":
            return { ...state, stopTimer : true }
        default:
            return state
    }
}

export const QuizContext = React.createContext()