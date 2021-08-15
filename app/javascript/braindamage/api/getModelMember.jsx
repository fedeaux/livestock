export default async function getModelMember(path, Model) {
  return fetch(`${path}.json`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const instance = new Model(data[Model.singularCamelName]);
      return { ...data, [Model.singularCamelName]: instance };
    });
}
