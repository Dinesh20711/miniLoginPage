import './index.css'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import {Component} from 'react'

class Home extends Component {
  onClickLogout = () => {
    Cookies.remove('jwtToken')
    const {history} = this.props

    console.log(history)

    history.replace('/login')
  }

  render() {
    const jwtToken = Cookies.get('jwtToken')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="home-bg-container">
        <nav className="nav-items">
          <Link to="/">
            {' '}
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
              alt="website logo"
            />
          </Link>
          <button className="logout-btn" onClick={this.onClickLogout}>
            Logout
          </button>
        </nav>

        <div className='digital-section'>
          <h1>Your Flexibility, Our Excellence</h1>
          <img src='https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png '  alt='digital card'/>
        </div>
      </div>
    )
  }
}

export default Home
