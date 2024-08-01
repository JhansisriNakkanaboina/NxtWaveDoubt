import React, {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: ''}

  handleChange = event => {
    this.setState({[event.target.id]: event.target.value})
  }

  handleSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const {history} = this.props // Destructure history from props
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 7})
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    return (
      <div className="login-container">
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            <div className="logo">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </div>
            <div className="name">
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={this.handleChange}
                placeholder="Username"
              />
            </div>
            <div className="pwd">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={this.handleChange}
                placeholder="Password"
              />
            </div>
            <div>
              <button className="login-btn" type="submit">
                Login
              </button>
              {errorMsg && <p className="error-message">*{errorMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
