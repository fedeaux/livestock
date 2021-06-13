import { camelize } from "inflected";

export default {
  defineEnums() {
    Object.values(this.schema.enums).forEach((enumDefinition) => {
      this.defineEnumProperties(enumDefinition);
    })
  },

  defineEnumProperties(enumDefinition) {
    const definedProperties = {};

    const prefix = enumDefinition.options.prefix && enumDefinition.name || "";
    const suffix = enumDefinition.options.suffix && enumDefinition.name || "";

    Object.values(enumDefinition.valueMap).forEach((value) => {
      const name = camelize(["is", prefix, value, suffix].join('_'), false);

      definedProperties[name] = {
        get: function () {
          return this[enumDefinition.name] === value;
        }
      }
    });

    Object.defineProperties(this.prototype, definedProperties);
  }
}
