import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import swal from 'sweetalert'
import './style/submit.css'
import { QuizContext } from './quiz'

function Submit () {
    const context = useContext(QuizContext)
    const [noQuestions,setNoQuestions] = useState(0)
    const [logout,setLogout] = useState(false)
 
    useEffect(() => {
        if (context.state.allQuestions) {
            setNoQuestions(context.state.allQuestions.length)
        }
    },[context.state.allQuestions])

    useEffect(() => {
        if (context.state.submit) {
            submit()
        }
    },[context.state.submit])

    const submit = () => {
        context.dipatch({ type : "stopTimer" })
        context.dipatch({ type : "loading" })
        calcPoints()
    }

    const calcPoints = () => {
        let points = 0
        for (let questionId in context.state.yourAnswers) {
            if (context.state.answers[questionId] === 
                context.state.yourAnswers[questionId]) {
                points += 1
            }
        }
        checkForCertificate(points)
    }

    const checkForCertificate = (points) => {
        // console.log(points)
        let minRequirement = Math.floor(noQuestions / 2)
        if (points >= minRequirement) {
            sendPoints(points,true)
        } else { 
            sendPoints(points,false) 
        }
    }

    const sendPoints = (points,certificate) => {
        let key = JSON.parse(sessionStorage.getItem("key"))
        let res = JSON.stringify({"points" : points,"certificate" : false})
        if (key){

            fetch("https://quiz-app-v1.herokuapp.com/api/client/send-result",{
                method : "POST",
                headers : {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': true,
                    'Content-Type': 'application/json',
                    'auth-key' : key
                },
                body : res
            })
            .then(res => res.json())
            .then(data => {
                context.dipatch({ type : "resetLoading" })
                Logout()
                if (data.error) {
                    swal("something went wrong!..","pls contact incharge","error")
                } else {
                    swal("submitted your answers successfully",
                         "contact your incharge.",
                         "success")
                }
            })
            .catch(err => {
                context.dipatch({ type : "resetLoading" })
                Logout()
                swal("something went wrong!..","pls contact incharge","error")
            })
        }
    }

    const Logout = () => {
        sessionStorage.clear()
        setLogout(true)
    }

    if (logout) return ( <Redirect to="/"/> )
    
    return (
        <button onClick={submit} id="submit">
            submit
        </button>
    )
}

export default Submit