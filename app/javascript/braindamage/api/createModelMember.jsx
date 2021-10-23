export default async function createModelMember(path, Model, modelParams = {}) {
  const idParamName = `${Model.singularCamelName}Id`;
  const attributesParamName = `${Model.singularCamelName}Attributes`;

  return axios
    .post(path, {
      [Model.singularCamelName]: modelParams[attributesParamName],
    })
    .then(({ data }) => {
      const instance = new Model(data[Model.singularCamelName]);
      return { ...data, [Model.singularCamelName]: instance };
    });
}
