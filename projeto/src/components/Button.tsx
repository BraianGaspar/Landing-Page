import '../styles/button.css';

interface IButtonProps {
  text: string;
  secondary?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  text,
  secondary = false,
  disabled = false,
  onClick,
  type = 'button',
}: IButtonProps) {
  const buttonClass = disabled ? 'btn-disabled' : secondary ? 'btn-secondary' : 'btn-primary';

  return (
    <button className={buttonClass} onClick={onClick} type={type} disabled={disabled}>
      {text}
    </button>
  );
}
