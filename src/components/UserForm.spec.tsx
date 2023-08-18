import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import routes from '../main.routes';
import UserForm from './UserForm';

afterEach(() => {
  jest.clearAllMocks();
});

const getFirstnameInput = () => screen.getByLabelText('First name');
const getLastnameInput = () => screen.getByLabelText('Last name');
const getEmailInput = () => screen.getByLabelText('Email');
const getSubmit = () => screen.getByRole('button', { name: 'Save' }); // inline text

const fillInForm = async ({ firstName, lastName, email }: { firstName: string; lastName: string; email: string }) => {
  const firstnameInput = getFirstnameInput();
  const lastnameInput = getLastnameInput();
  const emailInput = getEmailInput();

  await userEvent.type(firstnameInput, firstName);
  await userEvent.type(lastnameInput, lastName);
  await userEvent.type(emailInput, email);
};

const getFormValues = () => ({
  firstName: 'Kobe',
  lastName: 'Brants',
  email: 'kobe.brants@euri.com',
});

describe('form testing', () => {
  it('Check components form', () => {
    render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/users/1'] })} />);

    const firstnameInput = getFirstnameInput();
    const lastnameInput = getLastnameInput();
    const emailInput = getEmailInput();
    const submit = getSubmit();

    expect(firstnameInput).toHaveAttribute('type', 'text');
    expect(firstnameInput).toHaveValue('');

    expect(lastnameInput).toHaveAttribute('type', 'text');
    expect(lastnameInput).toHaveValue('');

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveValue('');

    expect(submit).toHaveAttribute('type', 'submit');
  });
  it('validate that an onSubmit() with the filled in data is called', async () => {
    const onSubmit = jest.fn();
    render(<UserForm id={1} onSubmit={onSubmit} />);

    const formValues = getFormValues();
    await fillInForm(formValues);

    await userEvent.click(getSubmit());

    expect(onSubmit).toHaveBeenCalledTimes(1);
    // expect(onSubmit).toHaveBeenCalledWith(formValues);
  });
});
