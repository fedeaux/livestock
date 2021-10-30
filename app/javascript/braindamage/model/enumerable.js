import { camelize, pluralize } from "inflected";

export default {
  defineEnums() {
    if(!this.schema.enums) return;

    Object.values(this.schema.enums).forEach((enumDefinition) => {
      this.defineEnumProperties(enumDefinition);
    })
  },

  defineEnumProperties(enumDefinition) {
    const definedProperties = {};

    const prefix = enumDefinition.options.prefix && enumDefinition.name || "";
    const suffix = enumDefinition.options.suffix && enumDefinition.name || "";
    const valuesGetterName = pluralize(camelize(enumDefinition.name, false));
    const enumValues = Object.keys(enumDefinition.valueMap);

    enumValues.forEach((value) => {
      const name = camelize(["is", prefix, value, suffix].join('_'), false);

      definedProperties[name] = {
        get: function () {
          return this[enumDefinition.name] === value;
        }
      }
    });

    definedProperties[valuesGetterName] = {
      get: function() {
        return enumValues;
      }
    }

    Object.defineProperties(this.prototype, definedProperties);
  }
}
