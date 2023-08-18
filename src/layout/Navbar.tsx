import { Link, Outlet } from 'react-router-dom';
import reactlogo from '../assets/react.svg';
import { useContext } from 'react';
import AuthContext from '../services/contexts/AuthContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" data-testid="navbar-brand" href="/">
            <img src={reactlogo} alt="Bootcamp Logo" width="24" height="24" className="d-inline-block align-text-top" />
            &nbsp;Bootcamp
          </a>
          <Link className="nav-link active" aria-current="page" to="/">
            Home
          </Link>
          {user ? (
            <Link className="nav-link" to="/logout">
              Log Out
            </Link>
          ) : (
            <Link className="nav-link" to="/login">
              Log In
            </Link>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
