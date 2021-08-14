export function withModelQuery(
  Component,
  Model,
  path,
  params = {},
  options = {}
) {
  return (props) => {
    const [data, setData] = useState(null);

    useEffect(() => {
      fetch(path)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const instances = data[Model.pluralCamelName].map((attributes) => {
            return new Model(attributes);
          });

          setData({ ...data, [Model.pluralCamelName]: instances });
        });
    }, [path]);

    return <Component {...data} {...props} />;
  };
}
