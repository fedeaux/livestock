import { attributeAsProperty, setAttributeValue } from "braindamage/model/helpers";

export default class Model {
  constructor(attributes = {}) {
    Object.entries(this.constructor.attributes()).forEach(([name, properties]) => {
      this[name] = attributes[name];
    });
  }

  static attributes() {
    if(!this.attributesCache) {
      this.attributesCache = {};
      const attributesDefinitions = this.attributesDefinitions();

      Object.entries(this.schema.attributes).forEach(([name, properties]) => {
        const attributeDefinition = attributesDefinitions[name] || {};
        this.attributesCache[name] = { ...attributeDefinition, ...properties };
      })
    }

    return this.attributesCache;
  }

  static attributesDefinition() {
    return {};
  }

  static define() {
    const attributes = this.attributes();
    const names = this.schema.names;
    const definedProperties = {};

    Object.entries(attributes).forEach(([name, properties]) => {
      definedProperties[name] = attributeAsProperty(name, properties);
    })

    Object.entries(names).forEach(([name, value]) => {
      this[`${name}Name`] = value;
    })

    Object.defineProperties(Model.prototype, definedProperties);

    return this;
  }
}
