export default async function getModelCollection(path, Model) {
  return fetch(`api/${path}.json`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const instances = data[Model.pluralCamelName].map((attributes) => {
        return new Model(attributes);
      });

      return { ...data, [Model.pluralCamelName]: instances };
    });
}
