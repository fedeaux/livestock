export default async function getModelCollection(path, Model) {
  return axios.get(`${path}.json`).then(({ data }) => {
    const instances = data[Model.pluralCamelName].map((attributes) => {
      return new Model(attributes);
    });

    return { ...data, [Model.pluralCamelName]: instances };
  });
}
