import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {FaHome, FaBriefcase, FaSignOutAlt} from 'react-icons/fa'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {
    isScreenSmall: window.innerWidth < 768,
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateMedia)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMedia)
  }

  updateMedia = () => {
    this.setState({isScreenSmall: window.innerWidth < 768})
  }

  navigateTo = path => {
    const {history} = this.props
    history.push(path)
  }

  onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {isScreenSmall} = this.state

    return (
      <header className="header">
        {isScreenSmall ? (
          <div className="header-small">
            <div
              className="logo-container"
              onClick={() => this.navigateTo('/')}
              role="button"
              tabIndex="0"
              onKeyDown={e => e.key === 'Enter' && this.navigateTo('/')}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="logo"
              />
            </div>
            <nav className="nav-small" role="navigation">
              <ul className="nav-list">
                <li
                  className="nav-item"
                  onClick={() => this.navigateTo('/')}
                  role="button"
                  tabIndex="0"
                  onKeyDown={e => e.key === 'Enter' && this.navigateTo('/')}
                >
                  <FaHome className="nav-icon" />
                </li>
                <li
                  className="nav-item"
                  onClick={() => this.navigateTo('/jobs')}
                  role="button"
                  tabIndex="0"
                  onKeyDown={e => e.key === 'Enter' && this.navigateTo('/jobs')}
                >
                  <FaBriefcase className="nav-icon" />
                </li>
                <li
                  className="nav-item"
                  onClick={this.onLogout}
                  role="button"
                  tabIndex="0"
                  onKeyDown={e => e.key === 'Enter' && this.onLogout()}
                >
                  <FaSignOutAlt className="nav-icon" />
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <div className="header-large">
            <div
              className="logo-container"
              onClick={() => this.navigateTo('/')}
              role="button"
              tabIndex="0"
              onKeyDown={e => e.key === 'Enter' && this.navigateTo('/')}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="logo"
              />
            </div>
            <nav className="nav-large" role="navigation">
              <ul className="nav-list">
                <li
                  className="nav-item"
                  onClick={() => this.navigateTo('/')}
                  role="button"
                  tabIndex="0"
                  onKeyDown={e => e.key === 'Enter' && this.navigateTo('/')}
                >
                  Home
                </li>
                <li
                  className="nav-item"
                  onClick={() => this.navigateTo('/jobs')}
                  role="button"
                  tabIndex="0"
                  onKeyDown={e => e.key === 'Enter' && this.navigateTo('/jobs')}
                >
                  Jobs
                </li>
              </ul>
            </nav>
            <div className="logout-container">
              <button className="logout-button" onClick={this.onLogout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </header>
    )
  }
}

export default withRouter(Header)
