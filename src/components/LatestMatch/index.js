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
        <h1 className="competing-team-name">{competingTeam}</h1>
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
        <p>First Innings: {firstInnings}</p>
        <p>Second Innings: {secondInnings}</p>
        <p>Man of the Match: {manOfTheMatch}</p>
        <p>Umpires: {umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
