import { BraindamageApiContext } from "braindamage/api/provider";
import { getTime } from "date-fns";
import getModelMember from 'braindamage/api/getModelMember';
import Stock from 'models/stock';

// TODO: Braindamage useQueryList
export default function useApiStockList(stockIds, query) {
  const [responses, setResponses] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [count, setCount] = useState(6);
  const { useQueryCacheList, addToCache } = useContext(BraindamageApiContext);

  const queries = stockIds.map((stockId) => {
    const endpoint =`/api/stocks/${stockId}`

    return {
      endpoint: endpoint,
      queryCacheKey: `${endpoint}/${JSON.stringify(query)}`
    };
  });

  const cacheList = useQueryCacheList(queries.map(({ queryCacheKey }) => {
    return queryCacheKey;
  }))

  useEffect(() => {
    const promises = [];

    queries.map(({queryCacheKey,endpoint}) => {
      if(cacheList[queryCacheKey]) {
        return cacheList[queryCacheKey]
      }

      promises.push(getModelMember(endpoint, Stock, '', query).then((result) => {
        return { ...result, queryCacheKey: queryCacheKey };
      }))
    })

    Promise.all(promises).then((results) => {
      const list = [];

      results.forEach((result) => {
        if (result.error) {
          addToCache(result.queryCacheKey, { cacheKey: { name: 'error' }, ...result });
        } else {
          addToCache(result.queryCacheKey, result);
          list.push(result[Stock.singularCamelName])
        }
      })

      setResponses({ [Stock.pluralCamelName]: list });
      setIsLoading(false);
    })
  }, [stockIds.join('')]);

  return { ...responses, isLoading };
}
