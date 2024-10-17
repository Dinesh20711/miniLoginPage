import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {user_id: '', pin: '', isError: false, error: ''}

  onChangeUserId = event => {
    this.setState({user_id: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    console.log(jwtToken)
    Cookies.set('jwtToken', jwtToken, {expires: 30})
    const {history} = this.props
    console.log(history)

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isError: true, error: errorMsg})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {user_id, pin} = this.state
    console.log(user_id)
    const userDetails = {user_id, pin}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const apiUrl = 'https://apis.ccbp.in/ebank/login'

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {user_id, pin, isError, error} = this.state
    console.log(user_id)


    const jwtToken = Cookies.get('jwtToken')
    console.log(jwtToken)
    if(jwtToken !== undefined){
      return <Redirect to='/'/>
    }

    return (
      <div className="login-bg">
        <div className="login-card">
          <img
            className="website-login-image"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <form className="form-container" onSubmit={this.onSubmitLogin}>
            <h1 className="login-heading">Welcome Back!</h1>
            <div className="userInput-container">
              <label className="label-section" htmlFor="userId">
                User ID
              </label>
              <input
                onChange={this.onChangeUserId}
                value={user_id}
                className="input-section"
                type="input"
                id="userId"
              />
            </div>
            <div className="userInput-container">
              <label className="label-section" htmlFor="password">
                PIN
              </label>
              <input
                onChange={this.onChangePin}
                value={pin}
                className="input-section"
                type="password"
                id="password"
              />
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
            {isError ? <p className="errr-mes">{error}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
