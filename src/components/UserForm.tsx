import { ChangeEventHandler, FormEventHandler, useEffect, useRef, useState } from 'react';
import styles from './UserForm.module.css';

interface Props {
  id: number;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export interface FormState {
  firstname: string;
  lastname: string;
  email: string;
}

const EMAIL_REG_EX =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

const UserForm = ({ id, onSubmit }: Props) => {
  const [formValues, setFormValues] = useState<FormState>({
    firstname: '',
    lastname: '',
    email: '',
  });
  const [errors, setErrors] = useState<FormState>({
    firstname: '',
    lastname: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const firstNameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstNameInput.current?.focus();
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { name, value },
    } = event;

    switch (name) {
      case 'firstname':
        setFormValues((values) => ({ ...values, firstname: value }));
        break;
      case 'lastname':
        setFormValues((values) => ({ ...values, lastname: value }));
        break;
      case 'email':
        setFormValues((values) => ({ ...values, email: value }));
        break;
      default:
        throw new Error(`Unknown form field: ${id}`);
    }
  };

  const validateValues = (values: FormState) => {
    const errors: FormState = { firstname: '', lastname: '', email: '' };
    if (values.firstname.length < 2) {
      errors.firstname = 'Please enter a first name.';
    }
    if (values.lastname.length < 2) {
      errors.firstname = 'Please enter a last name.';
    }

    return errors;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setErrors(validateValues(formValues));

    onSubmit(e);
  };

  return (
    <div className="container-fluid">
      <h1>User Detail ({id})</h1>
      <form className="row g-3" onSubmit={handleSubmit} noValidate>
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={formValues.firstname}
            onChange={handleChange}
            ref={firstNameInput}
            name="firstname"
            aria-invalid={submitted && Boolean(errors.firstname)}
            aria-describedby="firstname-validation-feedback"
          />
          {submitted && errors.firstname && (
            <div className={styles['validation-error']} id="firstname-validation-feedback">
              {errors.firstname}
            </div>
          )}
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={formValues.lastname}
            onChange={handleChange}
            name="lastname"
            aria-invalid={submitted && Boolean(errors.lastname)}
            aria-describedby="firstname-validation-feedback"
          />
          {submitted && errors.lastname && (
            <div className={styles['validation-error']} id="firstname-validation-feedback">
              {errors.lastname}
            </div>
          )}
        </div>
        <div className="col-md-12">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formValues.email}
            onChange={handleChange}
            name="email"
          />
        </div>
        <div className="col-12 mt-4">
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
