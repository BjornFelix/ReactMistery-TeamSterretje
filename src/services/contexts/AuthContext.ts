import { createContext } from 'react';

export interface IAuthContext {
  user: string | null;
  setUser: (user: string | null) => void;
}

export default createContext<IAuthContext>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: (user: string | null) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
});
