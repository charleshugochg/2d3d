import React, { Component } from 'react'
import axios from 'axios'

import './List.css'

import ListItem from './ListItem'

class List extends Component {
    state = {
        list: []
    }

    componentDidMount(){
        axios.get('/get3ds')
            .then(res => {
                this.setState({
                    list: res.data
                })
            })
            .catch(err => {
                console.error(err);
            })
    }

    render() {
        return (
            <div className="List">
                {this.state.list.map((listItem, index) => {
                    return <ListItem key={index} item={listItem} />
                })}
            </div>
        )
    }
}

export default List
