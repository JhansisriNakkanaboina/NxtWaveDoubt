import React, {Component} from 'react'
import Header from '../Header'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <>
        <Header />
        <main className="notfound-container">
          <div className="notfound-subcontainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
              alt="not found"
            />
            <h1>Page Not Found</h1>
            <p>We are sorry, the page you requested could not be found</p>
          </div>
        </main>
      </>
    )
  }
}

export default NotFound
