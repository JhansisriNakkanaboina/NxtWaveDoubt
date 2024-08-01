import React, {Component} from 'react'
import {FiSearch} from 'react-icons/fi'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import {FaBriefcase, FaMapMarkerAlt} from 'react-icons/fa'
import Header from '../Header'
import Loader from 'react-loader-spinner'
import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

class Jobs extends Component {
  state = {
    profile: {profileImageUrl: '', name: '', shortBio: ''},
    jobs: [],
    employmentType: [],
    minimumPackage: '',
    searchQuery: '',
    isLoadingProfile: true,
    isLoadingJobs: true,
    profileError: '',
    jobsError: '',
  }

  componentDidMount() {
    this.fetchProfileData()
    this.fetchJobsData()
  }

  fetchProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    if (!jwtToken) {
      this.props.history.replace('/login')
      return
    }

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const profile = data.profile_details
        this.setState({
          profile: {
            profileImageUrl: profile.profile_image_url,
            name: profile.name,
            shortBio: profile.short_bio,
          },
          isLoadingProfile: false,
        })
      } else {
        this.setState({
          profileError: 'Failed to fetch profile data',
          isLoadingProfile: false,
        })
      }
    } catch (error) {
      this.setState({profileError: error.message, isLoadingProfile: false})
    }
  }

  fetchJobsData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    if (!jwtToken) {
      this.props.history.replace('/login')
      return
    }

    const {employmentType, minimumPackage, searchQuery} = this.state
    const employmentTypeQuery = employmentType.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${minimumPackage}&search=${searchQuery}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        this.setState({jobs: data.jobs, isLoadingJobs: false})
      } else {
        this.setState({
          jobsError: 'Failed to fetch jobs data',
          isLoadingJobs: false,
        })
      }
    } catch (error) {
      this.setState({jobsError: error.message, isLoadingJobs: false})
    }
  }

  handleEmploymentTypeChange = event => {
    const {id, checked} = event.target
    this.setState(
      prevState => {
        const updatedEmploymentType = checked
          ? [...prevState.employmentType, id]
          : prevState.employmentType.filter(type => type !== id)
        return {employmentType: updatedEmploymentType}
      },
      () => this.fetchJobsData(), // Fetch jobs after updating employment type
    )
  }

  handleSalaryRangeChange = event => {
    this.setState({minimumPackage: event.target.value}, this.fetchJobsData)
  }

  handleSearchChange = event => {
    this.setState({searchQuery: event.target.value})
  }

  handleSearchSubmit = event => {
    event.preventDefault()
    this.fetchJobsData()
  }

  handleJobClick = jobId => {
    this.props.history.push(`/jobs/${jobId}`)
  }

  handleRetryProfile = () => {
    this.setState(
      {isLoadingProfile: true, profileError: ''},
      this.fetchProfileData,
    )
  }

  handleRetryJobs = () => {
    this.setState({isLoadingJobs: true, jobsError: ''}, this.fetchJobsData)
  }

  render() {
    const {
      profile,
      isLoadingProfile,
      profileError,
      jobs,
      isLoadingJobs,
      jobsError,
    } = this.state

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="filters-section">
            <div className="profile">
              {isLoadingProfile ? (
                <div className="loader-container" data-testid="loader">
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height="50"
                    width="50"
                  />
                </div>
              ) : profileError ? (
                <div className="error-container">
                  <div className="error-subcontainer">
                    <button
                      onClick={this.handleRetryProfile}
                      className="retry-button"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              ) : (
                <div className="profile">
                  <img src={profile.profileImageUrl} alt="profile" />
                  <h1>{profile.name}</h1>
                  <p>{profile.shortBio}</p>
                </div>
              )}
            </div>
            <hr />
            <div className="filter-group">
              <h2>Type of Employment</h2>
              <ul>
                {employmentTypesList.map(type => (
                  <li key={type.employmentTypeId} className="filter-option">
                    <input
                      type="checkbox"
                      id={type.employmentTypeId}
                      onChange={this.handleEmploymentTypeChange}
                    />
                    <label htmlFor={type.employmentTypeId}>{type.label}</label>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div className="filter-group">
              <h2>Salary Range</h2>
              <ul>
                {salaryRangesList.map(range => (
                  <li key={range.salaryRangeId} className="filter-option">
                    <input
                      type="radio"
                      id={range.salaryRangeId}
                      name="salaryRange"
                      value={range.salaryRangeId}
                      onChange={this.handleSalaryRangeChange}
                    />
                    <label htmlFor={range.salaryRangeId}>{range.label}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="search-section">
            <form
              onSubmit={this.handleSearchSubmit}
              className="search-input-container1"
            >
              <div className="search-input-container2">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.handleSearchChange}
                />
                <button type="submit" data-testid="searchButton">
                  <FiSearch className="search-icon" />
                </button>
              </div>
            </form>
            {isLoadingJobs ? (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : jobsError ? (
              <div className="error-container">
                <div className="error-subcontainer">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                    alt="no jobs"
                  />
                  <h1>Oops! Something Went Wrong</h1>
                  <p>We cannot seem to find the page you are looking for</p>
                  <button
                    onClick={this.handleRetryJobs}
                    className="retry-button"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : jobs.length > 0 ? (
              <ul className="unordered-list">
                {jobs.map(job => (
                  <li key={job.id} className="job-list-item">
                    <button
                      type="button"
                      onClick={() => this.handleJobClick(job.id)}
                      className="job-button"
                    >
                      <div className="job-details">
                        <div className="job-left-section">
                          <img
                            src={job.company_logo_url}
                            alt="company logo"
                            className="company-logo"
                          />
                          <div className="job-info">
                            <h3 className="job-title">{job.title}</h3>
                            <p className="job-company">{job.company_name}</p>
                            <div className="job-location-employment">
                              <div className="display-row">
                                <FaMapMarkerAlt />
                                <p className="job-location">{job.location}</p>
                              </div>
                              <div className="display-row">
                                <FaBriefcase />
                                <p className="job-employment-type">
                                  {job.employment_type}
                                </p>
                              </div>
                              <div className="display-row">
                                ⭐<p className="job-rating">{job.rating}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="job-right-section">
                          <p className="job-package">{job.package_per_annum}</p>
                          <hr className="separator" />
                          <h1>Description</h1>
                          <p className="job-description">
                            {job.job_description}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-jobs">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                  alt="no jobs"
                />
                <h1>No Jobs Found</h1>
                <p>We could not find any jobs. Try other filters</p>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Jobs)
