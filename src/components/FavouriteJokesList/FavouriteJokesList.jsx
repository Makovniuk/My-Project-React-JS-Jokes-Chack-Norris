import JokeCard from "../JokeCard/JokeCard";

const FavouriteJokesList = ({ favoriteList, toggleFavourite }) => {
  return (
    <div className="favourite-content">
      <h3>My favourite jokes</h3>
      {favoriteList.length > 0 ? (
        favoriteList.map((joke) => (
          <JokeCard
            key={joke.id}
            jokesData={joke}
            isFavourite={true}
            onToggleFavourite={() => toggleFavourite(joke)}
            compact
          />
        ))
      ) : (
        <p>No favourites yet</p>
      )}
    </div>
  );
};
export default FavouriteJokesList;
