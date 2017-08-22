import React, {Component} from 'react'

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      counter: 0
    }
  }

  render() {
    // put onClick on the P tag
    return(
      <div className="favorites-counter">
        <p className="favorites-btn">Favorites <span>{this.state.counter}</span></p>
      </div>
    )

  }
}
