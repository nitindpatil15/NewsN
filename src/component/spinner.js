import React, { Component } from 'react'
import loading from './loading.gif'

export class spinner extends Component {
  render() {
    return (
      <div className='d-flex justify-content-center'>
        <img src={loading} alt="" width={80} height={80} />
      </div>
    )
  }
}

export default spinner
