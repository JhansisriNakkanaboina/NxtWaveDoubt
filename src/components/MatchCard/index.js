import './index.css'

const MatchCard = ({matchDetails}) => {
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails

  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="competing-team-logo"
      />
      <p className="competing-team-name">{competingTeam}</p>
      <p className="match-result">{result}</p>
      <p className={`match-status ${matchStatus.toLowerCase()}`}>
        {matchStatus}
      </p>
    </li>
  )
}

export default MatchCard
