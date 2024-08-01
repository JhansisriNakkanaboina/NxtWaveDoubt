import React, {Component} from 'react'
import Header from '../Header'
import './index.css'

class Home extends Component {
  navigateToJobs = () => {
    const {history} = this.props
    history.push('/jobs')
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home-content">
            <h1 className="home-title">Find The Job That Fits Your Life</h1>
            <p className="home-description">
              Millions of people are searching for jobs, salary information, and
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <button className="find-jobs-button" onClick={this.navigateToJobs}>
              Find Jobs
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default Home
