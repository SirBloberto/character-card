import React, { Component } from 'react'

class Main extends Component {

  render() {
  return (
    <form action='/create'>
      <input type="submit" value="Create New Character Card" /><br />
    </form>
  );
}
}

export default Main;