import './CustomToast.css'
import React, { Component } from 'react'

export default class CustomToast extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showToast: true
        }
        this.type = props.type
        this.title = props.title
        this.message = props.message
        this.duration = props.duration || 3000
        this.position = props.position || 'bottom-left'
    }

    hideCustomToast = () => {
        this.setState({ showToast: false })
    }

    // componentDidMount() {
    //     setTimeout(() => {
    //         this.hideCustomToast()
    //     }, this.duration)
    // }

    render() {
        const className = 'toast-body ' + this.type + ' ' + this.position
        return (
            this.state.showToast && (
                <div className={className}>
                    <div className='toast-icon'>
                        <img
                            className='toast-icon-img'
                            src={this.type === 'success' ? '/assets/check.png'
                                : this.type === 'error' ? '/assets/error.png'
                                    : this.type === 'warning' ? '/assets/warning.png'
                                        : this.type === 'info' ? '/assets/info.png' : '/assets/default.png'}
                            alt='toast-icon'
                            draggable='false' />
                    </div>
                    <span className='toast-title'>{
                        this.title ? this.title
                            : this.type === 'success' ? 'Success!'
                                : this.type === 'error' ? 'Error.'
                                    : this.type === 'warning' ? 'Warning'
                                        : this.type === 'info' ? 'Info' : null

                    }</span>
                    <button
                        className='clear-toast'
                        onClick={() => { this.hideCustomToast() }}>
                        <img
                            className='clear-toast-icon'
                            src={this.type === 'success' ? '/assets/success_cancel.png'
                                : this.type === 'error' ? '/assets/error_cancel.png'
                                    : this.type === 'warning' ? '/assets/warning_cancel.png'
                                        : this.type === 'info' ? '/assets/info_cancel.png' : '/assets/default_cancel.png'
                            }
                            alt='clear-toast'
                            onClick={() => { this.hideCustomToast() }}
                        />
                    </button>
                </div>
            )
        )
    }
}
