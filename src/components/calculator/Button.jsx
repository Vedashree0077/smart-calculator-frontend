function Button({ value, onClick }) {
  return (
    <button
      className="calc-button"
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
}

export default Button;