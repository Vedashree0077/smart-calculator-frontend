function Display({ expression, result }) {
  return (
    <div className="display">
      <div>{expression}</div>
      <div>{result}</div>
    </div>
  );
}

export default Display;