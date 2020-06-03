import React,{ Component } from 'react'
import swal from 'sweetalert'
import './style/timer.css'

class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time : 0,
            timer : "00:00"
        }
    }

    componentDidMount () {
        if (this.props.timer) {
            this.setState({ time : this.props.timer })
        }
        this.startTimer()
    }

    startTimer = () => {
        var quizTimer = setInterval(() => {
            if (this.state.time !== 0) {
                this.setState({time : this.state.time - 1})      
                let min = Math.floor(this.state.time / 60)
                let sec = this.state.time - min * 60
                min = min < 10 ? "0" + min : min
                sec = sec < 10 ? "0" + sec : sec
                this.setState({ timer : `${min}:${sec}`})
            } else {
                this.stopTimer()
                swal("your out of time!...")
                this.props.submit()
            }
            
        },1000)
        this.props.setIntervaId(quizTimer)
    }

    stopTimer () {
        this.props.stopTimer(this.props.intervalId)
    }

    render() {
        return (
            <div id="timer-comp">
                <h2 id="timer">{ this.state.timer }</h2>
            </div>
        )
    }
}

export default Timer

