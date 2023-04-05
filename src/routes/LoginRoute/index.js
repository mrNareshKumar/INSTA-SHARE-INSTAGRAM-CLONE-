import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input_label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          value={username}
          placeholder="Username"
          onChange={this.onChangeUsername}
          className="input_field"
        />
      </>
    )
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input_label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={this.onChangePassword}
          className="input_field"
        />
      </>
    )
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="login_container">
        <img
          src="https://res.cloudinary.com/mrnaresh/image/upload/v1677675291/Insta_Share/Login%20Page/Insta_Share_Landing_Page_Image/Layer_2_2x_ofxgpv.png"
          alt="website login"
          className="Insta_Share_Landing_Page_Image"
        />
        <form className="form_container" onSubmit={this.submitForm}>
          <img
            src="https://res.cloudinary.com/mrnaresh/image/upload/v1677657960/Insta_Share/Login%20Page/Insta_Share_Logo/Standard_Collection_8_3x_wl4lmx.png"
            alt="website logo"
            className="website_logo"
          />
          <h1 className="website_title">Insta Share</h1>
          <div className="input_container">{this.renderUsernameField()}</div>
          <div className="input_container">{this.renderPasswordField()}</div>
          {showSubmitError && <p className="error_Msg">{errorMsg}</p>}
          <button type="submit" className="login_button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginRoute
