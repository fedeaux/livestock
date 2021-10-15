import { createContext, useCallback } from "react";

export const BraindamageApiContext = createContext();

export default function BraindamageApiProvider({ children }) {
  const [cache, setCache] = useState({});
  const [queryCache, setQueryCache] = useState({});

  const useQueryCache = useCallback(
    (queryCacheKey) => {
      if (queryCache[queryCacheKey] && cache[queryCache[queryCacheKey]]) {
        return cache[queryCache[queryCacheKey]];
      }

      return null;
    },
    [cache, queryCache]
  );

  const addToCache = useCallback((queryCacheKey, response) => {
    setQueryCache({ ...queryCache, [queryCacheKey]: response.cacheKey.name });
    setCache({ ...cache, [response.cacheKey.name]: response });
  });

  const updateCache = useCallback((response) => {
    setCache({ ...cache, [response.cacheKey.name]: response });
  });

  return (
    <BraindamageApiContext.Provider
      value={{ cache, addToCache, updateCache, useQueryCache }}
    >
      {children}
    </BraindamageApiContext.Provider>
  );
}
