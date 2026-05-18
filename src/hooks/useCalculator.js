import { useState } from "react";

function useCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const appendValue = (value) => {
    setExpression((prev) => prev + value);
  };

  const clearDisplay = () => {
    setExpression("");
    setResult("");
  };

  const calculateResult = () => {
    try {
      const evalResult = eval(expression);

      setResult(evalResult);
    } catch (error) {
      setResult("Error");
    }
  };

  return {
    expression,
    result,
    appendValue,
    clearDisplay,
    calculateResult,
  };
}

export default useCalculator;