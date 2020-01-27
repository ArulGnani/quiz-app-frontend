import React, { Component } from 'react'

// component 
import Register from './auth/register'

class FirstPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            finished : false
        }
    }

    componentDidMount = () => {
        let submit = this.props.submit
        if(submit){
            this.setState({
                finished : true
            })
        }
    }

    render() {
        if(this.state.finished){
            return(
                <div>
                    <h1>finished</h1>
                </div>
            )
        }


        return (
            <div>
                <Register />
            </div>
        )
    }
}
export default FirstPage