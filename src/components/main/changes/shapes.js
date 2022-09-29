import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class BasicDraw extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='change'>
                <div className='inner-box' onClick={() => {
                    this.props.changeModal("shapes")
                }}>
                    <h1>Stuff</h1>
                    <h1><FontAwesomeIcon icon="chevron-down" className='icon'/></h1>
                </div>
            </div>
        )
    }
}