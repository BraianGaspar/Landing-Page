import '../styles/button.css';

interface IButtonProps {
  text: string;
  secondary?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  text,
  secondary,
  onClick,
  type = 'button',
  disabled = false,
}: IButtonProps) {
  return (
    <button
      className={secondary ? 'btn-secondary' : 'btn-primary'}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
