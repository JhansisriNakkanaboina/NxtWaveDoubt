import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {FaBriefcase, FaMapMarkerAlt, FaRegClock} from 'react-icons/fa'
import {FiExternalLink} from 'react-icons/fi'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

class JobDetails extends Component {
  state = {
    jobDetails: null,
    isLoading: true,
    error: '',
  }

  async componentDidMount() {
    this.fetchJobDetails()
  }

  fetchJobDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    if (!jwtToken) {
      const {history} = this.props
      history.replace('/login')
      return
    }

    const {match} = this.props
    const {id} = match.params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        this.setState({
          jobDetails: {
            companyLogoUrl: data.job_details.company_logo_url,
            companyName: data.job_details.company_name,
            employmentType: data.job_details.employment_type,
            jobDescription: data.job_details.job_description,
            location: data.job_details.location,
            packagePerAnnum: data.job_details.package_per_annum,
            rating: data.job_details.rating,
            title: data.job_details.title,
            postedTime: data.job_details.posted_time,
            companyWebsiteUrl: data.job_details.company_website_url,
            skills: data.job_details.skills,
            lifeAtCompany: {
              description: data.job_details.life_at_company.description,
              imageUrl: data.job_details.life_at_company.image_url,
            },
          },
          isLoading: false,
        })
      } else {
        this.setState({
          error: 'Failed to fetch job details',
          isLoading: false,
        })
      }
    } catch (error) {
      this.setState({
        error: error.message,
        isLoading: false,
      })
    }
  }

  handleRetry = () => {
    this.setState({isLoading: true, error: ''}, this.fetchJobDetails)
  }

  renderContent = () => {
    const {jobDetails, error} = this.state
    if (error) {
      return (
        <div className="error-container">
          <div className="error-subcontainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for</p>
            <button onClick={this.handleRetry} className="retry-button">
              Retry
            </button>
          </div>
        </div>
      )
    }

    if (jobDetails) {
      return (
        <div className="job-details-content">
          <div className="job-details-header">
            <img
              src={jobDetails.companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="job-details-info">
              <h1 className="job-title">{jobDetails.title}</h1>
              <p className="job-company">{jobDetails.companyName}</p>
              <div className="job-details-location-employment">
                <div className="display-row">
                  <FaMapMarkerAlt />
                  <p className="job-location">{jobDetails.location}</p>
                </div>
                <div className="display-row">
                  <FaBriefcase />
                  <p className="job-employment-type">
                    {jobDetails.employmentType}
                  </p>
                </div>
                <div className="display-row">
                  <FaRegClock />
                  <p className="job-posted-time">
                    Posted {jobDetails.postedTime}
                  </p>
                </div>
                <div className="display-row">
                  ⭐<p className="job-rating">{jobDetails.rating}</p>
                </div>
              </div>
              <p className="job-package">{jobDetails.packagePerAnnum}</p>
            </div>
          </div>
          <hr className="separator" />
          <div className="description-visit-container">
            <h2 className="job-description-title">Description</h2>
            <a
              href={jobDetails.companyWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="company-website-link"
            >
              Visit <FiExternalLink className="visit-icon" />
            </a>
          </div>
          <p className="job-description">{jobDetails.jobDescription}</p>
          <h2 className="job-skills-title">Skills</h2>
          <ul className="skills-list">
            {jobDetails.skills.map(skill => (
              <li key={skill.name} className="skill-item">
                <img
                  src={skill.image_url}
                  alt={skill.name}
                  className="skill-icon"
                />
                <p className="skill-name">{skill.name}</p>
              </li>
            ))}
          </ul>
          <h2 className="job-life-title">Life at Company</h2>
          <div className="life-at-company">
            <p className="life-description">
              {jobDetails.lifeAtCompany.description}
            </p>
            <img
              src={jobDetails.lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-image"
            />
          </div>
        </div>
      )
    }

    return <p className="no-job-found">Job not found</p>
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        <Header />
        <div className="job-details-container">
          {isLoading ? (
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
          ) : (
            this.renderContent()
          )}
        </div>
      </>
    )
  }
}

JobDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default withRouter(JobDetails)
