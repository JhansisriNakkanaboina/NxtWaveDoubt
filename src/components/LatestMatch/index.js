import './index.css'

const LatestMatch = ({matchDetails}) => {
  const {
    date,
    venue,
    result,
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = matchDetails

  return (
    <div className="latest-match-container">
      <div className="latest-match-details">
        <p className="competing-team-name">{competingTeam}</p>
        <p className="match-date">{date}</p>
        <p className="match-venue">{venue}</p>
        <p className="match-result">{result}</p>
      </div>
      <div className="competing-team">
        <img
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
          className="competing-team-logo"
        />
      </div>
      <div className="additional-details">
        <p>First Innings</p>
        <p>{firstInnings}</p>
        <p>{secondInnings}</p>
        <p>{manOfTheMatch}</p>
        <p>{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
