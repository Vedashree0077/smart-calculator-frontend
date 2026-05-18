function FavoriteItem({ item }) {
  return (
    <div className="favorite-item">
      <p>
        {item.expression} = {item.result}
      </p>
    </div>
  );
}

export default FavoriteItem;