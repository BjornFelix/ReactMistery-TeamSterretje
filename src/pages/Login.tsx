import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../services/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../services/authService';

const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showError, setShowError] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    usernameRef.current?.focus();
  }, [showError]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    submitBtnRef.current?.setAttribute('disabled', 'true');

    const username = usernameRef.current?.value ?? '';
    const password = passwordRef.current?.value ?? '';

    const authentication: boolean = await authenticate(username, password);

    if (authentication) {
      setUser('admin');
      return;
    }

    setShowError(true);
    submitBtnRef.current?.removeAttribute('disabled');
    formRef.current?.reset();
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="card col-sm-6">
          <h4 className="card-header">Log in to Bootcamp</h4>
          <div className="card-body">
            {showError && (
              <div className="alert alert-danger text-center" role="alert">
                Unknown username or password
              </div>
            )}
            <form onSubmit={(e) => handleLogin(e)} ref={formRef} noValidate>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input id="username" name="username" type="text" className="form-control" required ref={usernameRef} />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  name="username"
                  type="password"
                  className="form-control"
                  required
                  ref={passwordRef}
                />
              </div>
              <div className="d-grid">
                <button aria-disabled="false" className="btn btn-primary" type="submit" ref={submitBtnRef}>
                  LOG IN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
