import React, { Component } from 'react'
import './Form.css'
import axios from 'axios'

class Form extends Component {
    state = {
        error: null,
        message: null,
        digit: '',
        dayago: ''
    }

    handleSubmit = (event) => {
        const {digit, dayago} = this.state

        event.preventDefault()
        axios.post(`/add3d`, {
            digit,
            dayago
        })
        .then((res) => {
            this.setState({
                message: res.data.message
            })
        })
        .catch(err => {
            console.error(err);
            err.response && this.setState({
                error: err.response.data.error
            })
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render() {
        const {digit, dayago, error, message} = this.state

        return (
            <form className="Form">
                {error &&
                    <p className="error">{error}</p>
                }
                {message &&
                    <p className="message">{message}</p>
                }
                <div className="form-group">
                    <label>3D digit</label>
                    <input name="digit" value={digit} id="digit" placeholder="Enter your digit" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label>How many days ago</label>
                    <input name="dayago" value={dayago} id="day" placeholder="Enter your day" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <button className="submit" onClick={this.handleSubmit}>Submit</button>
                </div>
            </form>
        )
    }
}

export default Form
