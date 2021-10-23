import { camelize } from "inflected";
import { parseISO } from 'date-fns';

export default {
  attributes() {
    if(!this.attributesCache) {
      this.attributesCache = {};
      const attributesDefinitions = this.attributesDefinitions();

      Object.entries(this.schema.attributes).forEach(([name, properties]) => {
        const attributeDefinition = attributesDefinitions[name] || {};
        this.attributesCache[name] = { ...properties, ...attributeDefinition };
        delete attributesDefinitions[name];
      })

      Object.entries(attributesDefinitions).forEach(([name, properties]) => {
        this.attributesCache[name] = { name, ...properties };
      });
    }

    return this.attributesCache;
  },

  attributesDefinition() {
    return {};
  },

  defineAttributes() {
    Object.values(this.attributes()).forEach((attribute) => {
      this.defineAttributeProperties(attribute);
    })
  },

  defineAttributeProperties(attribute) {
    const definedProperties = {};

    definedProperties[attribute.name] = {
      get: function() {
        return this["@" + attribute.name];
      },
      set: function(value) {
        // debug helper
        // if(attribute.name == "") {
        //   console.log("attribute", attribute, attribute.model, this.constructor.models);
        // }

        if(attribute.model) {
          attribute['class'] = this.constructor.models[attribute.model]
        }
        return setAttributeValue(this, attribute, value);
      }
    }

    Object.defineProperties(this.prototype, definedProperties);
  }
}

function setAttributeValue(instance, attribute, value) {
  const parser = getAttributeParser(attribute);

  instance["@"+attribute.name] = parser(value);
};


function getAttributeParser(attribute) {
  if(attribute.type === "integer") {
    return (value) => parseInt(value)
  }

  if(attribute.type === "decimal") {
    return (value) => parseFloat(value)
  }

  if(attribute.type === "datetime" || attribute.type === "date") {
    return (value) => {
      if (value instanceof Date) {
        return value;
      }

      if (!value) return null;

      try {
        return parseISO(value);
      } catch(e) {
        return attribute.default || null;
      }
    }
  }

  if(attribute.type === "belongs_to" || attribute.type === "has_one" || attribute.type === "has_many") {
    return (value) => {
      if(!value) return attribute.default || null;

      try {
        if (Array.isArray(value)) {
          return value.map((v) => new attribute.class(v));
        }

        return new attribute.class(value);
      } catch(e) {
        return attribute.default || null;
      }
    }
  }

  return (value) => value;
}
