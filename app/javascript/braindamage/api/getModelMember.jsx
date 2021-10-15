export default async function getModelMember(path, Model) {
  return axios.get(`${path}.json`).then(({ data }) => {
    const instance = new Model(data[Model.singularCamelName]);
    return { ...data, [Model.singularCamelName]: instance };
  });
}
