export const BraindamageApiContext = createContext();
import update from "immutability-helper";

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
    const newQueryCache = update(queryCache, {
      [queryCacheKey]: { $set: response.cacheKey.name },
    });

    const newCache = update(cache, {
      [response.cacheKey.name]: { $set: response },
    });

    setCache(newCache);
    setQueryCache(newQueryCache);
  });

  const updateCache = useCallback((response) => {
    setCache({ ...cache, [response.cacheKey.name]: response });
  });

  const nukeCache = useCallback(() => {
    setQueryCache({});
    setCache({});
  });

  return (
    <BraindamageApiContext.Provider
      value={{ cache, addToCache, updateCache, useQueryCache, nukeCache }}
    >
      {children}
    </BraindamageApiContext.Provider>
  );
}
