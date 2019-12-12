import React, { Component } from 'react'

import Header from '../components/Header/Header'
import Title from '../components/Title/Title'
import Form from '../components/Form/Form'

class add extends Component {
    render() {
        return (
            <div>
                <Header left={{href: '/', text: 'Recent'}}/>
                <Title text="Add" />
                <Form />
            </div>
        )
    }
}

export default add
