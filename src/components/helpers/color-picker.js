'use strict'

import React from 'react'
import { ChromePicker } from 'react-color'

export default class ColorPicker extends React.Component {
    constructor(props) {
        super(props)
    }

  render() {
    return (
      <div>
          <ChromePicker color={this.props.color} onChange={(color) => {this.props.changeColor(color)}}/>
      </div>
    )
  }
}

