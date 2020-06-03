import React,{ Component } from 'react'
import './style/questions.css'

class QuestionsComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questions : []
        }
    }

    componentDidMount () {
        // console.log(this.props)
        if (this.props.questions) {
            this.setState({ questions : [...this.props.questions] })
            this.mapAnswersToQuestion(this.props.questions)
        }
    }

    mapAnswersToQuestion (questions) {
        if (questions.length !== 0) {
            questions.forEach(ques => {
                if (!this.props.answers[ques._id]) {
                    this.props.updateAnswer({[ques._id] : ques.question.answer})
                }
            })
        }
    }

    updateYoutAnswer (e) {
        let questionId = e.target.id 
        let option = e.target.getAttribute("option")
        this.props.updateYourAnswers({[questionId] : option})
    }

    render() {
        return (
            <section id="question-comp">
             {
                this.state.questions.map(({ question, _id },quesNo) => {
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
                                        key={option.id}
                                        type="radio"
                                        name="option" 
                                        id={_id}
                                        option={option.option}
                                        onClick={(e) => this.updateYoutAnswer(e)}
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
}

export default QuestionsComp
