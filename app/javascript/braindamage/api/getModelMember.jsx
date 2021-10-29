export default async function getModelMember(path, Model, id, query = {}) {
  return axios
    .get(`${path}.json`, { params: { query } })
    .then(({ data }) => {
      const instance = new Model(data[Model.singularCamelName]);
      return { ...data, [Model.singularCamelName]: instance };
    })
    .catch(() => {
      return { error: true };
    });
}
