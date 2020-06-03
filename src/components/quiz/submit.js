import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import swal from 'sweetalert'
import './style/submit.css'

const Submit = (props) => {
    const [noQuestions,setNoQuestions] = useState(0)
    const [logout,setLogout] = useState(false)
 
    useEffect(() => { if (props.submit) submit()},[props.submit])
    useEffect(() => { if (props.noQuestions) setNoQuestions(props.noQuestions)},[props.noQuestions])

    const submit = () => {
        props.stopTimer(props.intervalId)
        props.setLoading()
        calcPoints()
    }

    const calcPoints = () => {
        let points = 0
        for (let questionId in props.yourAnswers) {
            if (props.answers[questionId] === props.yourAnswers[questionId]) {
                points += 1
            }
        }
        checkForCertificate(points)
    }

    const checkForCertificate = (points) => {
        console.log(points)
        let minRequirement = Math.floor(noQuestions / 2)
        if (points >= minRequirement) {
            sendPoints(points,true)
        } else { 
            sendPoints(points,false) 
        }
    }

    const sendPoints = (points,certificate) => {
        let key = JSON.parse(sessionStorage.getItem("key"))
        let res = JSON.stringify({"points" : points,"certificate" : certificate})
        if (key){
            fetch("http://localhost:5000/api/client/send-result",{
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
                props.setLoading()
                Logout()
                if (data.error) {
                    swal("something went wrong!..","pls contact incharge","error")
                } else {
                    swal("submitted your answers successfully","check your email for certification...","success")
                }
            })
            .catch(err => {
                console.log(err)
                props.setLoading()
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