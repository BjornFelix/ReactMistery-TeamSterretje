import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import routes from './main.routes';

describe('Testing main routing', () => {
  it('Home', () => {
    jest.mock('./pages/Home.tsx', () => () => <h1>Home</h1>);

    render(<RouterProvider router={createMemoryRouter(routes)} />);

    screen.getByText('index');
  });

  it('Login', () => {
    jest.mock('./pages/Login.tsx', () => () => <h1>Login</h1>);

    render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/login'] })} />);

    screen.getByText('Log in to Bootcamp');
  });

  it('NotFound', () => {
    jest.mock('./pages/NotFound.tsx', () => () => <h1>NotFound</h1>);

    render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/randomURL'] })} />);

    screen.getByText('NotFound');
  });

  it('User details & header', () => {
    jest.mock('./pages/UserDetails.tsx', () => () => <h1>User Details</h1>);

    const id = 1;

    render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [`/users/${id}`] })} />);

    screen.getByText(`User Detail (${id})`);
  });
});
