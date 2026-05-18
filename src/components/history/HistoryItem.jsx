function HistoryItem({ item }) {
  return (
    <div className="history-item">
      <p>
        {item.expression} = {item.result}
      </p>
    </div>
  );
}

export default HistoryItem;