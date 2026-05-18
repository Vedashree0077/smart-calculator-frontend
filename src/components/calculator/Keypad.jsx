import Button from "./Button";
import { BUTTONS } from "../../utils/constants";

function Keypad({ onButtonClick }) {
  return (
    <div className="keypad">
      {BUTTONS.map((btn, index) => (
        <Button
          key={index}
          value={btn}
          onClick={onButtonClick}
        />
      ))}
    </div>
  );
}

export default Keypad;