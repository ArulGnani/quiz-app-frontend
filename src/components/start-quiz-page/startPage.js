import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import { Redirect } from 'react-router-dom'
import crypto from 'crypto'

import _404 from '../404-page/404'
import './style/start-page.css'

const StartQuizPage = () => {
    const [auth,setAuth] = useState(false)
    const [quizName,setQuizName] = useState("")
    const [teamName,setTeamName] = useState("")
    const [loading,setLoading] = useState(false)
    const [quiz,setQuiz] = useState(false)

    useEffect(() => {
        let state = JSON.parse(sessionStorage.getItem("state"))
        let key = "key" in sessionStorage
        // console.log(state,key) 
        if (state && key) {
            setAuth(true)  
            setQuizName(state.quizName)
            setTeamName(state.teamName)
            swal("your registred successfully!..","proceed by pressing start quiz button...","info")
        }
    },[])

    const startQuiz = async () => {
        let token = JSON.parse(sessionStorage.getItem("key"))
        // console.log(token)
        if (token) {
            setLoading(true)
            await fetch("https://quiz-app-v1.herokuapp.com/api/client/start-quiz",{
                method : "GET",
                headers : {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': true,
                    'Content-Type': 'application/json',                
                    "auth-key" : token
                }
            })
            .then(res => res.json())
            .then(async (data) => {
                // console.log(data)
                let { status, time } = data
                if (status === "-") swal("pls wait quiz is not started....")
                if (status === "finished") swal("quiz finished!...")
                if (status === "started") {
                    sessionStorage.setItem("timer",time)
                    await getAllQuestions(token)
                    setQuiz(true)
                    swal("quiz has started!....")
                }
            })
            .catch(err => {
                if (err) {
                    setLoading(false)
                    swal("something went wrong!","try agin...","error")
                }
            })
        }
    }

    const getAllQuestions = async (token) => {
        // console.log("get all questions...")
        await fetch("https://quiz-app-v1.herokuapp.com/api/client/get-quiz-questions",{
            method : "GET",
            headers : {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Content-Type': 'application/json',                
                "auth-key" : token
            }
        })
        .then(res => res.json())
        .then(data => {
            setLoading(false)
            // console.log(data)
            if (data.err) {
                swal("something went wrong!","reload this page and try again...","error")
            }
            if (!data.err) {
                sessionStorage.setItem("questions",JSON.stringify([...data]))
            }
        })
        .catch(err => {
            if (err){
                setLoading(false)
                swal("something went wrong!","try agin...","error")
            }
        })
    }

    const getRandomId = () => {
        let id = crypto.randomBytes(15).toString("hex")
        return id 
    }

    if (!auth) return ( <_404/> )

    if (quiz) { return ( <Redirect to="/quiz"/> )}

    return (
        <main id="start-main" className={loading ? "fade-bg" : ""}>                
            <section id="box">
                { loading ? <span className="loading"></span> : "" }
                <h2 className="start-header">
                    quiz-name : <b> {quizName} </b>
                </h2> 
                <h2 className="start-header">
                    team-name : <b> {teamName} </b>
                </h2> 
                <button onClick={startQuiz} id="start-btn">  
                    start quiz
                </button>                
            </section>
        </main>
    )
}

export default StartQuizPage