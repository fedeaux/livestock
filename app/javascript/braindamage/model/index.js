import Enumerable from "braindamage/model/enumerable";
import Attributable from "braindamage/model/attributable";
import Nameable from "braindamage/model/nameable";
// import Validateable from "braindamage/model/validateable";

class Model {
  static models = {};

  constructor(attributes = {}) {
    Object.entries(this.constructor.attributes()).forEach(([name, properties]) => {
      if(attributes.hasOwnProperty(name)) {
        this[name] = attributes[name];
      } else {
        this[name] = properties.default;
      }
    });
  }

  static define() {
    Model.models[this.schema.modelName] = this;
    this.defineAttributes();
    this.defineEnums();
    this.defineNames();

    return this;
  }

  serialize() {
    const raw = {};

    Object.values(this.constructor.attributes()).forEach((attribute) => {
      raw[attribute.name] = this[attribute.name];
    })

    return raw;
  }

  get isPersisted() {
    return !this.isNewRecord;
  }

  get isNewRecord() {
    return isNaN(this.id);
  }

  clone() {
    return new this.constructor(this.serialize());
  }
}

Object.assign(Model, Attributable);
Object.assign(Model, Enumerable);
Object.assign(Model, Nameable);

export default Model;
