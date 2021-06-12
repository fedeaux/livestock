export default class Model {
  static attributes() {
    if(!this.attributesCache) {
      this.attributesCache = {};
      let attributesDefinitions = this.attributesDefinitions();

      Object.entries(this.schema).forEach(([name, properties]) => {
        const attributeDefinition = attributesDefinitions[name] || {};
        this.attributesCache[name] = { ...attributeDefinition, ...properties };
      })
    }

    return this.attributesCache;
  }

  static attributesDefinition() {
    return {};
  }

  static indexPath() {
    return `api/${this.pluralUnderscoreName}.json`
  }
}
