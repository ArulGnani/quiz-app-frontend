import React, { useState, useEffect } from 'react'
import Timer from './timer'
import Questions from './questions'
import Submit from './submit'
import _404 from '../404-page/404'
import './style/quiz.css'

const Quiz = () => {
    const [auth,setAuth] = useState(false)
    const [allQuestions,setAllQuestions] = useState([]) 
    const [timer,setTimer] = useState(0)
    const [answers,setAnswers] = useState({})
    const [yourAnswers,setYourAnswers] = useState({})
    const [intervalId,setIntervaId] = useState("")
    const [submit,setSubmit] = useState(false)
    const [quizName,setQuizNama] = useState("")
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        let questions = JSON.parse(sessionStorage.getItem("questions"))
        let timer = JSON.parse(sessionStorage.getItem("timer"))
        let key = "key" in sessionStorage
        let state = JSON.parse(sessionStorage.getItem("state"))
        if (questions && timer && key && state) {
            setAuth(true)
            setAllQuestions([...questions])
            setTimer(timer)
            setQuizNama(state.quizName)
        }
    },[])

    // prop method's
    const updateAnswer = (obj) => setAnswers(state => ({...state,...obj}))
    const updateYourAnswers = (obj) => setYourAnswers(state => ({...state,...obj}))
    const stopTimerProp = (id) => clearInterval(id)
    const setIntervaIdProp = (id) => setIntervaId(id)
    const setSubmitProp = () => setSubmit(true)
    const setLoadingProp = () => setLoading(true)
    const resetLoadingProp = () => setLoading(false)
  
    if (!auth) return( <_404/> )

    return (
        <main id="quiz" className={loading ? "fade-bg" : ""}>
            {loading ? <span className="loading"></span> : ""}
            <nav id="quiz-header">
                <Timer 
                    timer={timer}
                    stopTimer={stopTimerProp}
                    intervalId={intervalId}
                    setIntervaId={setIntervaIdProp}
                    submit={setSubmitProp}
                />
                <h2 id="quiz-name">{ quizName }</h2>
                <Submit 
                    answers={answers}
                    yourAnswers={yourAnswers}
                    submit={submit}
                    intervalId={intervalId}
                    stopTimer={stopTimerProp}
                    noQuestions={allQuestions.length}
                    setLoading={setLoadingProp}
                    resetLoading={resetLoadingProp}
                />
            </nav>
            <Questions 
                questions={allQuestions}
                answers={answers}
                yourAnswers={yourAnswers}
                updateAnswer={updateAnswer}
                updateYourAnswers={updateYourAnswers}
            />
        </main>
    )
}

export default Quiz

