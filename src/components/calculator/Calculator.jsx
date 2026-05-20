import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/calculator.css";

function Calculator() {
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState([]);
  const [showScientific, setShowScientific] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [justCalculated, setJustCalculated] = useState(false);

  const token = localStorage.getItem("token");

  // Format result (remove unnecessary .0)
  const formatResult = (value) => {
    const num = Number(value);

    if (!isNaN(num)) {
      if (Number.isInteger(num)) {
        return num.toString();
      }
      return parseFloat(num.toFixed(15)).toString();
    }

    return value;
  };

  // Fetch calculation history
  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        "https://smart-calculator-backend-y4j4.onrender.com/api/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const formattedHistory = response.data.map((item) => ({
        ...item,
        expression: item.expression
    .replace(/\*sqrt\(/g, "sqrt(")
    .replace(/\*sin\(/g, "sin(")
    .replace(/\*cos\(/g, "cos(")
    .replace(/\*tan\(/g, "tan(")
    .replace(/\*log\(/g, "log(")
    .replace(/\*ln\(/g, "ln(")
    .replace(/\*/g, "×")
    .replace(/\//g, "÷")
    .replace(/-/g, "−"),
        result: formatResult(item.result),
      }));

      setHistory(formattedHistory);
    } catch (error) {
      console.error("History fetch error:", error);
    }
  };

  // Calculate expression
  const calculateResult = async () => {
    if (!expression.trim()) return;

    try {
      const response = await axios.post(
       "https://smart-calculator-backend-y4j4.onrender.com/api/calculator/calculate",
        {
          expression,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const rawResult =
        typeof response.data === "object" && response.data !== null
          ? response.data.result
          : response.data;

      const result = formatResult(rawResult);

      setExpression(result);
      setJustCalculated(true);

      fetchHistory();
    } catch (error) {
      console.error("Calculation error:", error);
      setExpression("Error");
      setJustCalculated(true);
    }
  };

  // Clear history
  const clearHistory = async () => {
    try {
      await axios.delete(
        "https://smart-calculator-backend-y4j4.onrender.com/api/history/clear",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory([]);
    } catch (error) {
      console.error("Clear history error:", error);
      alert("Failed to clear history.");
    }
  };

  // Handle button click
  const handleClick = (value) => {
    // Reset if Error is displayed
    if (expression === "Error") {
      setExpression("");
      setJustCalculated(false);
    }

    // Convert display symbols to actual operators
    if (value === "×") value = "*";
    if (value === "÷") value = "/";
    if (value === "−") value = "-";

    // If user starts with minus after calculation, begin new negative number
    if (justCalculated && value === "-") {
      setExpression("-");
      setJustCalculated(false);
      return;
    }

    // Scientific function after calculation starts new expression
    if (
      justCalculated &&
      ["sin", "cos", "tan", "log", "ln", "√", "("].includes(value)
    ) {
      if (value === "√") {
        setExpression("sqrt(");
      } else if (["sin", "cos", "tan", "log", "ln"].includes(value)) {
        setExpression(`${value}(`);
      } else {
        setExpression(value);
      }

      setJustCalculated(false);
      return;
    }

    // Number or decimal after calculation starts new expression
    if (justCalculated && "0123456789.".includes(value)) {
      setExpression(value);
      setJustCalculated(false);
      return;
    }

    // Operator handling
    if ("+-*/%".includes(value)) {
      setExpression((prev) => {
        // Allow minus as first character
       if (prev === "") {
  // Allow only + and - at the beginning
  if (value === "+" || value === "-") {
    return value;
  }
  return prev;
}

        const lastChar = prev.slice(-1);

        // If last character is already an operator
        if ("+-*/%".includes(lastChar)) {
          // Allow negative number after operator (5*-5)
          if (value === "-" && lastChar !== "-") {
            return prev + value;
          }

          // Replace existing operator
          return prev.slice(0, -1) + value;
        }

        return prev + value;
      });

      setJustCalculated(false);
      return;
    }

    switch (value) {
      case "=":
        calculateResult();
        break;

      case "C":
        setExpression("");
        setJustCalculated(false);
        break;

      case "⌫":
        setExpression((prev) => prev.slice(0, -1));
        setJustCalculated(false);
        break;

      case "√":
        setExpression((prev) => {
          if (
            prev &&
            (
              "0123456789".includes(prev.slice(-1)) ||
              prev.slice(-1) === ")"
            )
          ) {
            return prev + "*sqrt(";
          }
          return prev + "sqrt(";
        });
        setJustCalculated(false);
        break;

      case "sin":
      case "cos":
      case "tan":
      case "log":
      case "ln":
        setExpression((prev) => {
          if (
            prev &&
            (
              "0123456789".includes(prev.slice(-1)) ||
              prev.slice(-1) === ")"
            )
          ) {
            return prev + `*${value}(`;
          }
          return prev + `${value}(`;
        });
        setJustCalculated(false);
        break;

      default:
        setExpression((prev) => prev + value);
        setJustCalculated(false);
        break;
    }
  };

  // Keyboard support
  const handleKeyboard = (event) => {
    const key = event.key;

    if ("0123456789+-*/.%()".includes(key)) {
      handleClick(key);
    } else if (key === "Enter") {
      event.preventDefault();
      calculateResult();
    } else if (key === "Backspace") {
      setExpression((prev) => prev.slice(0, -1));
      setJustCalculated(false);
    } else if (key === "Escape") {
      setExpression("");
      setJustCalculated(false);
    }
  };

  // Load history and add keyboard listener
  useEffect(() => {
    if (token) {
      fetchHistory();
    }

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scientificButtons = [
    "√",
    "(",
    ")",
    "sin",
    "cos",
    "tan",
    "log",
    "ln",
  ];

  const normalButtons = [
    "C", "%", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "−",
    "1", "2", "3", "+",
    "0", ".", "⌫", "=",
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "20px",
        marginTop: "20px",
        padding: "20px",
        flexWrap: "wrap",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Calculator */}
      <div className="calculator-container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            onClick={() => setShowHistory(!showHistory)}
            style={{
              fontSize: "28px",
              cursor: "pointer",
              color: "white",
              userSelect: "none",
              marginLeft: "auto",
            }}
            title="Show History"
          >
            ⋮
          </div>
        </div>

        {/* Display */}
        <div className="display">
          {(expression || "0")
    .replace(/\*sqrt\(/g, "sqrt(")
    .replace(/\*sin\(/g, "sin(")
    .replace(/\*cos\(/g, "cos(")
    .replace(/\*tan\(/g, "tan(")
    .replace(/\*log\(/g, "log(")
    .replace(/\*ln\(/g, "ln(")
    .replace(/\*/g, "×")
    .replace(/\//g, "÷")
    .replace(/-/g, "−")}
        </div>

        {/* Buttons */}
        <div className="keypad">
          {/* Scientific Toggle */}
          <button
            className="calc-button"
            onClick={() => setShowScientific(!showScientific)}
          >
            {showScientific ? "▲" : "▼"}
          </button>

          {/* Scientific Buttons */}
          {showScientific &&
            scientificButtons.map((btn) => (
              <button
                key={btn}
                className="calc-button"
                onClick={() => handleClick(btn)}
              >
                {btn}
              </button>
            ))}

          {/* Normal Buttons */}
          {normalButtons.map((btn) => (
            <button
              key={btn}
              className="calc-button"
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      {/* History Panel */}
      {showHistory && (
        <div
          style={{
            width: "320px",
            background: "#1f2937",
            padding: "20px",
            borderRadius: "15px",
            color: "white",
            maxHeight: "544px",
            overflowY: "auto",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h2 style={{ margin: 0 }}>History</h2>

            <button
              onClick={clearHistory}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          </div>

          {history.length === 0 ? (
            <p>No calculations yet</p>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#374151",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setExpression(item.result);
                  setJustCalculated(true);
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginTop: "4px",
                  }}
                >
                  {item.expression} = {item.result}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Calculator;
