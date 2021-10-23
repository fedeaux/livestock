export default async function getModelCollection(path, Model, query = {}) {
  return axios.get(`${path}.json`, { params: { query } }).then(({ data }) => {
    const instances = data[Model.pluralCamelName].map((attributes) => {
      return new Model(attributes);
    });

    return { ...data, [Model.pluralCamelName]: instances };
  });
}
