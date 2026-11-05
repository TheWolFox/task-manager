import Image from "next/image";

type ButtonProps = {
  title?: string;
  imgSrc?: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "icon";
};

export function Button({
  title,
  imgSrc,
  type = "button",
  disabled,
  onClick,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      className={`button button-${variant}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {imgSrc && (
        <Image src={imgSrc} alt="" aria-hidden="true" width={32} height={32} />
      )}
      {title && <span>{title}</span>}
    </button>
  );
}
