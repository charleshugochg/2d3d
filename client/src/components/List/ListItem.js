import React, { Component } from 'react'

import Dialog from '@material-ui/core/Dialog'
import Snackbar from '@material-ui/core/Snackbar';

import './ListItem.css'
import axios from 'axios'

class ListItem extends Component {
    state = {
        open: false
    }

    handleDelete = (event) => {
        this.setState({
            open: false,
            snackOpen: false
        })

        const { item: {key} } = this.props
        axios.post('/delete3d', {
            id: key
        })
        .then(res => {
            this.setState({
                snackOpen: true
            })
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        })
        .catch(err => {
            console.error(err)
        })
    }

    render() {
        const { item: {digit, date}} = this.props
        const { open, snackOpen } = this.state

        return (
            <div>
                <div className="ListItem" onClick={() => this.setState({open:true})}>
                    <p className="date">{date.slice(0, 15)}</p>
                    <h2 className="digit">{digit}</h2>
                </div>
                <Dialog open={open} onClose={() => this.setState({open:false})}>
                    <div className="dialog">
                        <h2 className="digit size36">{digit}</h2>
                        <p className="date">{date.slice(0, 15)}</p>
                        <button className="btn-delete" onClick={this.handleDelete}>Delete</button>
                    </div>
                </Dialog>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={snackOpen}
                    onClose={() => this.setState({snackOpen: false})}
                    ContentProps={{
                    'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Successfully deleted!</span>}
                />
            </div>
        )
    }
}

export default ListItem
