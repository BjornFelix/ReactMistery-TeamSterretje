import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import routes from '../main.routes';
import { mocked } from 'jest-mock';
import { authenticate } from '../services/authService';
import AuthContext from '../services/contexts/AuthContext';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

jest.mock('../services/authService');

const getUsernameInput = () => screen.getByLabelText('Username');
const getPasswordInput = () => screen.getByLabelText('Password');
const getSubmit = () => screen.getByRole('button', { name: 'LOG IN' }); // inline text

const fillInForm = async (username: string, password: string) => {
  const usernameInput = getUsernameInput();
  const passwordInput = getPasswordInput();

  await userEvent.type(usernameInput, username);
  await userEvent.type(passwordInput, password);
};

afterEach(() => jest.clearAllMocks());

describe('testing login page', () => {
  it('check if login page has all components', () => {
    render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/login'] })} />);

    const header = screen.getByText('Log in to Bootcamp');
    expect(header);

    const username = getUsernameInput();
    const password = getPasswordInput();
    const submit = getSubmit();

    expect(username).toHaveAttribute('type', 'text');
    expect(username).toHaveValue('');

    expect(password).toHaveAttribute('type', 'password');
    expect(password).toHaveValue('');

    expect(submit).toHaveAttribute('type', 'submit');
  });
  it('check when credentials are correct', async () => {
    mocked(authenticate).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 100);
        }),
    );

    const App = () => {
      const [user, setUser] = useState<string | null>(null);
      return (
        <AuthContext.Provider value={{ user: user, setUser: setUser }}>
          <RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/login'] })} />
        </AuthContext.Provider>
      );
    };

    render(<App />);

    const submit = getSubmit();

    const user = 'admin';
    const password = 'secret';

    await fillInForm(user, password);

    await userEvent.click(submit);

    await waitFor(() => expect(authenticate).toHaveBeenCalledWith(user, password));
    await waitFor(() => expect(authenticate).toHaveBeenCalledTimes(1));

    expect(submit).toBeDisabled();

    await waitFor(() => expect(screen.getByText(`Welcome, ${user}`)).toBeInTheDocument());
  });

  it('check when credentials are not correct', async () => {
    mocked(authenticate).mockResolvedValue(false);

    const App = () => {
      const [user, setUser] = useState<string | null>(null);
      return (
        <AuthContext.Provider value={{ user: user, setUser: setUser }}>
          <RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/login'] })} />
        </AuthContext.Provider>
      );
    };

    render(<App />);

    const submit = getSubmit();

    const usernameInput = getUsernameInput();
    const passwordInput = getPasswordInput();

    const user = 'admin';
    const password = 'wrong';

    await fillInForm(user, password);

    await userEvent.click(submit);

    await waitFor(() => expect(authenticate).toHaveBeenCalledWith(user, password));
    await waitFor(() => expect(authenticate).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    expect(submit).not.toBeDisabled();

    // test input fields are empty
    expect(usernameInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');

    await waitFor(() => expect(screen.getByText('Log in to Bootcamp')).toBeInTheDocument());
  });
});
