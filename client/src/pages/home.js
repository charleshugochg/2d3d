import React, { Component } from 'react'

import Header from '../components/Header/Header'
import Title from '../components/Title/Title'
import List from '../components/List/List'

class home extends Component {
    render() {
        return (
            <div>
                <Header right={{href: '/add',text: 'Add'}}/>
                <Title text="Recently added" />
                <List />
            </div>
        )
    }
}

export default home
