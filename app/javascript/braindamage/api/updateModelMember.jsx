export default async function updateModelMember(path, Model, modelParams = {}) {
  const idParamName = `${Model.singularCamelName}Id`;
  const attributesParamName = `${Model.singularCamelName}Attributes`;
  const parameterizedPath = path.replace(
    `:${idParamName}`,
    modelParams[idParamName]
  );

  return axios
    .put(parameterizedPath, {
      [Model.singularCamelName]: modelParams[attributesParamName],
    })
    .then(({ data }) => {
      const instance = new Model(data[Model.singularCamelName]);
      return { ...data, [Model.singularCamelName]: instance };
    });
}
