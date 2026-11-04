type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholderText?: string;
  required?: boolean;
  disabled?: boolean;
};

export function TextInput({ value, placeholderText, required, disabled, onChange }: TextInputProps) {
    return (
    <input
      className="text-input"
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholderText}
      required={required}
      disabled={disabled}
    />
  );
}