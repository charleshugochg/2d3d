import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
    render() {
        const {left, right} = this.props

        return (
            <header className="header">
                <div className="box">
                    { left &&
                        <a href={left.href} className="btn-menu">{left.text}</a>
                    }
                </div>
                <div className="box">
                    <h1 className="brand">2d3d</h1>
                </div>
                <div className="box">
                    { right &&
                        <a href={right.href} className="btn-menu">{right.text}</a>
                    }
                </div>
            </header>
        )
    }
}

export default Header
