import { fetcher } from '../utils/fetcher';
import { HttpStatusError } from '../utils/http-status-error';

export interface AbortOptions {
  signal: AbortSignal;
}

interface PagedResult<T> {
  items: T[];
  total: number; // see headers
}

export interface PagingOptions {
  page?: number;
  pageSize?: number;
}

export async function getUserById(id: number, { signal }: Partial<AbortOptions> = {}): Promise<User | null> {
  try {
    const { data } = await fetcher<User>(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`, { signal: signal });
    return data;
  } catch (err) {
    if (err instanceof HttpStatusError && err.status === 404) {
      return null;
    }
    throw err;
  }
}

export async function listPaged(
  { page = 1, pageSize = 10 }: PagingOptions = {},
  { signal }: Partial<AbortOptions> = {},
): Promise<PagedResult<User>> {
  const query = new URLSearchParams();
  query.append('_page', page.toString());
  query.append('_limit', pageSize.toString());

  const { data: items, headers } = await fetcher<User[]>(`${process.env.REACT_APP_API_BASE_URL}/users?${query}`, {
    signal,
  });

  return {
    items,
    total: Number(headers.get('X-Total-Count')),
  };
}

export async function save(user: Omit<User, 'id'> | User): Promise<User> {
  if (!('id' in user)) {
    const { data } = await fetcher<User>(`${process.env.REACT_APP_API_BASE_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });
    return data;
  } else {
    const { data } = await fetcher<User>(`${process.env.REACT_APP_API_BASE_URL}/users/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });
    return data;
  }
}
