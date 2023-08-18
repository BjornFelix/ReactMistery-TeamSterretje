import { useContext } from 'react';
import AuthContext from '../services/contexts/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1>index</h1>
      {!user && (
        <p>
          Please <a href="/login">login</a>
        </p>
      )}

      {user && <p>Welcome, {user}</p>}
    </>
  );
};

export default Home;
