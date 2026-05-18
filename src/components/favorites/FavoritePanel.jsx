import FavoriteItem from "./FavoriteItem";

function FavoritePanel({ favorites }) {
  return (
    <div className="favorite-panel">
      <h2>Favorites</h2>

      {favorites.length === 0 ? (
        <p>No favorite expressions</p>
      ) : (
        favorites.map((item, index) => (
          <FavoriteItem key={index} item={item} />
        ))
      )}
    </div>
  );
}

export default FavoritePanel;