import './JokeCard.css';

const JokeCard = ({ jokesData }) => {

return (
<div className="jokes-card">
<h5>{jokesData.value}</h5>
</div>
)
};

export default JokeCard;