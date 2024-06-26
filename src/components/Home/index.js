import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    teams: [],
    loading: true,
  }

  componentDidMount() {
    this.fetchTeams()
  }

  fetchTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedData = data.teams.map(team => ({
      id: team.id,
      name: team.name,
      teamImageUrl: team.team_image_url,
    }))
    this.setState({teams: updatedData, loading: false})
  }

  render() {
    const {teams, loading} = this.state
    return (
      <div className="back-ground">
        <div className="heading">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="ipl-heading">IPL Dashboard</h1>
        </div>
        {loading ? (
          <div>
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="team-cards-container">
            <ul className="teams-list">
              {teams.map(team => (
                <Link to={`/team-matches/${team.id}`} key={team.id}>
                  <TeamCard team={team} />
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Home
