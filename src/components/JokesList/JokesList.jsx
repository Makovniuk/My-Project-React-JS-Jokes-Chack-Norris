import JokeCard from "../JokeCard/JokeCard";
import './JokesList.css';

const JokesList = ({ jokesData, favoriteList, onToggleFavourite }) => {

    return (
        <>
        <h3 style={{ textAlign: 'center' }}>Finde total jokes: { jokesData.total }</h3>
        <div className="cards-container">
           { jokesData.result.map((joke) => (
           <JokeCard
           key={joke.id}
           jokesData={joke}
           isFavourite={favoriteList.some(f => f.id === joke.id)}
           onToggleFavourite={() => onToggleFavourite(joke)}
            />))}
        </div>
        </>
    )

}

export default JokesList;
