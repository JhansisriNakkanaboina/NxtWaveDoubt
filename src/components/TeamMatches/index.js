import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    latestMatch: null,
    recentMatches: [],
    loading: true,
  }

  componentDidMount() {
    this.fetchTeamMatches()
  }

  fetchTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    if (!id) {
      console.error('No team ID found in route parameters')
      return
    }

    try {
      const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch team matches')
      }
      const data = await response.json()

      const updatedLatestMatch = {
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        result: data.latest_match_details.result,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        umpires: data.latest_match_details.umpires,
      }

      const updatedRecentMatches = data.recent_matches.map(match => ({
        id: match.id,
        competingTeam: match.competing_team,
        competingTeamLogo: match.competing_team_logo,
        result: match.result,
        matchStatus: match.match_status,
      }))

      this.setState({
        teamBannerUrl: data.team_banner_url,
        latestMatch: updatedLatestMatch,
        recentMatches: updatedRecentMatches,
        loading: false,
      })
    } catch (error) {
      console.error('Error fetching team matches:', error)
      this.setState({loading: false})
    }
  }

  render() {
    const {teamBannerUrl, latestMatch, recentMatches, loading} = this.state

    // Ensure there are at least two items in the list
    const minimumMatches = [...recentMatches]
    while (minimumMatches.length < 2) {
      minimumMatches.push({
        id: `dummy-${minimumMatches.length}`,
        competingTeam: '',
        competingTeamLogo: '',
        result: '',
        matchStatus: '',
      })
    }

    return (
      <div className="team-matches-container">
        {loading ? (
          <div className="loader-container" data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />
            <h1 className="latest-matches-heading">Latest Matches</h1>
            {latestMatch && <LatestMatch matchDetails={latestMatch} />}
            <ul className="recent-matches-list">
              {minimumMatches.map(match => (
                <MatchCard key={match.id} matchDetails={match} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default withRouter(TeamMatches)
