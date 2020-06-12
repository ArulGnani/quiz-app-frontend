import React, { useContext, useRef, useEffect, useState } from 'react'
import { QuizContext } from './quiz'
import swal from 'sweetalert'
import './style/timer.css'

function Timer() {
    const context = useContext(QuizContext)
    const [timer,setTimer] = useState("")
    const [time,setTime] = useState(0)
    const [intervalId,setIntervalId] = useState("")
    const timeRef = useRef()
    timeRef.current = time

    useEffect(() => {
        setTime(context.state.time)
        startTimer()
    }, [])

    useEffect(() => { 
        if (context.state.stopTimer) { 
            stopTimer() 
        } 
    },[context.state.stopTimer])

    const startTimer = () => {
        let quizTimer = setInterval(() => {
            if (timeRef.current !== 0) { 
                setTime(timeRef.current - 1) 
                let min = Math.floor(timeRef.current / 60)
                let sec = timeRef.current - min * 60
                min = min < 10 ? "0" + min : min
                sec = sec < 10 ? "0" + sec : sec
                setTimer(`${min}:${sec}`)
            } else {
                stopTimer()
                swal("your out of time!...")
                context.dipatch({ type : "submit" })
            }
        },1000)
        setIntervalId(quizTimer)
    }

    const stopTimer = () => clearInterval(intervalId)

    return (
        <div id="timer-comp">
            <h2 id="timer">{ timer }</h2>
        </div>
    )
}

export default Timer