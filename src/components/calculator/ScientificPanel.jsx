import Button from "./Button";
import { SCIENTIFIC_BUTTONS } from "../../utils/constants";

function ScientificPanel({ onButtonClick }) {
  return (
    <div className="keypad">
      {SCIENTIFIC_BUTTONS.map((btn, index) => (
        <Button
          key={index}
          value={btn}
          onClick={onButtonClick}
        />
      ))}
    </div>
  );
}

export default ScientificPanel;