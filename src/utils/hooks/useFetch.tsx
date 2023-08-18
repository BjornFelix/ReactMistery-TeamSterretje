import { useEffect, useState } from "react";
import { fetcher, isAbortError } from "../fetcher";
import { HttpStatusError } from "../http-status-error";

interface FetchResult<T> {
  isLoading: boolean;
  data: T | null;
  error: Error | null;
}

interface FetchOptions<T> {
  initialValue?: T | null;
}

export default function useFetch<T>(
  url: string,
  options: FetchOptions<T> = {}
): FetchResult<T> {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const controller = new AbortController();

    const fetchUsers = async () => {
      const result = await fetcher<T>(url, {
        ...options,
        signal: controller.signal,
      });
      setData(result.data);
      setIsLoading(false);
    };

    fetchUsers().catch((err: HttpStatusError) => {
      if (isAbortError(err)) {
        console.log("aborted");
        return;
      }
      setError(new Error(err.statusText));
      setIsLoading(false);
    });

    return () => controller.abort();
  }, [url]);

  return { isLoading: isLoading, data: data, error: error };
}
