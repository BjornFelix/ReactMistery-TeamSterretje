import { resetHandlers } from '@test/mock-server';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import { rest } from 'msw';
import Home from '../../pages/Home';
import useFetch from './useFetch';

const baseUrl = `http://localhost:8080/api/users`;

it('returns the users', async () => {
  resetHandlers(
    rest.get(baseUrl, (_req, res, ctx) => res(ctx.json(mockUsers)))
  );

  render(<Home></Home>);

  const userContainer = await screen.findByTestId('user-result');
  const users = within(userContainer).getAllByTestId('user');
  expect(users.length).toBe(10);
});

it('return an Error if url is not found', async () => {
  resetHandlers(rest.get(baseUrl, (_req, res, ctx) => res(ctx.status(404))));

  render(<Home></Home>);

  let loading = screen.getByText('Loading');
  await waitFor(() => {
    screen.findByText('Not Found', { selector: 'P' });
    waitForElementToBeRemoved(loading);
  });
});

// it('', () => {
//   const Home = () => {
//     resetHandlers(rest.get(baseUrl, (_req, res, ctx) => res(ctx.status(404))));

//     const { data, error, isLoading } = useFetch<User[]>(
//       `http://localhost:8080/api/users?_page=1}`,
//       { initialValue: [] }
//     );

//     if (error) {
//       return <p>{error.message}</p>;
//     }
//   };

//   render(<Home />);

//   expect(useFetch).lastCalledWith(1);
// });

const mockUsers = [
  {
    id: 1,
    firstName: 'Devon',
    lastName: 'Casper',
    email: 'Juanita.Medhurst@yahoo.com',
    age: 33,
    homeAddress: {
      addressLine: '337 Kunze Ways',
      city: 'Whiteshire',
      zip: '11929-6880',
    },
  },
  {
    id: 2,
    firstName: 'Dameon',
    lastName: 'Koss',
    email: 'Ethan_Krajcik@yahoo.com',
    age: 45,
    homeAddress: {
      addressLine: '8498 Parisian Station',
      city: 'South Jedidiahville',
      zip: '37474-7509',
    },
  },
  {
    id: 3,
    firstName: 'Alphonso',
    lastName: 'Hammes',
    email: 'Khalil98@hotmail.com',
    age: 31,
    homeAddress: {
      addressLine: '77582 Jaquan Park',
      city: 'Cristobalborough',
      zip: '14963-9526',
    },
  },
  {
    id: 4,
    firstName: 'Jacinthe',
    lastName: 'Kuvalis',
    email: 'Kristian67@yahoo.com',
    age: 42,
    homeAddress: {
      addressLine: '56999 Gerlach Street',
      city: 'West Lonnieview',
      zip: '27468',
    },
  },
  {
    id: 5,
    firstName: 'Bernita',
    lastName: 'Jacobi',
    email: 'Kirk.Lindgren57@yahoo.com',
    age: 25,
    homeAddress: {
      addressLine: '3253 Juanita Street',
      city: 'Port Haleighfurt',
      zip: '80085-5297',
    },
  },
  {
    id: 6,
    firstName: 'Mason',
    lastName: 'Stamm',
    email: 'Palma71@hotmail.com',
    age: 35,
    homeAddress: {
      addressLine: '219 Ian Mill',
      city: 'Cheyenne',
      zip: '63008-6896',
    },
  },
  {
    id: 7,
    firstName: 'Lane',
    lastName: 'Bergnaum',
    email: 'Christophe.Powlowski@yahoo.com',
    age: 45,
    homeAddress: {
      addressLine: '527 Torphy Key',
      city: 'Port Easton',
      zip: '11539-9642',
    },
  },
  {
    id: 8,
    firstName: 'Audreanne',
    lastName: 'Treutel',
    email: 'Nicola85@yahoo.com',
    age: 52,
    homeAddress: {
      addressLine: '01846 Francesca Crossroad',
      city: 'Las Cruces',
      zip: '64709',
    },
  },
  {
    id: 9,
    firstName: 'Haven',
    lastName: 'Berge',
    email: 'Jennie.Kshlerin30@hotmail.com',
    age: 25,
    homeAddress: {
      addressLine: '91820 Larson Coves',
      city: 'Geovannyshire',
      zip: '67135',
    },
  },
  {
    id: 10,
    firstName: 'Kamron',
    lastName: 'Kassulke',
    email: 'Salvador.Friesen@gmail.com',
    age: 53,
    homeAddress: {
      addressLine: '434 Jonathan Freeway',
      city: 'Yucaipa',
      zip: '74231-1749',
    },
  },
];
