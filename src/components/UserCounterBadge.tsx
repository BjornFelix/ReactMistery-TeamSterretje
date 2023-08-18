import { useEffect, useState } from 'react';
import { isAbortError } from '../utils/fetcher';
import { listPaged } from '../services/userApiClient';
import Badge from './Badge';

const UserCounterBadge = () => {
  const [total, setTotal] = useState<number>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const abortController = new AbortController();

    listPaged({ pageSize: 1 }, { signal: abortController.signal })
      .then(({ total }) => setTotal(total))
      .catch((err) => {
        if (isAbortError(err)) return;

        setError(err);
      });

    return () => abortController.abort();
  }, []);

  if (error) {
    return (
      <Badge variant="danger" pill>
        Oepsie users foetsie
      </Badge>
    );
  }

  // loading
  if (total === undefined) {
    return (
      <Badge variant="warning" pill>
        Counting users
      </Badge>
    );
  }

  return (
    <Badge variant="success" pill>
      {total} users
    </Badge>
  );
};

export default UserCounterBadge;
