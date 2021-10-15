import { useContext } from "react";
import { BraindamageApiContext } from "braindamage/api/provider";

export default function useQuery(cacheKey, queryFunc, queryParams) {
  const { useQueryCache, addToCache } = useContext(BraindamageApiContext);
  const cached = useQueryCache(cacheKey);
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ((async () => {
      if (cached) {
        setResponse(cached);
        setIsLoading(false);
      } else {
        addToCache(cacheKey, await queryFunc(...queryParams));
      }
    }))()
  }, [cached]);

  return { ...response, isLoading };
}
