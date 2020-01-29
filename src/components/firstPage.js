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
        return (
            <div>
                <Register />
            </div>
        )
    }
}
export default FirstPage