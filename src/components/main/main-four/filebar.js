import React, { Component } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import File from "../file"


export default class Filebar extends Component {
    constructor(props) {
        super(props)     

        this.scale = this.scale.bind(this)
    }

    scale(file) {
        const list = []
        for (let i = 0; i < Math.floor((window.innerWidth - 60) / 200); i++) {
            list.push(file)
        }
        return (list)
    }

    render() {
        return (
            <div className='filebar'>
                <a className='file-browser' onClick={() => this.props.changeModal("file_browser")}>
                    <FontAwesomeIcon icon="file" className='icon' />
                </a>
                <div className='file-rows'>
                    <div className='files'>
                        {this.scale(<File/>)}
                    </div>
                    <div className='files'>
                        {this.scale(<File/>)}
                    </div>
                </div>
            </div>
        )
    }
}