import { Component } from 'react';
import { RiMoonLine } from 'react-icons/ri';

class Header extends Component {
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