type TextAreaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholderText?: string;
  rows?: number;
};

export function TextArea({ value, onChange, placeholderText, rows }: TextAreaProps) {
    return (
    <textarea
      className="text-area"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholderText}
      rows={rows || 1}
    />
  );
}