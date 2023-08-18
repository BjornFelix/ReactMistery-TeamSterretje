import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './main.routes';
import { useMemo, useState } from 'react';
import AuthContext from './services/contexts/AuthContext';

function App() {
  const [user, setUser] = useState<string | null>(null);
  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <>
      <AuthContext.Provider value={value}>
        <RouterProvider router={createBrowserRouter(routes)} />
      </AuthContext.Provider>
    </>
  );
}

export default App;
