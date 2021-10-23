import { BraindamageApiContext } from "braindamage/api/provider";

export default function useWrite(writeFunc, writeParams) {
  const [isLoading, setIsLoading] = useState(false);
  const { updateCache } = useContext(BraindamageApiContext);

  const write = useCallback(async (params) => {
    setIsLoading(true);
    const response = await writeFunc(...writeParams, params);
    updateCache(response);
    setIsLoading(false);
    return { response };
  });

  return { write, isLoading };
}
