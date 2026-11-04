type ButtonProps = {
  title?: string;
  imgSrc?: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "icon";
};

export function Button({ title, imgSrc, type = "button", disabled, onClick, variant = "primary" }: ButtonProps) {
  return (
    <button className={`button button-${variant}`} type={type} disabled={disabled} onClick={onClick}>
      {imgSrc && <img src={imgSrc} alt={title} aria-hidden="true"/>}
      {title && <span>{title}</span>}
    </button>
  );
}
