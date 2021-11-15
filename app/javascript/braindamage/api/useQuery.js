import { BraindamageApiContext } from "braindamage/api/provider";
import { getTime } from "date-fns";

export default function useQuery(cacheKey, queryFunc, queryParams) {
  const { useQueryCache, addToCache } = useContext(BraindamageApiContext);
  const cached = useQueryCache(cacheKey);
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!cached) {
      queryFunc(...queryParams).then((result) => {
        if (result.error) {
          addToCache(cacheKey, { cacheKey: { name: 'error' }, ...result });
        } else {
          addToCache(cacheKey, result);
        }

        setResponse(result);
        setIsLoading(false)
      })
    } else {
      setResponse(cached);
      setIsLoading(false);
    }
  }, [cached]);

  return { ...response, isLoading };
}
