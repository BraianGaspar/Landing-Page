import '../styles/button.css';

interface IButtonProps {
  text: string;
  secondary?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'disabled';
}

export default function Button({
  text,
  secondary = false,
  disabled = false,
  onClick,
  type = 'button',
  variant,
}: IButtonProps) {
  // Se disabled for true, usa a classe disabled-btn
  const buttonClass = disabled ? 'btn-disabled' : secondary ? 'btn-secondary' : 'btn-primary';

  return (
    <button className={buttonClass} onClick={onClick} type={type} disabled={disabled}>
      {text}
    </button>
  );
}
