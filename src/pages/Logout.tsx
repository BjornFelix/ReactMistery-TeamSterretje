import { useContext, useEffect } from 'react';
import AuthContext from '../services/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogOut = () => {
      setUser(null);
    };

    handleLogOut();
    navigate('/');
  });

  return null;
};

export default Logout;
