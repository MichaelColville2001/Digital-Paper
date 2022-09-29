import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'

import Favitem from "../favitem"

export default class Favbar extends Component {
    constructor(props) {
        super(props)

        this.scale = this.scale.bind(this)
    }

    scale(file) {
        const list = []
        for (let i = 0; i < Math.floor((window.innerWidth - 420) / 60); i++) {
            list.push(file)
        }
        return (list)
    }

    render() {
        return (
            <div className='favbar'>
                <div className='go-back fav-item'>
                    <div className='inner-fav-item' onClick={
                        () => this.props.revert()
                    }><FontAwesomeIcon icon="backward" className='icon' /></div>
                </div>
                <div className='settings fav-item'>
                    <div className='inner-fav-item' onClick={() => {this.props.change("settings"), this.props.secondaryChange("settings"), this.props.changeModal("settings")}}><FontAwesomeIcon icon="gear" className='icon' /></div>
                </div>
                <div className='text fav-item' onClick={() => {this.props.change("text"), this.props.secondaryChange("text"), this.props.changeModal("text")}}>
                    <div className='inner-fav-item' style={{ color: `rgba(${this.props.color.r},${this.props.color.g},${this.props.color.b},${this.props.color.a})` }}><p className='icon'>T</p></div>
                </div>

                {this.scale(<Favitem />)}

                <div className='color-picker fav-item'>
                    <div className='inner-fav-item' onClick={() => this.props.toggleColorPicker()}><FontAwesomeIcon icon="palette" className='icon' style={{ color: `rgba(${this.props.color.r},${this.props.color.g},${this.props.color.b},${this.props.color.a})` }} /></div>
                </div>
                <div className='noChange fav-item'>
                    <div className='inner-fav-item' onClick={() => { this.props.change(""), this.props.secondaryChange("") }}><FontAwesomeIcon icon="arrow-pointer" className='icon' /></div>
                </div>
                <div className='save fav-item'>
                    <div className='inner-fav-item' onClick={() => this.props.save()}><FontAwesomeIcon icon="floppy-disk" className='icon' style={{ color: `rgba(${this.props.color.r},${this.props.color.g},${this.props.color.b},${this.props.color.a})` }} /></div>
                </div>
                <div className='go-forward fav-item' onClick={
                    () => this.props.unRevert()
                }>
                    <div className='inner-fav-item'><FontAwesomeIcon icon="forward" className='icon' /></div>
                </div>
            </div>
        )
    }
}