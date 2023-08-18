import { FC, ReactNode } from 'react';
import useDocumentTitle from '../services/hooks/useDocumentTitle';

interface Props {
  children: ReactNode;
  variant?: string;
  header?: ReactNode;
  classes?: string;
  dismissible: boolean;
  setShowAlert: (showAlert: boolean) => void;
}

const Alert: FC<Props> = ({ variant = 'warning', classes, header, children, dismissible, setShowAlert }) => {
  useDocumentTitle('WELCOME', true);

  const toggShowAlert = () => {
    setShowAlert(false);
  };

  return (
    <div
      className={`alert alert-${variant ?? 'warning'} ${classes} ${dismissible && 'alert-dismissible'}`}
      role="alert"
    >
      {header ?? <h4 className="alert-heading">{header}</h4>}
      {children}
      {dismissible && <button type="button" className="btn-close" aria-label="Close" onClick={toggShowAlert}></button>}
    </div>
  );
};

export default Alert;
