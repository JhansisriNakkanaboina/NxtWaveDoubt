import './index.css'

const TeamCard = ({team}) => {
  const {name, teamImageUrl} = team
  return (
    <li className="team-card">
      <img src={teamImageUrl} alt={`${name} logo`} className="team-logo" />
      <p className="team-name">{name}</p>
    </li>
  )
}

export default TeamCard
