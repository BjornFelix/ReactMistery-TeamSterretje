import { FC } from 'react';

interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  outline?: boolean;
  size?: 'small' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  classes?: string;
}

const clsx = (...classNames: Array<string | false | undefined | null>): string | undefined => {
  return classNames.filter(Boolean).join(' ') || undefined;
};

const Button: FC<Props> = ({
  variant = 'secondary',
  outline = false,
  size = 'small',
  disabled = false,
  onClick,
  classes = '',
}) => {
  const isOutline = () => {
    return outline ? `btn-outline-${variant}` : `btn-${variant}`;
  };

  const isLarge = () => {
    return ['large'].includes(size) ? 'btn-lg' : 'btn-sm';
  };

  return (
    <button
      type="button"
      className={clsx(`btn`, isOutline(), isLarge(), classes)}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
    ></button>
  );
};

export default Button;
