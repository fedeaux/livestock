export default function useBoolState(initial = false) {
  const [value, setValue] = useState(initial);

  const setTrue = useCallback(() => {
    return setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    return setValue(false);
  }, []);

  const toggle = useCallback(() => {
    return setValue(!value);
  }, [value]);

  return [value, setFalse, setTrue, toggle];
}
