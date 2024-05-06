import React, { useState, useRef, useEffect} from 'react';
import './pin-input-field.scss'
import { TextField } from '@oxygen-ui/react';

export interface PinInputProps {
  length: number;
  onPinChange: (pin: string) => void;
}

const PinInput: React.FC<PinInputProps> = ({ length, onPinChange }) => {
  const [totp, setTotp] = useState(Array(length).fill('')); // Initialize a state variable for the TOTP

  const refs = useRef(totp.map(() => React.createRef<HTMLInputElement>()));

  useEffect(() => {
    // If all fields are filled, call onPinChange
    if (totp.every((value) => value !== '')) {
      onPinChange(totp.join(''));
    }
  }, [totp, onPinChange]);

  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTotp = [...totp];
    newTotp[index] = event.target.value;
    setTotp(newTotp);

    // If a character is entered and there's a next TextField, focus it
    if (event.target.value && index < totp.length - 1) {
      refs.current[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    // If the backspace key is pressed and the current field is empty
    if (event.key === 'Backspace' && totp[index] === '') {
      // Prevent the default action to stop deleting characters in the previous field
      event.preventDefault();

      // If there's a previous field, focus it
      if (index > 0) {
        refs.current[index - 1].current?.focus();

        // Clear the value of the previous field
        const newTotp = [...totp];
        newTotp[index - 1] = '';
        setTotp(newTotp);
      }
    }
  };

  return (
    <div className="pin-code-input-fields">
        {[...Array(length)].map((_: number, index: number) => (
          <TextField
            key={`pincode-${index + 1}`}
            id={`pincode-${index + 1}`}
            name="number"
            placeholder="."
            className="input"
            value={totp[index]}
            onChange={handleChange(index)}
            inputRef={refs.current[index]}
            inputProps={{maxLength: 1}}
            onKeyDown={handleKeyDown(index)}
          />
        ))}
      </div>
  );
};

export default PinInput;