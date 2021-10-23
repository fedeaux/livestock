export default async function destroyModelMember(
  path,
  Model,
  modelParams = {}
) {
  const idParamName = `${Model.singularCamelName}Id`;
  const attributesParamName = `${Model.singularCamelName}Attributes`;
  const parameterizedPath = path.replace(
    `:${idParamName}`,
    modelParams[idParamName]
  );

  return axios
    .delete(parameterizedPath, {
      [Model.singularCamelName]: modelParams[attributesParamName],
    })
    .then(({ data }) => {
      const instance = new Model(data[Model.singularCamelName]);
      return { ...data, [Model.singularCamelName]: instance };
    });
}
