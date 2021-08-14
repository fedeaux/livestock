export default function useQuery(queryFunc, queryParams) {
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    setResponse(await queryFunc(...queryParams));
    setIsLoading(false);
  }, []);

  return { ...response, isLoading };
}
