import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Elements extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className='change'>
                <div className='inner-box'>
                    <h1>W I P</h1>
                    <h1><FontAwesomeIcon icon="chevron-down" className='icon'/></h1>
                </div>
            </div>
        )
    }
}