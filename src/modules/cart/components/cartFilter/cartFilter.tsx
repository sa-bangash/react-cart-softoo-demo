import "./cartFilter.scss";
const COLOURS = ["Black", "Stone", "Red"];
interface CartFilterProps {
  onColourChange: (selectedColour: string) => void;
}

export const CartFilter: React.FC<CartFilterProps> = ({ onColourChange }) => {
  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedColour = e.target.value;
    onColourChange(selectedColour);
  };
  return (
    <div className="cart-filter">
      <select
        onChange={handleColorChange}
        className="cart-filter__colour-select"
        data-testid="cart-color-select"
      >
        <option value="">
          Colour Filter
        </option>
        {COLOURS.map((colour) => {
          return (
            <option value={colour} key={colour}>
              {colour}
            </option>
          );
        })}
      </select>
    </div>
  );
};
