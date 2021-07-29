import { camelize } from "inflected";
import { parseISO } from 'date-fns';

export default {
  attributes() {
    if(!this.attributesCache) {
      this.attributesCache = {};
      const attributesDefinitions = this.attributesDefinitions();

      Object.entries(this.schema.attributes).forEach(([name, properties]) => {
        const attributeDefinition = attributesDefinitions[name] || {};
        this.attributesCache[name] = { ...attributeDefinition, ...properties };
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
  if(attribute.type === "datetime") {
    return (value) => {
      if (value instanceof Date) {
        return value;
      }

      try {
        return parseISO(value);
      } catch(e) {
        return attribute.default || null;
      }
    }
  }
  if(attribute.type === "belongs_to") {
    return (value) => {
      try {
        return new attribute.class(value);
      } catch(e) {
        return attribute.default || null;
      }
    }
  }

  return (value) => value;
}
