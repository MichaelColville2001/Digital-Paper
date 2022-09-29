import React, { Component } from 'react'
import AdvancedDraw from '../changes/WIP6'
import Shapes from "../changes/shapes"
import Elements from '../changes/WIP'
import Math from "../changes/WIP5"
import SavedElements from "../changes/WIP4"
import One from "../changes/WIP3"
import Two from "../changes/WIP2"
import Three from "../changes/WIP1"

export default class Changes extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return(
            <div className='changes'>
                <Shapes changeModal={this.props.changeModal} modal={this.props.modal}/>
                <AdvancedDraw/>
                <Math/>
                <Elements/>
                <SavedElements/>
                <One/>
                <Two/>
                <Three/>
            </div>
        )
    }
}