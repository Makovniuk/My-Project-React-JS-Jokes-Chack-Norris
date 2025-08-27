import JokeCard from "../JokeCard/JokeCard";
import './JokesList.css';

const JokesList = ({ jokesData }) => {

    return (
        <div className="cards-container">
           { jokesData.map((joke) => (<JokeCard key={joke.id} jokesData={joke} />))}
        </div>
    )

}

export default JokesList;
