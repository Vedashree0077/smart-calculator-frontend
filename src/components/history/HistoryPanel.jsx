import HistoryItem from "./HistoryItem";

function HistoryPanel({ history }) {
  return (
    <div className="history-panel">
      <h2>History</h2>

      {history.length === 0 ? (
        <p>No calculations yet</p>
      ) : (
        history.map((item, index) => (
          <HistoryItem key={index} item={item} />
        ))
      )}
    </div>
  );
}

export default HistoryPanel;