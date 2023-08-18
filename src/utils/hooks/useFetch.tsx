interface FetchResult<T> {
  isLoading: boolean;
  data: T | null;
  error: Error | null;
}

interface FetchOptions<T> {
  initialValue?: T | null;
}

function useFetch<T>(url: string, options: FetchOptions = {}): FetchResult<T> {
  return undefined;
}
