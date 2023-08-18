import { FC, ReactNode } from 'react';

interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'dark' | 'warning';
  children: ReactNode;
  pill?: boolean;
}

const clsx = (...classNames: Array<string | false | undefined | null>): string | undefined => {
  return classNames.filter(Boolean).join(' ') || undefined;
};

const Badge: FC<Props> = ({ variant = 'secondary', pill, children }) => {
  const checkColor = () => {
    return ['info', 'warning', 'light'].includes(variant) ? 'text-dark' : '';
  };

  return <span className={clsx(`badge`, `bg-${variant}`, checkColor(), pill && 'rounded-pill')}>{children}</span>;
};

export default Badge;
