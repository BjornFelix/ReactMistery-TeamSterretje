import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import routes from '../main.routes';
import AuthContext from '../services/contexts/AuthContext';
import { FC, useMemo, useState } from 'react';

describe('navbar', () => {
  // Exercise 2.1: Navbar
  it('exists nav role', () => {
    render(<RouterProvider router={createMemoryRouter(routes)} />);

    screen.getByRole('navigation');
  });
  it('exists logo', () => {
    render(<RouterProvider router={createMemoryRouter(routes)} />);

    const image = screen.getByAltText('Bootcamp Logo') as HTMLImageElement;
    expect(image).toHaveAttribute('src', 'assets/react.svg');
  });
  it('brand text', () => {
    render(<RouterProvider router={createMemoryRouter(routes)} />);

    const brandLink = screen.getByText('Bootcamp');
    expect(brandLink).toHaveProperty('tagName', 'A');

    // Navigates to home when clicked
    fireEvent.click(brandLink);
    screen.getByText('Home');
  });

  // Exercise 2.2: Login/Logout link
  it('validate authentication', () => {
    render(<RouterProvider router={createMemoryRouter(routes)} />);

    const nav = screen.getByRole('navigation');

    const logInLink = within(nav).getByRole('link', { name: 'Log In' });
    expect(logInLink).toHaveClass('nav-link');
  });

  // Exercise 2.3: Login module
  it('test login button', () => {
    const Context: FC = () => {
      const [user, setUser] = useState<string | null>(null);
      const value = useMemo(() => ({ user, setUser }), [user]);
      return (
        <AuthContext.Provider value={value}>
          <RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/login'] })} />
        </AuthContext.Provider>
      );
    };
    render(<Context />);
    const loginBtn = screen.getByRole('button', { name: 'LOG IN' });
    // Navigate to home when clicked
    fireEvent.click(loginBtn);

    waitFor(() => expect(screen.getByText('index')));
    waitFor(() => expect(screen.getByRole('link', { name: 'Log In' })).not.toBeInTheDocument());
  });
  it('test redirect when already logged in', () => {
    render(
      <AuthContext.Provider value={{ user: 'admin', setUser: () => {} }}>
        <RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/login'] })} />
      </AuthContext.Provider>,
    );

    screen.getByText('index');
  });

  // Exercise 2.4: /logout route
  it('test logout button', () => {
    const Context: FC = () => {
      const [user, setUser] = useState<string | null>('admin');
      const value = useMemo(() => ({ user, setUser }), [user]);

      return (
        <AuthContext.Provider value={value}>
          <RouterProvider router={createMemoryRouter(routes)} />
        </AuthContext.Provider>
      );
    };

    render(<Context />);

    const logoutBtn = screen.getByText('Log Out');

    // Navigate to home when clicked
    fireEvent.click(logoutBtn);
    screen.getByText('index');

    expect(screen.queryByRole('link', { name: 'Log In' })).toBeInTheDocument();
  });

  // Exercise 2.5: personalised greeting
  it('anonymous, output of home component', () => {
    render(
      <AuthContext.Provider value={{ user: null, setUser: () => {} }}>
        <RouterProvider router={createMemoryRouter(routes)} />
      </AuthContext.Provider>,
    );
    const please = screen.getByText('Please');
    within(please).getByText('login');
  });
  it('authenticated, output of home component', () => {
    render(
      <AuthContext.Provider value={{ user: 'admin', setUser: () => {} }}>
        <RouterProvider router={createMemoryRouter(routes)} />
      </AuthContext.Provider>,
    );
    screen.getByText('Welcome, admin');
  });
});
