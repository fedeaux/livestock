export default function useBoolState(initial = false) {
  const [value, setValue] = useState(initial);

  const setTrue = useCallback(() => {
    return setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    return setValue(false);
  }, []);

  return [value, setFalse, setTrue];
}
