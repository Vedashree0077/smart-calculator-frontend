export const handleKeyboardInput = (event, onInput) => {
  const allowedKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "*",
    "/",
    ".",
    "(",
    ")",
  ];

  if (allowedKeys.includes(event.key)) {
    onInput(event.key);
  }

  if (event.key === "Enter") {
    onInput("=");
  }

  if (event.key === "Backspace") {
    onInput("C");
  }
};