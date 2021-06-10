import { Component } from 'react';
import { RiMoonLine } from 'react-icons/ri';
import { RiMoonFill } from 'react-icons/ri';

class Header extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <header className="Header">
        <span className="Logo">Where in the world?</span>
        <span className="Mode" onClick={this.props.toggleMode}> <RiMoonLine /> Dark Mode</span>
      </header>
    )
  }
}

export default Header;