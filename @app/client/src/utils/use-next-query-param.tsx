import { useRouter } from 'next/dist/client/router';

export const useNextQueryParam = (
  requestedParam: string,
): string | undefined => {
  const router = useRouter();
  const queryParam = router.query[requestedParam];

  if (typeof queryParam !== 'string') {
    return undefined;
  }

  return queryParam;
};
